<script lang="ts">
	import type { FillBlankExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { shuffle } from '#lib/lesson/check.ts';

	let {
		exercise,
		status,
		onanswer
	}: {
		exercise: FillBlankExercise;
		status: Status;
		onanswer: (answer: string | null) => void;
	} = $props();

	const options = $derived(shuffle(exercise.options));
	const parts = $derived(exercise.text.split('___'));
	let selected = $state<string | null>(null);
	const locked = $derived(status !== 'answering');

	function choose(word: string | null) {
		selected = word;
		onanswer(word);
	}
</script>

<h2>{exercise.prompt}</h2>
<p class="sentence">
	{parts[0]}<button
		type="button"
		class="blank"
		class:filled={selected}
		class:correct={status === 'correct'}
		class:wrong={status === 'wrong'}
		disabled={locked || !selected}
		aria-label={selected ? `Remove “${selected}”` : 'Empty blank'}
		onclick={() => choose(null)}>{selected ?? ' '}</button
	>{parts[1]}
</p>

<div class="bank">
	{#each options as word (word)}
		<button
			type="button"
			class="chip"
			class:used={selected === word}
			disabled={locked || selected === word}
			onclick={() => choose(word)}
		>
			{word}
		</button>
	{/each}
</div>

<style>
	.sentence {
		margin-top: 24px;
		font-size: 20px;
		font-weight: 700;
		line-height: 2.2;
	}

	.blank {
		display: inline-block;
		min-width: 96px;
		margin: 0 6px;
		padding: 2px 12px;
		border: none;
		border-bottom: 3px solid var(--border-strong);
		background: transparent;
		font-weight: 800;
		color: var(--sky-shadow);
		cursor: pointer;
		line-height: 1.4;
	}

	.blank.filled {
		border: 2px solid var(--sky);
		border-radius: 10px;
		background: var(--sky-soft);
	}

	.blank.correct {
		border-color: var(--primary);
		background: var(--primary-soft);
		color: var(--primary-shadow);
	}

	.blank.wrong {
		border-color: var(--danger);
		background: var(--danger-soft);
		color: var(--danger-shadow);
	}

	.bank {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
		margin-top: 32px;
	}
</style>
