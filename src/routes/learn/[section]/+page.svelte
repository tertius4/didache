<script lang="ts">
	import { resolve } from '$app/paths';
	import { sections } from '#lib/content/index.ts';
	import SectionTabs from '#lib/components/path/SectionTabs.svelte';
	import UnitPath from '#lib/components/path/UnitPath.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const section = $derived(data.section);
	const empty = $derived(section.units.length === 0);
</script>

<svelte:head>
	<title>{section.title} · Unilogos</title>
</svelte:head>

<main class="page">
	<header class="top">
		<span class="logo">Unilogos</span>
		<a href={resolve('/about')} class="about" aria-label="About Unilogos">ⓘ</a>
	</header>

	<SectionTabs {sections} currentId={section.id} />

	<section class="section" aria-labelledby="section-{section.id}">
		<h1 id="section-{section.id}">{section.title}</h1>
		<p class="desc">{section.description}</p>
		{#each section.units as unit (unit.id)}
			<UnitPath sectionId={section.id} {unit} />
		{/each}
	</section>

	<aside class="coming-soon" class:empty>
		<h2>{empty ? 'Coming soon' : 'More coming soon'}</h2>
		{#if section.upcoming}<p>{section.upcoming}</p>{/if}
		{#if empty}<p>
				We’re writing the first lessons for this section. Join the waitlist to hear when they’re
				ready.
			</p>{/if}
		<WaitlistForm source="path" />
	</aside>
</main>

<style>
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	.logo {
		font-weight: 900;
		font-size: 22px;
		color: var(--primary-shadow);
	}

	.about {
		font-size: 24px;
		text-decoration: none;
		color: var(--muted);
	}

	.section h1 {
		font-size: 26px;
	}

	.desc {
		margin: 4px 0 20px;
		color: var(--muted);
	}

	.coming-soon {
		display: grid;
		gap: 10px;
		margin: 48px 0 24px;
		padding: 18px;
		border: 2px dashed var(--border-strong);
		border-radius: var(--radius-lg);
	}

	.coming-soon.empty {
		margin-top: 8px;
	}

	.coming-soon h2 {
		font-size: 20px;
	}

	.coming-soon p {
		color: var(--muted);
	}
</style>
