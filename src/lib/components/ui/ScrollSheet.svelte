<script lang="ts">
	import type { Snippet } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import ScrollEdge from './ScrollEdge.svelte';
	import { PAGE_SCROLL_ID } from './scroll.ts';

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
</script>

<!--
	One screen tall: the curled ends always stay on screen and only the middle scrolls.
	The inset side shading reads as the sheet curling at its edges.
-->
<div
	class="mx-auto flex h-dvh w-full max-w-content flex-col bg-surface paper-grain shadow-[inset_14px_0_18px_-14px_color-mix(in_srgb,var(--color-neutral-500)_45%,transparent),inset_-14px_0_18px_-14px_color-mix(in_srgb,var(--color-neutral-500)_45%,transparent),0_0_40px_-10px_color-mix(in_srgb,var(--color-overlay)_35%,transparent)]"
>
	<ScrollEdge position="top" />
	<div
		bind:this={scroller}
		id={PAGE_SCROLL_ID}
		class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
	>
		{@render children()}
	</div>
	<ScrollEdge position="bottom" />
</div>
