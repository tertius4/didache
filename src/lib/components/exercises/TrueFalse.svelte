<script lang="ts">
	import type { TrueFalseExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';

	let {
		exercise,
		status,
		onanswer
	}: {
		exercise: TrueFalseExercise;
		status: Status;
		onanswer: (answer: boolean | null) => void;
	} = $props();

	let selected = $state<boolean | null>(null);

	function choose(value: boolean) {
		selected = value;
		onanswer(value);
	}
</script>

<h2>True or false?</h2>
<p class="statement">{exercise.statement}</p>
<div class="choices">
	{#each [true, false] as value (value)}
		<button
			type="button"
			class="tile"
			class:selected={selected === value && status === 'answering'}
			class:correct={selected === value && status === 'correct'}
			class:wrong={selected === value && status === 'wrong'}
			disabled={status !== 'answering'}
			aria-pressed={selected === value}
			onclick={() => choose(value)}
		>
			<span aria-hidden="true">{value ? '👍' : '👎'}</span>
			{value ? 'True' : 'False'}
		</button>
	{/each}
</div>

<style>
	.statement {
		margin-top: 20px;
		padding: 20px;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		font-size: 19px;
		font-weight: 700;
	}

	.choices {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		margin-top: 24px;
	}

	.choices .tile {
		text-align: center;
		font-size: 18px;
		padding: 18px;
	}
</style>
