<script lang="ts">
	import { resolve } from '$app/paths';
	import FeedbackPrompt from '#lib/components/FeedbackPrompt.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Ornament from '#lib/components/ui/Ornament.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { LessonLocation } from '#lib/content/index.ts';
	import type { Lesson } from '#lib/content/types.ts';
	import VerseQuote from './VerseQuote.svelte';

	interface Props {
		lesson: Lesson;
		accuracy: number;
		total: number;
		unitComplete: boolean;
		location: LessonLocation;
		context: Record<string, string>;
	}

	const { lesson, accuracy, total, unitComplete, location, context }: Props = $props();

	const pct = $derived(Math.round(accuracy * 100));
	/** The story's closing verse is the one to carry away. */
	const keyVerse = $derived(lesson.story.toReversed().find((c) => c.verse)?.verse);
	const unitHref = $derived(
		resolve('/learn/[section]/[unit]', { section: location.section.id, unit: location.unit.id })
	);
</script>

<div class="grid animate-pop-in grid-cols-1 gap-5 pt-6 pb-6 text-center">
	<!-- A gold seal, pressed into the scroll. -->
	<div
		class="mx-auto grid size-28 place-items-center rounded-full border-4 border-double border-surface bg-secondary text-5xl text-on-secondary shadow-[0_0_0_3px_var(--color-secondary),0_6px_16px_-6px_color-mix(in_srgb,var(--color-overlay)_50%,transparent)]"
		aria-hidden="true"
	>
		<Icon name={unitComplete ? 'star' : 'check'} size={48} />
	</div>

	<div>
		<p class="text-sm small-caps text-foreground-muted">
			{unitComplete ? 'Milestone reached' : 'Lesson complete'}
		</p>
		<h1 class="text-4xl">{unitComplete ? location.unit.title : lesson.title}</h1>
	</div>

	<dl class="mx-auto flex divide-x divide-border">
		<div class="px-6">
			<dt class="text-sm small-caps text-foreground-muted">First-try accuracy</dt>
			<dd class="font-display text-4xl font-semibold">{pct}%</dd>
		</div>
		<div class="px-6">
			<dt class="text-sm small-caps text-foreground-muted">Questions</dt>
			<dd class="font-display text-4xl font-semibold">{total}</dd>
		</div>
	</dl>

	{#if keyVerse}
		<div class="text-left"><VerseQuote verse={keyVerse} /></div>
	{/if}

	{#if unitComplete}
		<Ornament />
		<section class="rounded-lg border border-border bg-surface-sunken p-5 text-left">
			<FeedbackPrompt {context} />
		</section>
		<section class="rounded-lg border border-border bg-surface-sunken p-5 text-left">
			<WaitlistForm source="unit-complete" />
		</section>
	{/if}

	<div class="grid gap-3">
		<Button href={unitHref}><Icon name="check" size={16} /> Finish</Button>
		{#if !unitComplete}
			<a
				class="inline-flex items-center justify-center gap-1.5 text-sm"
				href={resolve('/feedback')}
			>
				<Icon name="comment" size={14} /> Tell us what you thought of this lesson
			</a>
		{/if}
	</div>
</div>
