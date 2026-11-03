<script lang="ts">
	import { resolve } from '$app/paths';
	import type { LearnMore, Lesson } from '#lib/content/types.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import Button from '#lib/components/ui/Button.svelte';

	interface Props {
		lesson: Lesson;
		/** Section and unit ids, for the close link back to the unit page. */
		section: string;
		unit: string;
		onplay: () => void;
		onended: () => void;
		onlearnmore: (content: LearnMore, cardId: string) => void;
		onread: () => void;
		onpractice: () => void;
	}

	const { lesson, section, unit, onplay, onended, onlearnmore, onread, onpractice }: Props =
		$props();

	const deeper = $derived(lesson.story.filter((card) => card.learnMore));
	let started = false;
	let playing = $state(false);

	function play() {
		playing = true;
		if (started) return;
		started = true;
		onplay();
	}
</script>

<!-- Full-screen: covers the scroll sheet and fills the whole viewport. -->
<div class="fixed inset-0 z-20 flex animate-pop-in flex-col bg-overlay text-on-overlay">
	<div class="relative min-h-0 flex-1">
		{#if lesson.video}
			<!-- Captions are optional in the content data; add a .vtt per video when available. -->
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				class="size-full object-contain"
				src={lesson.video.src}
				poster={lesson.video.poster}
				controls
				playsinline
				preload="metadata"
				onplay={play}
				onpause={() => (playing = false)}
				onended={() => {
					playing = false;
					onended();
				}}
			>
				{#if lesson.video.captions}
					<track kind="captions" src={lesson.video.captions} srclang="en" label="English" default />
				{/if}
			</video>
		{:else}
			<div
				class="flex size-full flex-col items-center justify-center gap-6 bg-surface-sunken paper-grain p-6 text-center text-foreground"
			>
				<div class="w-4/5 max-w-sm overflow-hidden rounded-lg opacity-80 sepia-[.35]">
					<Illustration name={lesson.illustration} />
				</div>
				<span
					class="grid size-16 place-items-center rounded-full bg-primary/85 text-2xl text-on-primary"
					aria-hidden="true">▶</span
				>
				<p class="text-sm font-semibold tracking-widest text-foreground-muted uppercase">
					Video coming soon
				</p>
			</div>
		{/if}

		<!-- Title overlay; fades while playing so it doesn't sit on the picture. -->
		<header
			class="pointer-events-none absolute inset-x-0 top-0 flex items-start gap-3 bg-linear-to-b from-overlay/80 to-transparent px-4 pt-[calc(12px+env(safe-area-inset-top))] pb-10 transition-opacity duration-300"
			class:opacity-0={playing}
		>
			<a
				class="pointer-events-auto p-1 text-xl text-on-overlay/80 no-underline hover:text-on-overlay"
				href={resolve('/learn/[section]/[unit]', { section, unit })}
				aria-label="Close lesson">✕</a
			>
			<div class="min-w-0 flex-1 pt-0.5">
				<p class="text-sm small-caps tracking-wide text-on-overlay/75">{lesson.passage}</p>
				<h1 class="font-display text-2xl font-semibold">{lesson.title}</h1>
			</div>
		</header>
	</div>

	<footer class="grid gap-3 px-5 pt-3 pb-[calc(14px+env(safe-area-inset-bottom))]">
		{#if deeper.length}
			<div class="flex gap-2 overflow-x-auto" aria-label="Go deeper">
				{#each deeper as card (card.id)}
					<button
						type="button"
						class="shrink-0 cursor-pointer rounded-full border border-secondary/60 bg-secondary/15 px-3.5 py-1.5 text-sm font-medium hover:bg-secondary/30"
						onclick={() => card.learnMore && onlearnmore(card.learnMore, card.id)}
					>
						{card.learnMore?.title}
					</button>
				{/each}
			</div>
		{/if}
		<div class="mx-auto grid w-full max-w-content grid-cols-[1fr_2fr] gap-3">
			<button
				type="button"
				class="cursor-pointer rounded-lg border border-on-overlay/40 px-5 py-3.5 font-semibold transition-colors hover:bg-on-overlay/10"
				onclick={onread}
			>
				Read story
			</button>
			<Button onclick={onpractice}>Start practice</Button>
		</div>
	</footer>
</div>
