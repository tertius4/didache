<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto, replaceState } from '$app/navigation';
	import { onMount } from 'svelte';
	import { sections } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';
	import { mission } from '#lib/site.ts';
	import Meta from '#lib/components/Meta.svelte';
	import Brand from '#lib/components/ui/Brand.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	const slides: { art: string; title: string; body: string }[] = [
		{
			art: '/media/about/about-story-alive.webp',
			title: 'Get to know your Bible',
			body: mission
		},
		{
			art: '/media/about/about-faith-handed-down.webp',
			title: 'Every answer rooted in Scripture',
			body: 'Each lesson opens with a short video of the Bible story, then quick exercises. Every question points you back to the verse.'
		},
		{
			art: '/media/about/about-safe-at-home.webp',
			title: 'Help us test Didache',
			body: 'We’re still testing Didache, and we’d love your feedback. Tap the speech bubble at the top of any page to tell us what you think.'
		}
	];

	const journey = resolve('/learn/[section]', { section: sections[0].id });

	let index = $state(0);
	const slide = $derived(slides[index]);
	const last = $derived(index === slides.length - 1);

	// Saved progress loads after hydration (in the layout), so wait for it, then decide once:
	// returning visitors skip straight to the journey.
	let checkedReturning = false;
	$effect(() => {
		if (!progress.ready || checkedReturning) return;
		checkedReturning = true;
		if (progress.seenIntro) goto(journey, { replaceState: true });
	});

	onMount(() => {
		// Coming back from "More about Didache": return to the same slide.
		const saved = Number(new URL(location.href).searchParams.get('slide'));
		if (saved >= 1 && saved <= slides.length) index = saved - 1;
	});

	function show(i: number) {
		index = i;
		replaceState(resolve(`/?slide=${i + 1}`), {});
	}

	function finish(skipped: boolean) {
		progress.markIntroSeen();
		track('intro_completed', { skipped, slide: index + 1 });
		goto(journey);
	}
</script>

<Meta description={mission} path="/" preload={slides.map((s) => s.art)} />

<!-- Hidden for returning visitors (marked in app.html) while they're sent on to the journey. -->
<main class="flex flex-1 flex-col gap-5 px-5 pt-4 [[data-returning]_&]:invisible">
	<div class="flex items-center justify-between">
		<Brand />
		{#if !last}
			<Button variant="quiet" class="w-auto! px-2!" onclick={() => finish(true)}>Skip</Button>
		{/if}
	</div>

	{#key index}
		<div class="grid animate-pop-in gap-4 text-center">
			<img
				class="block aspect-4/3 h-auto w-full rounded-lg border border-border object-cover sepia-[.2]"
				src={slide.art}
				width="1200"
				height="900"
				fetchpriority="high"
				alt=""
			/>
			<h1 class="text-4xl">{slide.title}</h1>
			<p class="text-lg text-foreground-muted">{slide.body}</p>
		</div>
	{/key}

	<div class="flex justify-center gap-2" aria-hidden="true">
		{#each slides as s, i (s.title)}
			<span
				class={[
					'h-2 rounded-full transition-all duration-200',
					i === index ? 'w-7 bg-primary' : 'w-2 bg-border-strong'
				]}
			></span>
		{/each}
	</div>

	<div class="mt-auto grid gap-3.5 pb-4 text-center">
		{#if last}
			<Button onclick={() => finish(false)}
				>Begin the journey <Icon name="arrow-right" size={16} /></Button
			>
		{:else}
			<Button onclick={() => show(index + 1)}>Next <Icon name="arrow-right" size={16} /></Button>
		{/if}
		<a class="text-sm" href={resolve('/about')}>More about Didache</a>
	</div>
</main>
