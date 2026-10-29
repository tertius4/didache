<script lang="ts">
	import type { MultipleChoiceExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { tile } from '#lib/components/ui/classes.ts';
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

<h2 class="text-2xl">{exercise.prompt}</h2>
<div class="mt-5 grid gap-3">
	{#each options as option (option)}
		{@const mine = selected === option}
		<button
			type="button"
			class={tile({
				selected: mine && status === 'answering',
				correct: mine && status === 'correct',
				wrong: mine && status === 'wrong'
			})}
			disabled={status !== 'answering'}
			aria-pressed={mine}
			onclick={() => choose(option)}
		>
			{option}
		</button>
	{/each}
</div>
