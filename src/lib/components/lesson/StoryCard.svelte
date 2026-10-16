<script lang="ts">
	import type { StoryCard } from '#lib/content/types.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import VerseQuote from './VerseQuote.svelte';

	let { card, onlearnmore }: { card: StoryCard; onlearnmore: () => void } = $props();
</script>

<article class="card">
	{#if card.illustration}
		<div class="art"><Illustration name={card.illustration} /></div>
	{/if}
	<h2>{card.title}</h2>
	<p class="body">{card.body}</p>
	{#if card.verse}
		<VerseQuote verse={card.verse} />
	{/if}
	{#if card.learnMore}
		<button type="button" class="learn-more" onclick={onlearnmore}>
			<span aria-hidden="true">📖</span> Learn more: {card.learnMore.title}
		</button>
	{/if}
</article>

<style>
	.card {
		display: grid;
		gap: 14px;
		animation: pop-in 260ms ease;
	}

	.art {
		border-radius: 20px;
		overflow: hidden;
	}

	h2 {
		font-size: 24px;
	}

	.body {
		font-size: 18px;
	}

	.learn-more {
		justify-self: start;
		padding: 10px 14px;
		border: 2px solid var(--sun);
		border-radius: 999px;
		background: #fff6dc;
		font-weight: 800;
		font-size: 15px;
		cursor: pointer;
	}

	@keyframes pop-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}
</style>
