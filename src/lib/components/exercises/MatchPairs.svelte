<script lang="ts">
	import type { MatchExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { shuffle } from '#lib/lesson/check.ts';

	let {
		exercise,
		status,
		onanswer
	}: {
		exercise: MatchExercise;
		status: Status;
		onanswer: (answer: Record<string, string> | null) => void;
	} = $props();

	const colors = ['#3aa6e8', '#ff8a3d', '#8a63d2', '#2fb36b', '#ef5b5b'];

	const lefts = $derived(shuffle(exercise.pairs.map(([l]) => l)));
	const rights = $derived(shuffle(exercise.pairs.map(([, r]) => r)));

	let pairs = $state<Record<string, string>>({});
	let activeLeft = $state<string | null>(null);
	const locked = $derived(status !== 'answering');

	/** Each pair gets a colour based on when it was made. */
	const pairOrder = $derived(Object.keys(pairs));

	function colorForLeft(left: string): string | undefined {
		const i = pairOrder.indexOf(left);
		return i >= 0 ? colors[i % colors.length] : undefined;
	}

	function leftForRight(right: string): string | undefined {
		return Object.keys(pairs).find((l) => pairs[l] === right);
	}

	function emit() {
		onanswer(Object.keys(pairs).length === exercise.pairs.length ? { ...pairs } : null);
	}

	function tapLeft(left: string) {
		if (pairs[left]) {
			delete pairs[left];
			activeLeft = null;
			emit();
			return;
		}
		activeLeft = activeLeft === left ? null : left;
	}

	function tapRight(right: string) {
		const existing = leftForRight(right);
		if (existing) delete pairs[existing];
		if (activeLeft) {
			pairs[activeLeft] = right;
			activeLeft = null;
		}
		emit();
	}
</script>

<h2>{exercise.prompt}</h2>
<p class="hint">Tap an item on the left, then its match on the right.</p>

<div class="columns" class:correct={status === 'correct'} class:wrong={status === 'wrong'}>
	<div class="col">
		{#each lefts as left (left)}
			{@const color = colorForLeft(left)}
			<button
				type="button"
				class="tile"
				class:selected={activeLeft === left}
				class:paired={color}
				style:--pair={color}
				disabled={locked}
				aria-pressed={activeLeft === left}
				onclick={() => tapLeft(left)}
			>
				{left}
			</button>
		{/each}
	</div>
	<div class="col">
		{#each rights as right (right)}
			{@const owner = leftForRight(right)}
			{@const color = owner ? colorForLeft(owner) : undefined}
			<button
				type="button"
				class="tile"
				class:paired={color}
				style:--pair={color}
				disabled={locked || (!activeLeft && !owner)}
				onclick={() => tapRight(right)}
			>
				{right}
			</button>
		{/each}
	</div>
</div>

<style>
	.hint {
		margin-top: 4px;
		color: var(--muted);
		font-size: 15px;
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		margin-top: 20px;
	}

	.col {
		display: grid;
		gap: 10px;
		align-content: start;
	}

	.col .tile {
		padding: 12px;
		font-size: 15px;
		text-align: center;
		min-height: 64px;
	}

	.col .tile:disabled {
		color: inherit;
	}

	.tile.paired {
		border-color: var(--pair);
		box-shadow: 0 3px 0 var(--pair);
		background: color-mix(in srgb, var(--pair) 14%, white);
	}

	.columns.correct .tile {
		border-color: var(--primary);
		box-shadow: 0 3px 0 var(--primary);
	}

	.columns.wrong .tile {
		border-color: var(--danger);
		box-shadow: 0 3px 0 var(--danger);
	}
</style>
