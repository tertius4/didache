<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import type { IllustrationKey } from '#lib/components/illustrations/keys.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';

	const slides: { art: IllustrationKey; title: string; body: string }[] = [
		{
			art: 'ark',
			title: 'Learn the Bible, one bite at a time',
			body: 'Unilogos teaches the stories and truths of Scripture in short, playful lessons. Just a few minutes a day.'
		},
		{
			art: 'scroll',
			title: 'Every answer rooted in Scripture',
			body: 'Each lesson tells part of a Bible story, then helps it stick with quick exercises. Every question points you back to the verse.'
		},
		{
			art: 'rainbow',
			title: 'Grounded in Reformed teaching',
			body: 'Want to go deeper? Tap “Learn more” to see what the story teaches about God, grace and the gospel, guided by the historic Reformed confessions.'
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
	<title>Unilogos: learn the Bible</title>
</svelte:head>

<main class="page intro">
	<div class="top">
		<span class="logo">Unilogos</span>
		{#if !last}
			<button type="button" class="skip" onclick={() => finish(true)}>Skip</button>
		{/if}
	</div>

	{#key index}
		<div class="slide">
			<div class="art"><Illustration name={slide.art} /></div>
			<h1>{slide.title}</h1>
			<p>{slide.body}</p>
		</div>
	{/key}

	<div class="dots" aria-hidden="true">
		{#each slides as s, i (s.title)}
			<span class:active={i === index}></span>
		{/each}
	</div>

	<div class="actions">
		{#if last}
			<button type="button" class="btn" onclick={() => finish(false)}>Get started</button>
		{:else}
			<button type="button" class="btn" onclick={() => index++}>Next</button>
		{/if}
		<a class="about" href={resolve('/about')}>About Unilogos</a>
	</div>
</main>

<style>
	.intro {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 20px;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-weight: 900;
		font-size: 22px;
		color: var(--primary-shadow);
	}

	.skip {
		border: none;
		background: none;
		font-weight: 800;
		color: var(--muted);
		cursor: pointer;
	}

	.slide {
		display: grid;
		gap: 14px;
		text-align: center;
		animation: fade 300ms ease;
	}

	.art {
		border-radius: 24px;
		overflow: hidden;
	}

	h1 {
		font-size: 28px;
	}

	.slide p {
		font-size: 18px;
		color: var(--muted);
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.dots span {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--locked);
		transition: width 200ms ease;
	}

	.dots span.active {
		width: 28px;
		border-radius: 999px;
		background: var(--primary);
	}

	.actions {
		display: grid;
		gap: 14px;
		margin-top: auto;
		padding-bottom: env(safe-area-inset-bottom);
		text-align: center;
	}

	.about {
		font-weight: 700;
		font-size: 15px;
	}

	@keyframes fade {
		from {
			opacity: 0;
			transform: translateX(16px);
		}
	}
</style>
