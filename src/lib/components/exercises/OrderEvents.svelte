<script lang="ts">
	import type { OrderExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { shuffle } from '#lib/lesson/check.ts';

	let {
		exercise,
		status,
		onanswer
	}: {
		exercise: OrderExercise;
		status: Status;
		onanswer: (answer: string[] | null) => void;
	} = $props();

	const bank = $derived(shuffle(exercise.items));
	let placed = $state<string[]>([]);
	const locked = $derived(status !== 'answering');

	function update(next: string[]) {
		placed = next;
		onanswer(next.length === exercise.items.length ? next : null);
	}
</script>

<h2>{exercise.prompt}</h2>
<p class="hint">Tap the events in the order they happened.</p>

<ol class="placed" class:correct={status === 'correct'} class:wrong={status === 'wrong'}>
	{#each { length: exercise.items.length }, i (i)}
		<li>
			{#if placed[i]}
				<button
					type="button"
					class="tile"
					disabled={locked}
					aria-label={`Remove “${placed[i]}”`}
					onclick={() => update(placed.filter((p) => p !== placed[i]))}
				>
					{placed[i]}
				</button>
			{:else}
				<span class="slot" aria-hidden="true"></span>
			{/if}
		</li>
	{/each}
</ol>

<div class="bank">
	{#each bank as item (item)}
		<button
			type="button"
			class="chip"
			class:used={placed.includes(item)}
			disabled={locked || placed.includes(item)}
			onclick={() => update([...placed, item])}
		>
			{item}
		</button>
	{/each}
</div>

<style>
	.hint {
		margin-top: 4px;
		color: var(--muted);
		font-size: 15px;
	}

	.placed {
		display: grid;
		gap: 8px;
		margin: 20px 0 0;
		padding: 0 0 0 28px;
		list-style: decimal;
		font-weight: 800;
		color: var(--muted);
	}

	.placed li::marker {
		font-weight: 900;
	}

	.placed .tile {
		padding: 10px 14px;
		color: var(--text);
		font-size: 15px;
	}

	.placed.correct .tile {
		border-color: var(--primary);
		background: var(--primary-soft);
	}

	.placed.wrong .tile {
		border-color: var(--danger);
		background: var(--danger-soft);
	}

	.slot {
		display: block;
		height: 46px;
		border: 2px dashed var(--border-strong);
		border-radius: var(--radius);
	}

	.bank {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 24px;
	}

	.bank .chip {
		font-size: 15px;
		text-align: left;
	}
</style>
