<script lang="ts">
	import { resolve } from '$app/paths';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import ChapterList from '#lib/components/path/ChapterList.svelte';
	import ActionBar from '#lib/components/ui/ActionBar.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Ornament from '#lib/components/ui/Ornament.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { section, unit } = $derived(data);
	const done = $derived(
		unit.lessons.filter((l) => progress.isComplete(lessonKey(section.id, unit.id, l.id))).length
	);
	const current = $derived(
		unit.lessons.find((l) => l.id === progress.currentLessonId(section.id, unit))
	);
</script>

<svelte:head>
	<title>{unit.title} · Unilogos</title>
</svelte:head>

<main class="px-5 pt-4 pb-36">
	<a
		class="text-sm text-sepia no-underline hover:text-ink"
		href={resolve('/learn/[section]', { section: section.id })}>← {section.title}</a
	>

	<header class="mt-4 grid gap-3 text-center">
		<div class="mx-auto w-3/5 overflow-hidden rounded-lg border border-sepia/25 sepia-[.2]">
			<Illustration name={unit.illustration} />
		</div>
		<h1 class="text-4xl">{unit.title}</h1>
		<p class="text-sepia">{unit.description}</p>
		<p class="text-sm small-caps text-sepia">
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
		>
			{done === 0 ? 'Begin' : 'Continue'}: {current.title}
		</Button>
	</ActionBar>
{/if}
