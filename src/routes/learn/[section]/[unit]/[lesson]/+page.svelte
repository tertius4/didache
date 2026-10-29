<script lang="ts">
	import { resolve } from '$app/paths';
	import { progress } from '#lib/progress/store.svelte.ts';
	import LessonPlayer from '#lib/components/lesson/LessonPlayer.svelte';
	import Button from '#lib/components/ui/Button.svelte';
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
	<main class="grid flex-1 place-content-center gap-4 px-5 text-center">
		<p class="text-6xl" aria-hidden="true">🔒</p>
		<h1 class="font-display text-3xl font-semibold">This lesson is locked</h1>
		<p>Finish the lessons before it to unlock “{loc.lesson.title}”.</p>
		<Button href={resolve('/learn/[section]', { section: loc.section.id })}>Back to lessons</Button>
	</main>
{/if}
