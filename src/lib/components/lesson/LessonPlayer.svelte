<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount, type Snippet } from 'svelte';
	import type { LessonLocation } from '#lib/content/index.ts';
	import type { AnyAnswer, LearnMore } from '#lib/content/types.ts';
	import { LessonSession } from '#lib/lesson/engine.svelte.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';
	import ExerciseView from '#lib/components/exercises/ExerciseView.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import StoryCard from './StoryCard.svelte';
	import VideoIntro from './VideoIntro.svelte';
	import LearnMoreSheet from './LearnMoreSheet.svelte';
	import FeedbackBanner from './FeedbackBanner.svelte';
	import LessonComplete from './LessonComplete.svelte';

	/** Mounted inside a {#key}, so `location` never changes for one instance. */
	let { location }: { location: LessonLocation } = $props();

	// svelte-ignore state_referenced_locally
	const { section, unit, lesson, key } = location;
	const ids = { section: section.id, unit: unit.id, lesson: lesson.id };
	const session = new LessonSession(lesson.exercises);
	const startedAt = Date.now();

	let phase = $state<'video' | 'story' | 'exercises' | 'complete'>('video');
	let cardIndex = $state(0);
	let learnMore = $state<LearnMore | null>(null);
	let answer = $state<AnyAnswer | null>(null);
	let lastCorrect = $state(false);
	let unitComplete = $state(false);

	const card = $derived(lesson.story[cardIndex]);
	const lastCard = $derived(cardIndex === lesson.story.length - 1);
	const barValue = $derived(
		phase === 'story' ? (cardIndex + 1) / lesson.story.length : session.progress
	);

	onMount(() => {
		track('lesson_started', ids);
		return () => {
			if (phase !== 'complete') {
				track('lesson_abandoned', { ...ids, phase, solved: session.solved, total: session.total });
			}
		};
	});

	$effect(() => {
		if (phase === 'story') track('story_card_viewed', { ...ids, card: card.id });
	});

	function openLearnMore(content: LearnMore, cardId: string) {
		learnMore = content;
		track('learn_more_opened', { ...ids, card: cardId });
	}

	function goTo(next: typeof phase) {
		phase = next;
		window.scrollTo({ top: 0 });
	}

	function readStory() {
		cardIndex = 0;
		goTo('story');
		track('story_opened', ids);
	}

	function prevCard() {
		if (cardIndex === 0) goTo('video');
		else cardIndex--;
	}

	function nextCard() {
		if (lastCard) goTo('exercises');
		else cardIndex++;
		window.scrollTo({ top: 0 });
	}

	function check() {
		const ex = session.current;
		if (answer === null || !ex) return;
		const result = session.submit(answer);
		lastCorrect = result.correct;
		track('exercise_answered', {
			...ids,
			exercise: ex.id,
			type: ex.type,
			correct: result.correct,
			attempt: result.attempt
		});
	}

	function continueOn() {
		session.next();
		answer = null;
		window.scrollTo({ top: 0 });
		if (session.done) finish();
	}

	function finish() {
		progress.markComplete(key);
		unitComplete =
			location.index === unit.lessons.length - 1 && progress.isUnitComplete(section.id, unit);
		phase = 'complete';
		track('lesson_completed', {
			...ids,
			accuracy: Math.round(session.accuracy * 100),
			duration_s: Math.round((Date.now() - startedAt) / 1000)
		});
		if (unitComplete) track('unit_completed', { section: section.id, unit: unit.id });
	}
</script>

<div class="flex-1">
	{#if phase !== 'complete'}
		<header
			class="sticky top-0 z-5 flex items-center gap-3.5 bg-vellum px-4 pt-[calc(12px+env(safe-area-inset-top))] pb-3"
		>
			<a
				class="p-1 text-xl text-sepia no-underline hover:text-ink"
				href={resolve('/learn/[section]', { section: section.id })}
				aria-label="Close lesson">✕</a
			>
			{#if phase === 'video'}
				<p class="flex-1 truncate text-sm text-sepia">{unit.title}</p>
			{:else}
				<ProgressBar
					value={barValue}
					label={phase === 'story' ? 'Story progress' : 'Exercise progress'}
				/>
			{/if}
		</header>
	{/if}

	<main class="px-5 pt-2 pb-36 [&_h2]:text-[22px]">
		{#if phase === 'video'}
			<VideoIntro
				{lesson}
				onplay={() => track('video_started', ids)}
				onended={() => track('video_completed', ids)}
				onlearnmore={openLearnMore}
				onread={readStory}
			/>
		{:else if phase === 'story'}
			<p class="mb-3 text-sm small-caps tracking-wide text-sepia">
				{lesson.title} · {lesson.passage}
			</p>
			{#key cardIndex}
				<StoryCard
					{card}
					onlearnmore={() => card.learnMore && openLearnMore(card.learnMore, card.id)}
				/>
			{/key}
		{:else if phase === 'exercises' && session.current}
			{#if session.isRetry}
				<p class="mb-3 text-sm font-semibold text-rubric">↻ Let’s try this one again</p>
			{/if}
			{#key session.position}
				<ExerciseView
					exercise={session.current}
					status={session.status}
					onanswer={(a) => (answer = a)}
				/>
			{/key}
		{:else if phase === 'complete'}
			<LessonComplete
				{lesson}
				accuracy={session.accuracy}
				total={session.total}
				{unitComplete}
				unitTitle={unit.title}
				sectionId={section.id}
				context={ids}
			/>
		{/if}
	</main>

	{#if phase === 'video'}
		{@render footer(videoActions)}
	{:else if phase === 'story'}
		{@render footer(storyActions)}
	{:else if phase === 'exercises' && session.current}
		{#if session.status === 'answering'}
			{@render footer(checkAction)}
		{:else}
			<FeedbackBanner exercise={session.current} correct={lastCorrect} oncontinue={continueOn} />
		{/if}
	{/if}
</div>

{#snippet footer(actions: Snippet)}
	<footer
		class="fixed bottom-0 left-1/2 w-full max-w-content -translate-x-1/2 border-t border-sepia/20 bg-vellum px-5 pt-3.5 pb-[calc(14px+env(safe-area-inset-bottom))]"
	>
		{@render actions()}
	</footer>
{/snippet}

{#snippet videoActions()}
	<Button onclick={() => goTo('exercises')}>Start practice</Button>
{/snippet}

{#snippet storyActions()}
	<div class="grid grid-cols-[1fr_2fr] gap-3">
		<Button variant="ghost" onclick={prevCard}>Back</Button>
		<Button onclick={nextCard}>{lastCard ? 'Start practice' : 'Next'}</Button>
	</div>
{/snippet}

{#snippet checkAction()}
	<Button disabled={answer === null} onclick={check}>Check</Button>
{/snippet}

<LearnMoreSheet content={learnMore} onclose={() => (learnMore = null)} />
