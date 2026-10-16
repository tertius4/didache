<script lang="ts">
	import type { MultipleChoiceExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { shuffle } from '#lib/lesson/check.ts';

	let {
		exercise,
		status,
		onanswer
	}: {
		exercise: MultipleChoiceExercise;
		status: Status;
		onanswer: (answer: string | null) => void;
	} = $props();

	const options = $derived(shuffle(exercise.options));
	let selected = $state<string | null>(null);

	function choose(option: string) {
		selected = option;
		onanswer(option);
	}
</script>

<h2>{exercise.prompt}</h2>
<div class="options">
	{#each options as option (option)}
		<button
			type="button"
			class="tile"
			class:selected={selected === option && status === 'answering'}
			class:correct={selected === option && status === 'correct'}
			class:wrong={selected === option && status === 'wrong'}
			disabled={status !== 'answering'}
			aria-pressed={selected === option}
			onclick={() => choose(option)}
		>
			{option}
		</button>
	{/each}
</div>

<style>
	.options {
		display: grid;
		gap: 12px;
		margin-top: 20px;
	}
</style>
