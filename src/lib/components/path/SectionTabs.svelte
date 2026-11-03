<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Section } from '#lib/content/types.ts';

	interface Props {
		sections: Section[];
		currentId: string;
	}

	const { sections, currentId }: Props = $props();
</script>

<nav
	class="-mx-5 mb-6 flex scrollbar-none gap-5 overflow-x-auto border-b border-border px-5"
	aria-label="Sections"
>
	{#each sections as section (section.id)}
		<a
			class="-mb-px inline-flex flex-none items-center gap-1.5 border-b-2 border-transparent py-2.5 font-display text-lg whitespace-nowrap text-foreground-muted no-underline hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
			href={resolve('/learn/[section]', { section: section.id })}
			aria-current={section.id === currentId ? 'page' : undefined}
		>
			{section.title}
			{#if section.units.length === 0}
				<span class="font-sans text-xs small-caps text-foreground-muted">soon</span>
			{/if}
		</a>
	{/each}
</nav>
