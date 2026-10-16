<script lang="ts">
	import type { AnyAnswer, Exercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import MultipleChoice from './MultipleChoice.svelte';
	import FillBlank from './FillBlank.svelte';
	import TrueFalse from './TrueFalse.svelte';
	import OrderEvents from './OrderEvents.svelte';
	import MatchPairs from './MatchPairs.svelte';

	let {
		exercise,
		status,
		onanswer
	}: {
		exercise: Exercise;
		status: Status;
		/** Called with the current answer, or null while the answer is incomplete. */
		onanswer: (answer: AnyAnswer | null) => void;
	} = $props();
</script>

<div data-exercise-id={exercise.id}>
	{#if exercise.type === 'mc'}
		<MultipleChoice {exercise} {status} {onanswer} />
	{:else if exercise.type === 'fill'}
		<FillBlank {exercise} {status} {onanswer} />
	{:else if exercise.type === 'truefalse'}
		<TrueFalse {exercise} {status} {onanswer} />
	{:else if exercise.type === 'order'}
		<OrderEvents {exercise} {status} {onanswer} />
	{:else if exercise.type === 'match'}
		<MatchPairs {exercise} {status} {onanswer} />
	{/if}
</div>
