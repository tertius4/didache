<script lang="ts">
	import type { Verse } from '#lib/content/types.ts';

	interface Props {
		verse: Verse;
	}

	const { verse }: Props = $props();
</script>

<blockquote
	class="border-l-2 border-secondary py-1 pl-4 font-display text-lg text-foreground italic"
>
	“{verse.text}”
	<cite class="mt-1 block font-sans text-sm small-caps text-foreground-muted not-italic">
		{verse.ref} (ESV)
	</cite>
</blockquote>
