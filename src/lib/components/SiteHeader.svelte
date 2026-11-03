<script lang="ts">
	import { resolve } from '$app/paths';
	import { sections } from '#lib/content/index.ts';
	import Brand from '#lib/components/ui/Brand.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	const iconLink =
		'grid size-10 place-items-center rounded-full border border-border-strong text-foreground-muted no-underline transition-colors hover:bg-card-hover hover:text-foreground';
</script>

<header class="mb-4 flex items-center justify-between gap-3">
	<Brand href={resolve('/learn/[section]', { section: sections[0].id })} />
	<nav class="flex items-center gap-2" aria-label="Site">
		<a href={resolve('/feedback')} class={iconLink} aria-label="Send feedback">
			<Icon name="comment" size={18} />
		</a>
		<a href={resolve('/about')} class={iconLink} aria-label="About Didache">
			<Icon name="circle-info" size={18} />
		</a>
	</nav>
</header>
