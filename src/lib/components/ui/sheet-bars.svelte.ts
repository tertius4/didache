import type { Snippet } from 'svelte';

/**
 * Bars that sit on the scroll sheet itself, between its rolled ends and the scrolling
 * text (see ScrollSheet.svelte). Being outside the scroll area, they need no background
 * of their own, so the parchment stays one unbroken surface. A page sets them while it
 * needs them and clears them when it's done.
 */
export const sheetBars = $state<{ top?: Snippet; bottom?: Snippet }>({});
