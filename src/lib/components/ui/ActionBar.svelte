<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!-- Fixed to the bottom of the viewport, but only as wide as the scroll sheet. -->
<footer
	class="fixed bottom-0 left-1/2 z-10 w-full max-w-content -translate-x-1/2 border-t border-sepia/20 bg-vellum px-5 pt-3.5 pb-[calc(14px+env(safe-area-inset-bottom))]"
>
	{@render children()}
</footer>
