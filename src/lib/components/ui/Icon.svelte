<script lang="ts">
	import { asset } from '$app/paths';
	import type { IconName } from './icons.ts';

	interface Props {
		name: IconName;
		/** Width and height in px. */
		size?: number;
		/** Any CSS colour; defaults to the surrounding text colour. */
		color?: string;
		class?: string;
	}

	const { name, size = 20, color = 'currentColor', class: className }: Props = $props();
</script>

<!-- Decorative: the accessible name comes from the surrounding text or the parent's aria-label. -->
<svg
	class={['inline-block flex-none', className]}
	width={size}
	height={size}
	fill="currentColor"
	style:color
	aria-hidden="true"
	focusable="false"
>
	<use href="{asset('icons.svg')}#{name}" />
</svg>
