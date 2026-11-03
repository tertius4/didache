<script lang="ts">
	import Logo from './Logo.svelte';

	interface Props {
		/** Makes the brand a link (e.g. home). */
		href?: string;
	}

	const { href }: Props = $props();
</script>

<!-- Logo + wordmark: "Didache" in small caps, with a primary initial like a rubricated capital. -->
<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class="inline-flex items-center gap-2 text-foreground no-underline"
	aria-label={href ? 'Didache home' : undefined}
>
	<Logo />
	<span
		class="font-display text-[1.7rem] leading-none font-semibold tracking-[0.05em] [font-variant-caps:small-caps]"
		><span class="text-primary">D</span>idache</span
	>
</svelte:element>
