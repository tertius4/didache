<script lang="ts">
	import { resolve } from '$app/paths';
	import FeedbackPrompt from '#lib/components/FeedbackPrompt.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Ornament from '#lib/components/ui/Ornament.svelte';
	import { nextLesson, type LessonLocation } from '#lib/content/index.ts';
	import type { Lesson } from '#lib/content/types.ts';
	import VerseQuote from './VerseQuote.svelte';

	let {
		lesson,
		accuracy,
		total,
		unitComplete,
		location,
		context
	}: {
		lesson: Lesson;
		accuracy: number;
		total: number;
		unitComplete: boolean;
		location: LessonLocation;
		context: Record<string, string>;
	} = $props();

	const pct = $derived(Math.round(accuracy * 100));
	const next = $derived(nextLesson(location));
	/** The story's closing verse is the one to carry away. */
	const keyVerse = $derived(lesson.story.toReversed().find((c) => c.verse)?.verse);
	const unitHref = $derived(
		resolve('/learn/[section]/[unit]', { section: location.section.id, unit: location.unit.id })
	);
</script>

<div class="grid animate-pop-in grid-cols-1 gap-5 pt-6 pb-6 text-center">
	<!-- A gold seal, pressed into the scroll. -->
	<div
		class="mx-auto grid size-28 place-items-center rounded-full border-4 border-double border-vellum bg-gold text-5xl text-vellum shadow-[0_0_0_3px_var(--color-gold),0_6px_16px_-6px_rgb(46_33_23/0.5)]"
		aria-hidden="true"
	>
		{unitComplete ? '✦' : '✓'}
	</div>

	<div>
		<p class="text-sm small-caps text-sepia">
			{unitComplete ? 'Milestone reached' : 'Lesson complete'}
		</p>
		<h1 class="text-4xl">{unitComplete ? location.unit.title : lesson.title}</h1>
	</div>

	<dl class="mx-auto flex divide-x divide-sepia/30">
		<div class="px-6">
			<dt class="text-sm small-caps text-sepia">First-try accuracy</dt>
			<dd class="font-display text-4xl font-semibold">{pct}%</dd>
		</div>
		<div class="px-6">
			<dt class="text-sm small-caps text-sepia">Questions</dt>
			<dd class="font-display text-4xl font-semibold">{total}</dd>
		</div>
	</dl>

	{#if keyVerse}
		<div class="text-left"><VerseQuote verse={keyVerse} /></div>
	{/if}

	{#if unitComplete}
		<Ornament />
		<section class="rounded-lg border border-sepia/25 bg-vellum-deep/40 p-5 text-left">
			<FeedbackPrompt {context} />
		</section>
		<section class="rounded-lg border border-sepia/25 bg-vellum-deep/40 p-5 text-left">
			<WaitlistForm source="unit-complete" />
		</section>
	{/if}

	<div class="grid gap-3">
		{#if next && !unitComplete}
			<Button
				href={resolve('/learn/[section]/[unit]/[lesson]', {
					section: location.section.id,
					unit: location.unit.id,
					lesson: next.id
				})}>Next stop: {next.title} →</Button
			>
			<Button variant="ghost" href={unitHref}>Back to {location.unit.title}</Button>
		{:else}
			<Button href={resolve('/learn/[section]', { section: location.section.id })}>
				Back to the journey
			</Button>
		{/if}
	</div>
</div>
