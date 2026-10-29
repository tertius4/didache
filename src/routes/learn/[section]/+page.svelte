<script lang="ts">
	import { sections } from '#lib/content/index.ts';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SectionTabs from '#lib/components/path/SectionTabs.svelte';
	import JourneyMap from '#lib/components/path/JourneyMap.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
	import Ornament from '#lib/components/ui/Ornament.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const section = $derived(data.section);
</script>

<svelte:head>
	<title>{section.title} · Unilogos</title>
</svelte:head>

<main class="px-5 pt-4 pb-10">
	<SiteHeader />
	<SectionTabs {sections} currentId={section.id} />

	<section aria-labelledby="section-{section.id}">
		<h1 id="section-{section.id}" class="text-center text-4xl">{section.title}</h1>
		<p class="mx-auto mt-2 max-w-sm text-center text-sepia">{section.description}</p>
		<Ornament />
		<JourneyMap {section} />
	</section>

	<aside class="mt-4 rounded-lg border border-sepia/25 bg-vellum-deep/40 p-5">
		{#if section.units.length === 0}
			<p class="mb-3 text-sepia">
				We’re writing the first lessons for this section. Join the waitlist to hear when they’re
				ready.
			</p>
		{/if}
		<WaitlistForm source="path" />
	</aside>
</main>
