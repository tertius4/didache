<script lang="ts">
	import { resolve } from '$app/paths';
	import Meta from '#lib/components/Meta.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import JourneyMap from '#lib/components/path/JourneyMap.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import Ornament from '#lib/components/ui/Ornament.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const section = $derived(data.section);
	const hasLessons = $derived(section.units.some((u) => !u.comingSoon));
	const shareImage = $derived(section.units.find((u) => u.illustration)?.illustration);
</script>

<Meta
	title={section.title}
	description={section.description}
	image={shareImage}
	path={resolve('/learn/[section]', { section: section.id })}
/>

<main class="px-5 pt-4 pb-10">
	<SiteHeader
		share={{
			title: `${section.title} · Didache`,
			text: section.description,
			context: { section: section.id }
		}}
	/>

	<section aria-labelledby="section-{section.id}">
		<!-- The title opens the list of all sections. -->
		<h1 id="section-{section.id}" class="text-center text-4xl">
			<a
				class="inline-flex items-center gap-2 rounded-lg px-2 text-foreground no-underline hover:bg-card-hover"
				href={resolve('/learn')}
				aria-label="{section.title}: show all sections"
			>
				{section.title}
				<Icon name="chevron-down" size={20} class="text-foreground-muted" />
			</a>
		</h1>
		<p class="mx-auto mt-2 max-w-sm text-center text-foreground-muted">{section.description}</p>
		<Ornament />
		<JourneyMap {section} />
	</section>

	<aside class="mt-4 rounded-lg border border-border bg-surface-sunken p-5">
		{#if !hasLessons}
			<p class="mb-3 text-foreground-muted">
				We’re writing the first lessons for this section. Join the waitlist to hear when they’re
				ready.
			</p>
		{/if}
		<WaitlistForm source="path" />
	</aside>
</main>
