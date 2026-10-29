<script lang="ts">
	import type { MatchExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { tile } from '#lib/components/ui/classes.ts';
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

	// Manuscript pigments: lapis, ochre, madder, verdigris, umber.
	const colors = ['#2f4f7a', '#b88a2e', '#8c3b5e', '#3d6b66', '#7a5c3e'];

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

<h2 class="text-2xl">{exercise.prompt}</h2>
<p class="mt-1 text-sepia">Tap an item on the left, then its match on the right.</p>

{#snippet item(
	label: string,
	color: string | undefined,
	props: { active?: boolean; disabled: boolean; onclick: () => void }
)}
	<button
		type="button"
		class={[
			tile(
				{
					selected: props.active,
					paired: !!color,
					correct: status === 'correct',
					wrong: status === 'wrong'
				},
				'p-3 text-center'
			),
			'min-h-16 text-[15px] disabled:text-ink'
		]}
		style:--pair={color}
		disabled={props.disabled}
		aria-pressed={props.active === undefined ? undefined : props.active}
		onclick={props.onclick}
	>
		{label}
	</button>
{/snippet}

<div class="mt-5 grid grid-cols-2 gap-3">
	<div class="grid content-start gap-2.5">
		{#each lefts as left (left)}
			{@render item(left, colorForLeft(left), {
				active: activeLeft === left,
				disabled: locked,
				onclick: () => tapLeft(left)
			})}
		{/each}
	</div>
	<div class="grid content-start gap-2.5">
		{#each rights as right (right)}
			{@const owner = leftForRight(right)}
			{@render item(right, owner ? colorForLeft(owner) : undefined, {
				disabled: locked || (!activeLeft && !owner),
				onclick: () => tapRight(right)
			})}
		{/each}
	</div>
</div>
