<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Section } from '#lib/content/types.ts';

	let { sections, currentId }: { sections: Section[]; currentId: string } = $props();
</script>

<nav class="tabs" aria-label="Sections">
	{#each sections as section (section.id)}
		<a
			class="tab"
			href={resolve('/learn/[section]', { section: section.id })}
			aria-current={section.id === currentId ? 'page' : undefined}
		>
			{section.title}
			{#if section.units.length === 0}<span class="soon">Soon</span>{/if}
		</a>
	{/each}
</nav>

<style>
	.tabs {
		display: flex;
		gap: 8px;
		margin: 0 0 24px;
		padding-bottom: 4px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tab {
		display: inline-flex;
		flex: none;
		gap: 6px;
		align-items: center;
		padding: 8px 14px;
		border: 2px solid var(--border);
		border-radius: 999px;
		background: var(--surface);
		color: var(--muted);
		font-weight: 800;
		font-size: 15px;
		text-decoration: none;
		white-space: nowrap;
	}

	.tab[aria-current='page'] {
		border-color: var(--primary);
		background: var(--primary-soft);
		color: var(--primary-shadow);
	}

	.soon {
		padding: 1px 6px;
		border-radius: 999px;
		background: var(--locked);
		color: var(--muted);
		font-size: 11px;
		text-transform: uppercase;
	}
</style>
