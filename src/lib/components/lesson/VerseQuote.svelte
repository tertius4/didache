<script lang="ts">
	import type { Verse } from '#lib/content/types.ts';

	let { verse }: { verse: Verse } = $props();
</script>

<blockquote class="border-l-2 border-gold py-1 pl-4 font-display text-lg text-ink italic">
	“{verse.text}”
	<cite class="mt-1 block font-sans text-sm small-caps text-sepia not-italic">
		{verse.ref} (ESV)
	</cite>
</blockquote>
