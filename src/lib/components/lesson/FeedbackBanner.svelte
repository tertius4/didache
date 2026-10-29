<script lang="ts">
	import type { Exercise } from '#lib/content/types.ts';
	import { correctAnswerText } from '#lib/lesson/check.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import VerseQuote from './VerseQuote.svelte';

	let {
		exercise,
		correct,
		oncontinue
	}: { exercise: Exercise; correct: boolean; oncontinue: () => void } = $props();

	const praise = ['Well done!', 'Excellent!', 'That’s right!', 'Great job!', 'Amen!'];
	const heading = $derived(
		correct ? praise[Math.floor(Math.random() * praise.length)] : 'Not quite'
	);

	let sheet = $state<HTMLDivElement>();
	$effect(() => sheet?.querySelector('button')?.focus());
</script>

<div
	bind:this={sheet}
	class={[
		'fixed bottom-0 left-1/2 z-10 max-h-[75dvh] w-full max-w-content -translate-x-1/2 animate-slide-up overflow-y-auto rounded-t-2xl border-t-2 px-5 pt-5 pb-[calc(18px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(46_33_23/0.4)]',
		correct ? 'border-olive bg-olive-soft' : 'border-rubric bg-rubric-soft'
	]}
	role="status"
>
	<div class="grid gap-3">
		<h2 class={['text-2xl', correct ? 'text-olive' : 'text-rubric']}>
			<span aria-hidden="true">{correct ? '✓' : '✗'}</span>
			{heading}
		</h2>
		{#if !correct}
			<div>
				<strong class="text-sm small-caps text-sepia">Correct answer</strong>
				<p class="font-semibold whitespace-pre-line">{correctAnswerText(exercise)}</p>
			</div>
		{/if}
		{#if exercise.explanation}
			<p>{exercise.explanation}</p>
		{/if}
		<VerseQuote verse={exercise.verse} />
		{#if !correct}
			<p class="text-sm text-sepia">You’ll get another try at the end.</p>
		{/if}
		<Button variant={correct ? 'success' : 'primary'} onclick={oncontinue}>Continue</Button>
	</div>
</div>
