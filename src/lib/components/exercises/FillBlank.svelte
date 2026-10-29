<script lang="ts">
	import type { FillBlankExercise } from '#lib/content/types.ts';
	import type { Status } from '#lib/lesson/engine.svelte.ts';
	import { chip } from '#lib/components/ui/classes.ts';
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

<h2 class="text-2xl">{exercise.prompt}</h2>
<p class="mt-6 font-display text-2xl leading-[2.2]">
	{parts[0]}<button
		type="button"
		class={[
			'mx-1.5 inline-block min-w-24 cursor-pointer px-3 py-0.5 font-sans text-lg leading-snug font-semibold disabled:cursor-default',
			!selected && 'border-b-2 border-sepia/50',
			selected && 'rounded-md border',
			selected && status === 'answering' && 'border-ink bg-vellum-deep',
			status === 'correct' && 'border-olive bg-olive-soft text-olive',
			status === 'wrong' && 'border-rubric bg-rubric-soft text-rubric'
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
