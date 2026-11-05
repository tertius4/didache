<script lang="ts">
	import { resolve } from '$app/paths';
	import { sections } from '#lib/content/index.ts';
	import Brand from '#lib/components/ui/Brand.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import ShareButton from '#lib/components/ShareButton.svelte';
	import { iconLink } from '#lib/components/ui/classes.ts';

	interface Props {
		/** Shows a share button for the current page when given. */
		share?: { title: string; text: string; context: Record<string, string> };
	}

	const { share }: Props = $props();
</script>

<header class="mb-4 flex items-center justify-between gap-3">
	<Brand href={resolve('/learn/[section]', { section: sections[0].id })} />
	<nav class="flex items-center gap-2" aria-label="Site">
		{#if share}
			<ShareButton {...share} />
		{/if}
		<a href={resolve('/feedback')} class={iconLink} aria-label="Send feedback">
			<Icon name="comment" size={18} />
		</a>
		<a href={resolve('/about')} class={iconLink} aria-label="About Didache">
			<Icon name="circle-info" size={18} />
		</a>
	</nav>
</header>
