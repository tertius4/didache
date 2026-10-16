<script lang="ts">
	import { resolve } from '$app/paths';
	import { sections } from '#lib/content/index.ts';
	import UnitPath from '#lib/components/path/UnitPath.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
</script>

<svelte:head>
	<title>Lessons · Unilogos</title>
</svelte:head>

<main class="page">
	<header class="top">
		<span class="logo">Unilogos</span>
		<a href={resolve('/about')} class="about" aria-label="About Unilogos">ⓘ</a>
	</header>

	{#each sections as section (section.id)}
		<section class="section" aria-labelledby="section-{section.id}">
			<h1 id="section-{section.id}">{section.title}</h1>
			<p class="desc">{section.description}</p>
			{#each section.units as unit (unit.id)}
				<UnitPath sectionId={section.id} {unit} />
			{/each}
		</section>
	{/each}

	<aside class="coming-soon">
		<h2>More stories coming soon</h2>
		<p>Abraham, Moses, David, the life of Jesus… and a whole section on church history.</p>
		<WaitlistForm source="path" />
	</aside>
</main>

<style>
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
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

	.coming-soon h2 {
		font-size: 20px;
	}

	.coming-soon p {
		color: var(--muted);
	}
</style>
