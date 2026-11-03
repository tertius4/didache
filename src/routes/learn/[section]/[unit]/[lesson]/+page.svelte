<script lang="ts">
	import { resolve } from '$app/paths';
	import { progress } from '#lib/progress/store.svelte.ts';
	import LessonPlayer from '#lib/components/lesson/LessonPlayer.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const loc = $derived(data.location);
	const unlocked = $derived(progress.isUnlocked(loc.section.id, loc.unit, loc.lesson.id));
</script>

<Meta
	title={loc.lesson.title}
	description="{loc.lesson.title} ({loc.lesson.passage}): a short story from {loc.unit
		.title}, then a few questions to help it stay with you."
	image={loc.lesson.video?.poster ?? loc.unit.illustration}
	path={resolve('/learn/[section]/[unit]/[lesson]', {
		section: loc.section.id,
		unit: loc.unit.id,
		lesson: loc.lesson.id
	})}
	type="article"
/>

<!-- Whether a lesson is unlocked depends on saved progress, which loads after hydration. -->
{#if !progress.ready}
	<div class="flex-1"></div>
{:else if unlocked}
	{#key loc.key}
		<LessonPlayer location={loc} />
	{/key}
{:else}
	<main class="grid flex-1 place-content-center gap-4 px-5 text-center">
		<Icon name="lock" size={56} class="mx-auto text-foreground-muted" />
		<h1 class="font-display text-3xl font-semibold">This lesson is locked</h1>
		<p>Finish the lessons before it to unlock “{loc.lesson.title}”.</p>
		<Button
			href={resolve('/learn/[section]/[unit]', { section: loc.section.id, unit: loc.unit.id })}
		>
			<Icon name="arrow-left" size={16} /> Back to lessons
		</Button>
	</main>
{/if}
