<script lang="ts">
	import type { TrueFalseExercise } from '#lib/content/types.ts';
	import { tile } from '#lib/components/ui/classes.ts';
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

<h2 class="text-2xl">True or false?</h2>
<p class="mt-5 border-l-2 border-sepia/40 py-1 pl-4 font-display text-2xl leading-snug italic">
	{exercise.statement}
</p>
<div class="mt-6 grid grid-cols-2 gap-3">
	{#each [true, false] as value (value)}
		{@const mine = selected === value}
		<button
			type="button"
			class={[
				tile(
					{
						selected: mine && status === 'answering',
						correct: mine && status === 'correct',
						wrong: mine && status === 'wrong'
					},
					'px-4 py-5 text-center'
				),
				'font-display text-xl'
			]}
			disabled={status !== 'answering'}
			aria-pressed={mine}
			onclick={() => choose(value)}
		>
			{value ? 'True' : 'False'}
		</button>
	{/each}
</div>
