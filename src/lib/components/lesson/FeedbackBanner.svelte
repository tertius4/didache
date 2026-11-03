<script lang="ts">
	import type { Exercise } from '#lib/content/types.ts';
	import { correctAnswerText } from '#lib/lesson/check.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import VerseQuote from './VerseQuote.svelte';

	interface Props {
		exercise: Exercise;
		correct: boolean;
		oncontinue: () => void;
	}

	const { exercise, correct, oncontinue }: Props = $props();

	const praise = ['Well done!', 'Excellent!', 'That’s right!', 'Great job!', 'Amen!'];
	const heading = $derived(
		correct ? praise[Math.floor(Math.random() * praise.length)] : 'Not quite'
	);

	let sheet = $state<HTMLDivElement>();
	// Ready for Enter/Space, without scrolling the lesson underneath.
	$effect(() => sheet?.querySelector('button')?.focus({ preventScroll: true }));
</script>

<!--
	Placed inside the lesson's ActionBar: it covers the bar and grows upward over the lesson
	without taking up space in the page. The outer box clips the slide-in at the bottom of the
	bar (so it rises out of it), and its top padding leaves room for the shadow.
-->
<div class="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden pt-6">
	<div
		bind:this={sheet}
		class={[
			'pointer-events-auto max-h-[75dvh] animate-slide-up overflow-y-auto rounded-t-2xl border-t-2 px-5 pt-5 pb-4.5 shadow-[0_-8px_24px_-12px_color-mix(in_srgb,var(--color-overlay)_40%,transparent)]',
			correct ? 'border-success bg-success-soft' : 'border-error bg-error-soft'
		]}
		role="status"
	>
		<div class="grid gap-3">
			<h2 class={['flex items-center gap-2 text-2xl', correct ? 'text-success' : 'text-error']}>
				<Icon name={correct ? 'check' : 'xmark'} size={22} />
				{heading}
			</h2>
			{#if !correct}
				<div>
					<strong class="text-sm small-caps text-foreground-muted">Correct answer</strong>
					<p class="font-semibold whitespace-pre-line">{correctAnswerText(exercise)}</p>
				</div>
			{/if}
			{#if exercise.explanation}
				<p>{exercise.explanation}</p>
			{/if}
			<VerseQuote verse={exercise.verse} />
			{#if !correct}
				<p class="text-sm text-foreground-muted">You’ll get another try at the end.</p>
			{/if}
			<Button variant={correct ? 'success' : 'primary'} onclick={oncontinue}>Continue</Button>
		</div>
	</div>
</div>
