<script lang="ts">
	import type { Snippet } from 'svelte';
	import ScrollRoller from './ScrollRoller.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!-- The page is a vellum scroll unrolled on a papyrus desk; the inset edge shading reads as a curl. -->
<div
	class="relative mx-auto flex min-h-dvh w-full max-w-content flex-col bg-vellum paper-grain shadow-[inset_14px_0_18px_-14px_rgb(122_92_62/0.45),inset_-14px_0_18px_-14px_rgb(122_92_62/0.45),0_0_40px_-10px_rgb(46_33_23/0.35)]"
>
	<ScrollRoller />
	<div class="flex flex-1 flex-col">{@render children()}</div>
	<ScrollRoller />
</div>
