<script lang="ts">
	import type { FillBlankExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { chip } from '#lib/components/ui/classes.ts';
	import { shuffle } from '#lib/lesson/check.ts';

	interface Props {
		exercise: FillBlankExercise;
		status: Status;
		onanswer: (answer: string | null) => void;
	}

	const { exercise, status, onanswer }: Props = $props();

	const options = $derived(shuffle(exercise.options));
	const parts = $derived(exercise.text.split('___'));
	let selected = $state<string | null>(null);
	const locked = $derived(status !== 'answering');

	function choose(word: string | null) {
		selected = word;
		onanswer(word);
	}
</script>

<h2 class="text-2xl">{exercise.prompt}</h2>
<p class="mt-6 font-display text-2xl leading-[2.2]">
	{parts[0]}<button
		type="button"
		class={[
			'mx-1.5 inline-block min-w-24 cursor-pointer px-3 py-0.5 font-sans text-lg leading-snug font-semibold disabled:cursor-default',
			!selected && 'border-b-2 border-border-strong',
			selected && 'rounded-md border',
			selected && status === 'answering' && 'border-primary bg-primary-soft',
			status === 'correct' && 'border-success bg-success-soft text-success',
			status === 'wrong' && 'border-error bg-error-soft text-error'
		]}
		disabled={locked || !selected}
		aria-label={selected ? `Remove “${selected}”` : 'Empty blank'}
		onclick={() => choose(null)}>{selected ?? '\u00a0'}</button
	>{parts[1]}
</p>

<div class="mt-8 flex flex-wrap justify-center gap-2.5">
	{#each options as word (word)}
		<button
			type="button"
			class={chip(selected === word)}
			disabled={locked || selected === word}
			onclick={() => choose(word)}
		>
			{word}
		</button>
	{/each}
</div>
