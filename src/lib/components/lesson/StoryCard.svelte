<script lang="ts">
	import type { StoryCard } from '#lib/content/types.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import VerseQuote from './VerseQuote.svelte';

	interface Props {
		card: StoryCard;
	}

	const { card }: Props = $props();
</script>

<article class="grid animate-pop-in gap-4">
	{#if card.image}
		<img
			class="block aspect-4/3 h-auto w-full rounded-lg border border-border object-cover"
			src={card.image}
			width="1200"
			height="900"
			alt=""
		/>
	{:else if card.illustration}
		<div class="overflow-hidden rounded-lg border border-border sepia-[.2]">
			<Illustration name={card.illustration} />
		</div>
	{/if}
	<h2 class="text-3xl">{card.title}</h2>
	<!-- Drop cap in the primary colour, like a rubricated manuscript initial. -->
	<p
		class="text-lg first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-primary"
	>
		{card.body}
	</p>
	{#if card.verse}
		<VerseQuote verse={card.verse} />
	{/if}
</article>
