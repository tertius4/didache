<script lang="ts">
	import type { StoryCard } from '#lib/content/types.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import VerseQuote from './VerseQuote.svelte';

	let { card, onlearnmore }: { card: StoryCard; onlearnmore: () => void } = $props();
</script>

<article class="grid animate-pop-in gap-4">
	{#if card.illustration}
		<div class="overflow-hidden rounded-lg border border-sepia/25 sepia-[.2]">
			<Illustration name={card.illustration} />
		</div>
	{/if}
	<h2 class="text-3xl">{card.title}</h2>
	<!-- Rubricated drop cap, as in a manuscript. -->
	<p
		class="text-lg first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-rubric"
	>
		{card.body}
	</p>
	{#if card.verse}
		<VerseQuote verse={card.verse} />
	{/if}
	{#if card.learnMore}
		<button
			type="button"
			class="cursor-pointer justify-self-start rounded-full border border-gold/60 bg-gold-soft/50 px-3.5 py-1.5 text-sm font-medium hover:bg-gold-soft"
			onclick={onlearnmore}
		>
			Learn more: {card.learnMore.title}
		</button>
	{/if}
</article>
