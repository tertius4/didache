<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import type { LessonLocation } from '#lib/content/index.ts';
	import type { AnyAnswer, LearnMore } from '#lib/content/types.ts';
	import { LessonSession } from '#lib/lesson/engine.svelte.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';
	import ExerciseView from '#lib/components/exercises/ExerciseView.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import StoryCard from './StoryCard.svelte';
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

	let phase = $state<'story' | 'exercises' | 'complete'>('story');
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

	function openLearnMore() {
		if (!card.learnMore) return;
		learnMore = card.learnMore;
		track('learn_more_opened', { ...ids, card: card.id });
	}

	function nextCard() {
		if (lastCard) phase = 'exercises';
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

<div class="player">
	{#if phase !== 'complete'}
		<header class="top">
			<a class="close" href={resolve('/learn')} aria-label="Close lesson">✕</a>
			<ProgressBar
				value={barValue}
				label={phase === 'story' ? 'Story progress' : 'Exercise progress'}
			/>
		</header>
	{/if}

	<main class="page content">
		{#if phase === 'story'}
			<p class="eyebrow">{lesson.title} · {lesson.passage}</p>
			{#key cardIndex}
				<StoryCard {card} onlearnmore={openLearnMore} />
			{/key}
		{:else if phase === 'exercises' && session.current}
			{#if session.isRetry}
				<p class="eyebrow retry">↻ Let’s try this one again</p>
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
				context={ids}
			/>
		{/if}
	</main>

	{#if phase === 'story'}
		<footer class="actions">
			<div class="inner two">
				<button
					type="button"
					class="btn ghost"
					disabled={cardIndex === 0}
					onclick={() => cardIndex--}
				>
					Back
				</button>
				<button type="button" class="btn" onclick={nextCard}>
					{lastCard ? 'Start practice' : 'Next'}
				</button>
			</div>
		</footer>
	{:else if phase === 'exercises' && session.current}
		{#if session.status === 'answering'}
			<footer class="actions">
				<div class="inner">
					<button type="button" class="btn" disabled={answer === null} onclick={check}>
						Check
					</button>
				</div>
			</footer>
		{:else}
			<FeedbackBanner exercise={session.current} correct={lastCorrect} oncontinue={continueOn} />
		{/if}
	{/if}
</div>

<LearnMoreSheet content={learnMore} onclose={() => (learnMore = null)} />

<style>
	.player {
		min-height: 100dvh;
	}

	.top {
		position: sticky;
		top: 0;
		z-index: 5;
		display: flex;
		align-items: center;
		gap: 14px;
		max-width: var(--content-width);
		margin: 0 auto;
		padding: calc(12px + env(safe-area-inset-top)) 16px 12px;
		background: var(--bg);
	}

	.close {
		font-size: 22px;
		font-weight: 900;
		color: var(--muted);
		text-decoration: none;
		padding: 4px;
	}

	.content {
		padding-bottom: 140px;
	}

	.eyebrow {
		margin-bottom: 12px;
		font-size: 13px;
		font-weight: 900;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.eyebrow.retry {
		color: var(--sun-shadow);
	}

	.content :global(h2) {
		font-size: 22px;
	}

	.actions {
		position: fixed;
		inset: auto 0 0 0;
		padding: 14px 16px calc(14px + env(safe-area-inset-bottom));
		border-top: 2px solid var(--border);
		background: var(--bg);
	}

	.inner {
		max-width: var(--content-width);
		margin: 0 auto;
	}

	.inner.two {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 12px;
	}
</style>
