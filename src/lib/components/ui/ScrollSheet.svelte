<script lang="ts">
	import type { Snippet } from 'svelte';
	import ScrollRoller from './ScrollRoller.svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<!-- The page is a vellum scroll unrolled on a papyrus desk; the inset edge shading reads as a curl. -->
<div
	class="relative mx-auto flex min-h-dvh w-full max-w-content flex-col bg-surface paper-grain shadow-[inset_14px_0_18px_-14px_color-mix(in_srgb,var(--color-neutral-500)_45%,transparent),inset_-14px_0_18px_-14px_color-mix(in_srgb,var(--color-neutral-500)_45%,transparent),0_0_40px_-10px_color-mix(in_srgb,var(--color-overlay)_35%,transparent)]"
>
	<ScrollRoller />
	<div class="flex flex-1 flex-col">{@render children()}</div>
	<ScrollRoller />
</div>
