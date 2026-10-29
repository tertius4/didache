<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Section } from '#lib/content/types.ts';

	let { sections, currentId }: { sections: Section[]; currentId: string } = $props();
</script>

<nav
	class="-mx-5 mb-6 flex [scrollbar-width:none] gap-5 overflow-x-auto border-b border-sepia/25 px-5"
	aria-label="Sections"
>
	{#each sections as section (section.id)}
		<a
			class="-mb-px inline-flex flex-none items-center gap-1.5 border-b-2 border-transparent py-2.5 font-display text-lg whitespace-nowrap text-sepia no-underline hover:text-ink aria-[current=page]:border-rubric aria-[current=page]:font-semibold aria-[current=page]:text-ink"
			href={resolve('/learn/[section]', { section: section.id })}
			aria-current={section.id === currentId ? 'page' : undefined}
		>
			{section.title}
			{#if section.units.length === 0}
				<span class="font-sans text-xs small-caps text-sepia">soon</span>
			{/if}
		</a>
	{/each}
</nav>
