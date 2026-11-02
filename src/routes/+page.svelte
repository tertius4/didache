<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';
	import Button from '#lib/components/ui/Button.svelte';

	const slides: { art: string; title: string; body: string }[] = [
		{
			art: '/media/about/about-story-alive.webp',
			title: 'Walk through the story of Scripture',
			body: 'Didache is a journey through the Bible, one stop at a time: a short narrated story, then a few questions to help it stay with you. Just a few minutes a day.'
		},
		{
			art: '/media/about/about-faith-handed-down.webp',
			title: 'Every answer rooted in Scripture',
			body: 'Each lesson opens with a short video of the Bible story, then quick exercises. Every question points you back to the verse.'
		},
		{
			art: '/media/about/about-safe-at-home.webp',
			title: 'Grounded in Reformed teaching',
			body: 'Want to go deeper? Tap “Go deeper” to see what the story teaches about God, grace and the gospel, guided by the historic Reformed confessions.'
		}
	];

	let index = $state(0);
	const slide = $derived(slides[index]);
	const last = $derived(index === slides.length - 1);

	onMount(() => {
		if (progress.seenIntro) goto(resolve('/learn'), { replaceState: true });
	});

	function finish(skipped: boolean) {
		progress.markIntroSeen();
		track('intro_completed', { skipped, slide: index + 1 });
		goto(resolve('/learn'));
	}
</script>

<svelte:head>
	<title>Didache: learn the Bible</title>
</svelte:head>

<main class="flex flex-1 flex-col gap-5 px-5 pt-4">
	<div class="flex items-center justify-between">
		<span class="font-display text-2xl font-semibold text-rubric">Didache</span>
		{#if !last}
			<Button variant="quiet" class="w-auto! px-2!" onclick={() => finish(true)}>Skip</Button>
		{/if}
	</div>

	{#key index}
		<div class="grid animate-pop-in gap-4 text-center">
			<div class="overflow-hidden rounded-lg border border-sepia/25 sepia-[.2]">
				<img class="block aspect-4/3 h-auto w-full object-cover" src={slide.art} alt="" />
			</div>
			<h1 class="text-4xl">{slide.title}</h1>
			<p class="text-lg text-sepia">{slide.body}</p>
		</div>
	{/key}

	<div class="flex justify-center gap-2" aria-hidden="true">
		{#each slides as s, i (s.title)}
			<span
				class={[
					'h-2 rounded-full transition-all duration-200',
					i === index ? 'w-7 bg-rubric' : 'w-2 bg-sepia/30'
				]}
			></span>
		{/each}
	</div>

	<div class="mt-auto grid gap-3.5 pb-[calc(16px+env(safe-area-inset-bottom))] text-center">
		{#if last}
			<Button onclick={() => finish(false)}>Begin the journey</Button>
		{:else}
			<Button onclick={() => index++}>Next</Button>
		{/if}
		<a class="text-sm" href={resolve('/about')}>About Didache</a>
	</div>
</main>
