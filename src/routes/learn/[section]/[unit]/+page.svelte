<script lang="ts">
	import { resolve } from '$app/paths';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';
	import ChapterList from '#lib/components/path/ChapterList.svelte';
	import ActionBar from '#lib/components/ui/ActionBar.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Ornament from '#lib/components/ui/Ornament.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const { section, unit } = $derived(data);
	const done = $derived(
		unit.lessons.filter((l) => progress.isComplete(lessonKey(section.id, unit.id, l.id))).length
	);
	const current = $derived(
		unit.lessons.find((l) => l.id === progress.currentLessonId(section.id, unit))
	);
</script>

<Meta
	title={unit.title}
	description={unit.description}
	image={unit.illustration}
	path={resolve('/learn/[section]/[unit]', { section: section.id, unit: unit.id })}
/>

<main class="px-5 pt-4 pb-6">
	<a
		class="inline-flex items-center gap-1.5 text-sm text-foreground-muted no-underline hover:text-foreground"
		href={resolve('/learn/[section]', { section: section.id })}
		><Icon name="arrow-left" size={14} /> {section.title}</a
	>

	<header class="mt-4 grid gap-3 text-center">
		<div class="mx-auto w-3/5 overflow-hidden rounded-lg border border-border sepia-[.2]">
			<img class="block aspect-square h-auto w-full object-cover" src={unit.illustration} alt="" />
		</div>
		<h1 class="text-4xl">{unit.title}</h1>
		<p class="text-foreground-muted">{unit.description}</p>
		<p class="text-sm small-caps text-foreground-muted">
			{done} of {unit.lessons.length} lessons complete
		</p>
	</header>

	<Ornament />
	<ChapterList sectionId={section.id} {unit} />
</main>

{#if current}
	<ActionBar>
		<Button
			href={resolve('/learn/[section]/[unit]/[lesson]', {
				section: section.id,
				unit: unit.id,
				lesson: current.id
			})}
			onclick={() =>
				track('lesson_started', { section: section.id, unit: unit.id, lesson: current.id })}
		>
			<Icon name="play" size={14} />
			{done === 0 ? 'Begin' : 'Continue'}: {current.title}
		</Button>
	</ActionBar>
{/if}
