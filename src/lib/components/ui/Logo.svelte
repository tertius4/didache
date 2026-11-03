<script lang="ts">
	interface Props {
		/** Width and height in px. */
		size?: number;
		class?: string;
	}

	const { size = 28, class: className }: Props = $props();
</script>

<!-- An open scroll. Keep src/lib/assets/favicon.svg in step with this drawing. -->
<svg
	class={['flex-none', className]}
	width={size}
	height={size}
	viewBox="0 0 32 32"
	aria-hidden="true"
	focusable="false"
>
	<!-- The open sheet, with a few lines of writing. -->
	<rect
		x="9"
		y="7"
		width="14"
		height="18"
		class="fill-surface stroke-primary-700"
		stroke-width="1.2"
	/>
	<path
		d="M12.2 11.6h7.6M12.2 15h7.6M12.2 18.4h4.8"
		class="stroke-secondary"
		stroke-width="1.7"
		stroke-linecap="round"
	/>
	<!-- Rod ends, then the two rolled-up halves. -->
	<rect x="6" y="2.5" width="3" height="27" rx="1.5" class="fill-primary-700" />
	<rect x="23" y="2.5" width="3" height="27" rx="1.5" class="fill-primary-700" />
	<rect x="4" y="5" width="7" height="22" rx="3.5" class="fill-primary" />
	<rect x="21" y="5" width="7" height="22" rx="3.5" class="fill-primary" />
	<path
		d="M6 8.5v15M23 8.5v15"
		class="stroke-primary-300"
		stroke-width="1.2"
		stroke-linecap="round"
		opacity="0.7"
	/>
</svg>
