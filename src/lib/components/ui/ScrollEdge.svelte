<script lang="ts">
	interface Props {
		position: 'top' | 'bottom';
	}

	const { position }: Props = $props();
</script>

<!--
	The curled, deckled end of the parchment sheet. Drawn in CSS for now; to swap in
	generated art, see docs/images/ui/scroll-frame.md.
	The outer element casts the shadow (a mask would clip it), the inner one is masked.
-->
<div
	class={[
		'edge relative z-10 flex-none',
		position === 'top' ? 'pt-[env(safe-area-inset-top)]' : 'pb-[env(safe-area-inset-bottom)]'
	]}
	aria-hidden="true"
>
	<div class={['curl h-5', position === 'bottom' && '-scale-y-100']}></div>
</div>

<style>
	.edge {
		filter: drop-shadow(0 3px 3px color-mix(in srgb, var(--color-overlay) 22%, transparent));
	}

	/* Light on the rolled-over lip, shadow where it turns under, then a torn edge. */
	.curl {
		background: linear-gradient(
			to bottom,
			var(--color-neutral-200),
			var(--color-neutral-50) 30%,
			var(--color-neutral-100) 55%,
			var(--color-neutral-300) 85%,
			var(--color-neutral-400)
		);
		--deckle: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='6'%3E%3Cpath d='M0 0H44V2.5Q40 6 35 3.8T25 4.6T14 3.4T6 5T0 2.5Z'/%3E%3C/svg%3E");
		mask:
			linear-gradient(#000, #000) top / 100% calc(100% - 6px) no-repeat,
			var(--deckle) bottom / 44px 6px repeat-x;
	}
</style>
