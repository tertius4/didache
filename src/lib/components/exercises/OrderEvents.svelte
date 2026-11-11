<script lang="ts">
	import { untrack } from 'svelte';
	import type { OrderExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { tile } from '#lib/components/ui/classes.ts';
	import { move, shuffle } from '#lib/lesson/check.ts';
	import Icon from '#lib/components/ui/Icon.svelte';

	interface Props {
		exercise: OrderExercise;
		status: Status;
		onanswer: (answer: string[] | null) => void;
	}

	const { exercise, status, onanswer }: Props = $props();

	// The list is always a complete answer, so it starts shuffled and is already answerable.
	let order = $state(untrack(() => shuffle(exercise.items)));
	const locked = $derived(status !== 'answering');

	$effect(() => {
		onanswer(order);
	});

	const arrow =
		'grid size-11 flex-none cursor-pointer place-items-center rounded-md text-foreground-muted enabled:hover:bg-surface-sunken disabled:cursor-default disabled:opacity-30';
</script>

<h2 class="text-2xl">{exercise.prompt}</h2>
<p class="mt-1 text-foreground-muted">Use the arrows to put the events in the order they happened.</p>

<ol class="mt-5 grid list-decimal gap-2 pl-7 font-display text-lg text-foreground-muted">
	{#each order as item, i (item)}
		<li>
			<div
				class={[
					tile(
						{ correct: status === 'correct', wrong: status === 'wrong' },
						'flex items-center gap-1 py-1 pr-1 pl-3.5'
					),
					'font-sans text-base text-foreground'
				]}
			>
				<span class="min-w-0 flex-1 py-1.5">{item}</span>
				<button
					type="button"
					class={arrow}
					disabled={locked || i === 0}
					aria-label={`Move “${item}” up`}
					onclick={() => (order = move(order, i, -1))}
				>
					<Icon name="chevron-down" size={18} class="rotate-180" />
				</button>
				<button
					type="button"
					class={arrow}
					disabled={locked || i === order.length - 1}
					aria-label={`Move “${item}” down`}
					onclick={() => (order = move(order, i, 1))}
				>
					<Icon name="chevron-down" size={18} />
				</button>
			</div>
		</li>
	{/each}
</ol>
