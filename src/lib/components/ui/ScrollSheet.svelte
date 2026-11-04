<script lang="ts">
	import type { Snippet } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import ScrollEdge from './ScrollEdge.svelte';
	import { PAGE_SCROLL_ID } from './scroll.ts';
	import { sheetBars } from './sheet-bars.svelte.ts';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	let scroller = $state<HTMLDivElement>();

	/*
	 * SvelteKit only manages window scrolling, so do it for the sheet: start new pages
	 * at the top, and put back/forward navigation where it was.
	 */
	const positions: Record<string, number> = {};
	const key = (url: URL) => url.pathname + url.search;

	beforeNavigate(({ from }) => {
		if (from && scroller) positions[key(from.url)] = scroller.scrollTop;
	});

	afterNavigate(({ to, type }) => {
		if (!scroller || !to) return;
		scroller.scrollTop = type === 'popstate' ? (positions[key(to.url)] ?? 0) : 0;
	});

	/** Text fades into the paper next to a bar, rather than being cut off at a hard line. */
	const FADE = '0.75rem';
	const fade = $derived.by(() => {
		if (!sheetBars.top && !sheetBars.bottom) return undefined;

		const stops: string[] = [];
		if (sheetBars.top) stops.push('transparent', `#000 ${FADE}`);
		if (sheetBars.bottom) stops.push(`#000 calc(100% - ${FADE})`, 'transparent');
		else stops.push('#000');
		return `linear-gradient(to bottom, ${stops.join(', ')})`;
	});
</script>

<!--
	One screen tall: the curled ends always stay on screen and only the middle scrolls.
	The inset side shading reads as the sheet curling at its edges.
-->
<div
	class="mx-auto flex h-dvh w-full max-w-content flex-col bg-surface paper-grain shadow-[inset_14px_0_18px_-14px_color-mix(in_srgb,var(--color-neutral-500)_45%,transparent),inset_-14px_0_18px_-14px_color-mix(in_srgb,var(--color-neutral-500)_45%,transparent),0_0_40px_-10px_color-mix(in_srgb,var(--color-overlay)_35%,transparent)]"
>
	<ScrollEdge position="top" />
	{#if sheetBars.top}
		<div class="relative z-10 flex-none">{@render sheetBars.top()}</div>
	{/if}
	<div
		bind:this={scroller}
		id={PAGE_SCROLL_ID}
		class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
		style:mask-image={fade}
	>
		{@render children()}
	</div>
	{#if sheetBars.bottom}
		<!-- Positioned, so a sheet rising out of the bar (FeedbackBanner) anchors to it. -->
		<div class="relative z-10 flex-none">{@render sheetBars.bottom()}</div>
	{/if}
	<ScrollEdge position="bottom" />
</div>
