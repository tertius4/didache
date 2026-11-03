<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import type { LessonLocation } from '#lib/content/index.ts';
	import type { AnyAnswer } from '#lib/content/types.ts';
	import { LessonSession } from '#lib/lesson/engine.svelte.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { scrollPageToTop } from '#lib/components/ui/scroll.ts';
	import { track } from '#lib/analytics.ts';
	import ExerciseView from '#lib/components/exercises/ExerciseView.svelte';
	import ActionBar from '#lib/components/ui/ActionBar.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import StoryCard from './StoryCard.svelte';
	import VideoIntro from './VideoIntro.svelte';
	import FeedbackBanner from './FeedbackBanner.svelte';
	import LessonComplete from './LessonComplete.svelte';

	interface Props {
		/** Mounted inside a {#key}, so `location` never changes for one instance. */
		location: LessonLocation;
	}

	const { location }: Props = $props();

	// svelte-ignore state_referenced_locally
	const { section, unit, lesson, key } = location;
	const ids = { section: section.id, unit: unit.id, lesson: lesson.id };
	const session = new LessonSession(lesson.exercises);
	const startedAt = Date.now();

	let phase = $state<'video' | 'story' | 'exercises' | 'complete'>('video');
	let cardIndex = $state(0);
	let answer = $state<AnyAnswer | null>(null);
	let lastCorrect = $state(false);
	let unitComplete = $state(false);

	const card = $derived(lesson.story[cardIndex]);
	const lastCard = $derived(cardIndex === lesson.story.length - 1);
	/** Fetched ahead so the next card's picture is there when "Next" is tapped. */
	const nextImage = $derived(lesson.story[cardIndex + 1]?.image);
	const barValue = $derived(
		phase === 'story' ? (cardIndex + 1) / lesson.story.length : session.progress
	);

	onMount(() => {
		return () => {
			if (phase !== 'complete') {
				track('lesson_abandoned', { ...ids, phase, solved: session.solved, total: session.total });
			}
		};
	});

	$effect(() => {
		if (phase === 'story') track('story_card_viewed', { ...ids, card: card.id });
	});

	function goTo(next: typeof phase) {
		phase = next;
		scrollPageToTop();
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
		scrollPageToTop();
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
		scrollPageToTop();
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

<div class="flex flex-1 flex-col">
	{#if phase === 'story' || phase === 'exercises'}
		<header class="sticky top-0 z-5 flex items-center gap-3.5 bg-surface px-4 py-3">
			<a
				class="p-1 text-xl text-foreground-muted no-underline hover:text-foreground"
				href={resolve('/learn/[section]/[unit]', { section: section.id, unit: unit.id })}
				aria-label="Close lesson"><Icon name="xmark" size={22} /></a
			>
			<ProgressBar
				value={barValue}
				label={phase === 'story' ? 'Story progress' : 'Exercise progress'}
			/>
		</header>
	{/if}

	<main class="px-5 pt-2 pb-6">
		{#if phase === 'video'}
			<VideoIntro
				{lesson}
				section={section.id}
				unit={unit.id}
				onplay={() => track('video_started', ids)}
				onended={() => track('video_completed', ids)}
				onread={readStory}
				onpractice={() => goTo('exercises')}
			/>
		{:else if phase === 'story'}
			<p class="mb-3 text-sm small-caps tracking-wide text-foreground-muted">
				{lesson.title} · {lesson.passage}
			</p>
			{#key cardIndex}
				<StoryCard {card} />
			{/key}
		{:else if phase === 'exercises' && session.current}
			{#if session.isRetry}
				<p class="mb-3 flex items-center gap-1.5 text-sm font-semibold text-warning-foreground">
					<Icon name="rotate-left" size={14} /> Let’s try this one again
				</p>
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
				{location}
				context={ids}
			/>
		{/if}
	</main>

	{#if phase === 'story'}
		<ActionBar>
			<div class="grid grid-cols-[1fr_2fr] gap-3">
				<Button variant="ghost" onclick={prevCard}><Icon name="arrow-left" size={16} /> Back</Button
				>
				<Button onclick={nextCard}>
					{#if lastCard}
						<Icon name="pencil" size={16} /> Start practice
					{:else}
						Next <Icon name="arrow-right" size={16} />
					{/if}
				</Button>
			</div>
		</ActionBar>
	{:else if phase === 'exercises' && session.current}
		<!-- The bar stays put while the result slides up over it, so the lesson never jumps. -->
		<ActionBar>
			<Button disabled={answer === null || session.status !== 'answering'} onclick={check}
				><Icon name="check" size={16} /> Check</Button
			>
			{#if session.status !== 'answering'}
				<FeedbackBanner exercise={session.current} correct={lastCorrect} oncontinue={continueOn} />
			{/if}
		</ActionBar>
	{/if}
</div>

<svelte:head>
	{#if phase === 'story' && nextImage}
		<link rel="preload" as="image" href={nextImage} />
	{/if}
</svelte:head>
