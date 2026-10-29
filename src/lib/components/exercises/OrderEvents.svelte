<script lang="ts">
	import type { OrderExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { chip, tile } from '#lib/components/ui/classes.ts';
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

<h2 class="text-2xl">{exercise.prompt}</h2>
<p class="mt-1 text-sepia">Tap the events in the order they happened.</p>

<ol class="mt-5 grid list-decimal gap-2 pl-7 font-display text-lg text-sepia">
	{#each { length: exercise.items.length }, i (i)}
		<li>
			{#if placed[i]}
				<button
					type="button"
					class={[
						tile(
							{ correct: status === 'correct', wrong: status === 'wrong' },
							'px-3.5 py-2.5 text-left'
						),
						'font-sans text-base text-ink'
					]}
					disabled={locked}
					aria-label={`Remove “${placed[i]}”`}
					onclick={() => update(placed.filter((p) => p !== placed[i]))}
				>
					{placed[i]}
				</button>
			{:else}
				<span class="block h-11 rounded-lg border border-dashed border-sepia/40" aria-hidden="true"
				></span>
			{/if}
		</li>
	{/each}
</ol>

<div class="mt-6 flex flex-wrap gap-2.5">
	{#each bank as item (item)}
		<button
			type="button"
			class={[chip(placed.includes(item)), 'text-left']}
			disabled={locked || placed.includes(item)}
			onclick={() => update([...placed, item])}
		>
			{item}
		</button>
	{/each}
</div>
