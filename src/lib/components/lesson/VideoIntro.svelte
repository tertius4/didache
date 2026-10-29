<script lang="ts">
	import type { LearnMore, Lesson } from '#lib/content/types.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';

	let {
		lesson,
		onplay,
		onended,
		onlearnmore,
		onread
	}: {
		lesson: Lesson;
		onplay: () => void;
		onended: () => void;
		onlearnmore: (content: LearnMore, cardId: string) => void;
		onread: () => void;
	} = $props();

	const deeper = $derived(lesson.story.filter((card) => card.learnMore));
	let started = false;

	function play() {
		if (started) return;
		started = true;
		onplay();
	}
</script>

<div class="grid animate-pop-in gap-5">
	<header class="text-center">
		<p class="text-sm small-caps tracking-wide text-sepia">{lesson.passage}</p>
		<h1 class="font-display text-3xl font-semibold">{lesson.title}</h1>
	</header>

	<!-- Width follows the height cap so the 9:16 frame always fits on screen. -->
	<div
		class="relative mx-auto aspect-9/16 w-full max-w-[calc(56dvh*9/16)] overflow-hidden rounded-xl border border-sepia/25 shadow-[0_8px_24px_-12px_rgb(46_33_23/0.45)]"
	>
		{#if lesson.video}
			<!-- Captions are optional in the content data; add a .vtt per video when available. -->
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				class="size-full bg-ink object-cover"
				src={lesson.video.src}
				poster={lesson.video.poster}
				controls
				playsinline
				preload="metadata"
				onplay={play}
				{onended}
			>
				{#if lesson.video.captions}
					<track kind="captions" src={lesson.video.captions} srclang="en" label="English" default />
				{/if}
			</video>
		{:else}
			<div
				class="flex size-full flex-col items-center justify-center gap-6 bg-vellum-deep/70 paper-grain p-6 text-center"
			>
				<div class="w-4/5 overflow-hidden rounded-lg opacity-80 sepia-[.35]">
					<Illustration name={lesson.illustration} />
				</div>
				<span
					class="grid size-16 place-items-center rounded-full bg-rubric/85 text-2xl text-vellum"
					aria-hidden="true">▶</span
				>
				<p class="text-sm font-semibold tracking-widest text-sepia uppercase">Video coming soon</p>
			</div>
		{/if}
	</div>

	{#if deeper.length}
		<section class="grid gap-2" aria-labelledby="go-deeper">
			<h2 id="go-deeper" class="font-display text-lg font-semibold">Go deeper</h2>
			<div class="flex flex-wrap gap-2">
				{#each deeper as card (card.id)}
					<button
						type="button"
						class="cursor-pointer rounded-full border border-gold/60 bg-gold-soft/50 px-3.5 py-1.5 text-sm font-medium hover:bg-gold-soft"
						onclick={() => card.learnMore && onlearnmore(card.learnMore, card.id)}
					>
						{card.learnMore?.title}
					</button>
				{/each}
			</div>
		</section>
	{/if}

	<button
		type="button"
		class="cursor-pointer justify-self-center text-sm font-medium text-lapis underline underline-offset-4"
		onclick={onread}
	>
		Read the story instead
	</button>
</div>
