<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<!-- Sticks to the bottom of the sheet's scroll area, just above its bottom edge. Place it last in the page. -->
<footer class="sticky bottom-0 z-10 mt-auto border-t border-border bg-surface px-5 py-3.5">
	{@render children()}
</footer>
