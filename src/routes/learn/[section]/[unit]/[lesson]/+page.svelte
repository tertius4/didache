<script lang="ts">
	import { resolve } from '$app/paths';
	import { progress } from '#lib/progress/store.svelte.ts';
	import LessonPlayer from '#lib/components/lesson/LessonPlayer.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const loc = $derived(data.location);
	const unlocked = $derived(progress.isUnlocked(loc.section.id, loc.unit, loc.lesson.id));
</script>

<svelte:head>
	<title>{loc.lesson.title} · Unilogos</title>
</svelte:head>

{#if unlocked}
	{#key loc.key}
		<LessonPlayer location={loc} />
	{/key}
{:else}
	<main class="page locked">
		<p class="icon" aria-hidden="true">🔒</p>
		<h1>This lesson is locked</h1>
		<p>Finish the lessons before it to unlock “{loc.lesson.title}”.</p>
		<a class="btn" href={resolve('/learn/[section]', { section: loc.section.id })}
			>Back to lessons</a
		>
	</main>
{/if}

<style>
	.locked {
		display: grid;
		gap: 16px;
		place-content: center;
		min-height: 100dvh;
		text-align: center;
	}

	.icon {
		font-size: 56px;
	}
</style>
