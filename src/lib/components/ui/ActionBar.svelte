<script lang="ts">
	import type { Snippet } from 'svelte';
	import { sheetBars } from './sheet-bars.svelte.ts';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	/**
	 * Once running in the browser, the bar moves onto the sheet itself, below the scrolling
	 * text (see ScrollSheet.svelte), so it needs no background and the parchment stays whole.
	 * Until then it renders in place, so prerendered pages show it straight away.
	 */
	let placed = $state(false);

	$effect(() => {
		sheetBars.bottom = bar;
		placed = true;
		return () => {
			// Only clear our own bar: a page's next bar may already have taken the slot.
			if (sheetBars.bottom === bar) sheetBars.bottom = undefined;
		};
	});
</script>

{#snippet bar()}
	<footer class="px-5 py-3.5">{@render children()}</footer>
{/snippet}

{#if !placed}
	<div class="sticky bottom-0 z-10 mt-auto">{@render bar()}</div>
{/if}
