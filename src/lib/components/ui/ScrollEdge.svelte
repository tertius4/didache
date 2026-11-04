<script lang="ts">
	interface Props {
		position: 'top' | 'bottom';
	}

	const { position }: Props = $props();
</script>

<!--
	A rolled-up end of the parchment sheet, flush with the screen edge.
	The roll body is a seamless tile (/media/ui/scroll-edge-{position}.svg) repeated across the
	width so it never stretches; /media/ui/scroll-edge-end.svg shows the rolled layers at each end.
	The outer element casts the shadow (a mask would clip it), the inner one shows the art.
-->
<div
	class={[
		'edge relative z-10 flex-none',
		position === 'top' ? 'pt-[env(safe-area-inset-top)]' : 'pb-[env(safe-area-inset-bottom)]'
	]}
	aria-hidden="true"
>
	<div class="relative h-8">
		<div
			class="roll absolute inset-x-1.5 inset-y-0"
			style:background-image={`url(/media/ui/scroll-edge-${position}.svg)`}
		></div>
		{#each ['left-0', 'right-0 -scale-x-100'] as side (side)}
			<div class={['roll-end absolute h-5.5 w-3', side, position === 'top' ? 'top-0' : 'bottom-0']}></div>
		{/each}
	</div>
</div>

<style>
	.edge {
		filter: drop-shadow(0 2px 2px color-mix(in srgb, var(--color-overlay) 25%, transparent));
	}

	.roll {
		background-repeat: repeat-x;
		background-size: auto 100%;
	}

	.roll-end {
		background: url(/media/ui/scroll-edge-end.svg) center / 100% 100% no-repeat;
	}
</style>
