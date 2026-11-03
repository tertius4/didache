/**
 * The page scrolls inside the scroll sheet (see ScrollSheet.svelte), not the
 * window, so the sheet's top and bottom edges always stay on screen. Use these
 * helpers instead of `window.scrollTo`.
 */

export const PAGE_SCROLL_ID = 'page-scroll';

export function pageScroller(): HTMLElement | null {
	return typeof document === 'undefined' ? null : document.getElementById(PAGE_SCROLL_ID);
}

export function scrollPageToTop(): void {
	pageScroller()?.scrollTo({ top: 0 });
}
