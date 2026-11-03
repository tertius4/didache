<script lang="ts">
	import { resolve } from '$app/paths';
	import { sections } from '#lib/content/index.ts';
	import Meta from '#lib/components/Meta.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	function summary(open: number, soon: number): string {
		if (open === 0) return 'Coming soon';
		const stories = `${open} ${open === 1 ? 'story' : 'stories'}`;
		return soon ? `${stories} · ${soon} coming soon` : stories;
	}
</script>

<Meta
	title="All sections"
	description="Every section of Didache: Bible stories, the big story of Scripture, and Christ in all of Scripture."
	path="/learn"
/>

<main class="px-5 pt-4 pb-10">
	<SiteHeader />
	<h1 class="text-center text-4xl">All sections</h1>
	<p class="mx-auto mt-2 mb-6 max-w-sm text-center text-foreground-muted">
		Choose where to continue your journey through Scripture.
	</p>

	<ul class="grid gap-3">
		{#each sections as section (section.id)}
			{@const open = section.units.filter((u) => !u.comingSoon).length}
			{@const soon = section.units.length - open}
			<li>
				<a
					class={[
						'group flex items-center gap-4 rounded-lg border bg-card p-4 text-foreground no-underline transition-colors hover:bg-card-hover',
						open ? 'border-border-strong' : 'border-border opacity-75'
					]}
					href={resolve('/learn/[section]', { section: section.id })}
				>
					<span
						class={[
							'grid size-12 flex-none place-items-center rounded-full',
							open ? 'bg-primary text-on-primary' : 'bg-surface-sunken text-foreground-muted'
						]}
					>
						<Icon name="book-bible" size={20} />
					</span>
					<span class="grid min-w-0 flex-1 gap-0.5">
						<span class="font-display text-xl leading-tight font-semibold group-hover:underline">
							{section.title}
						</span>
						<span class="line-clamp-2 text-sm text-foreground-muted">{section.description}</span>
						<span class="text-sm small-caps text-foreground-muted">{summary(open, soon)}</span>
					</span>
					<Icon name="chevron-right" size={16} class="text-foreground-muted" />
				</a>
			</li>
		{/each}
	</ul>
</main>
