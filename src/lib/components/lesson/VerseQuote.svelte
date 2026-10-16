<script lang="ts">
	import type { Verse } from '#lib/content/types.ts';

	let { verse }: { verse: Verse } = $props();
</script>

<blockquote class="verse">
	“{verse.text}”
	<cite>{verse.ref} (ESV)</cite>
</blockquote>
