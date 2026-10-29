<script lang="ts">
	import type { Exercise } from '#lib/content/types.ts';
	import { correctAnswerText } from '#lib/lesson/check.ts';
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

	let button = $state<HTMLButtonElement>();
	$effect(() => button?.focus());
</script>

<div class="banner" class:correct class:wrong={!correct} role="status">
	<div class="inner">
		<h2>
			<span aria-hidden="true">{correct ? '✓' : '✗'}</span>
			{heading}
		</h2>
		{#if !correct}
			<div class="answer">
				<strong>Correct answer:</strong>
				<p>{correctAnswerText(exercise)}</p>
			</div>
		{/if}
		{#if exercise.explanation}
			<p class="explanation">{exercise.explanation}</p>
		{/if}
		<VerseQuote verse={exercise.verse} />
		{#if !correct}
			<p class="retry-note">You’ll get another try at the end.</p>
		{/if}
		<button
			bind:this={button}
			type="button"
			class="btn"
			class:danger={!correct}
			onclick={oncontinue}
		>
			Continue
		</button>
	</div>
</div>

<style>
	.banner {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 10;
		padding: 18px 16px calc(18px + env(safe-area-inset-bottom));
		animation: slide-up 200ms ease;
		max-height: 75dvh;
		overflow-y: auto;
	}

	.banner.correct {
		background: var(--primary-soft);
		color: var(--primary-shadow);
	}

	.banner.wrong {
		background: var(--danger-soft);
		color: var(--danger-shadow);
	}

	.inner {
		display: grid;
		gap: 12px;
		max-width: var(--content-width);
		margin: 0 auto;
	}

	h2 {
		font-size: 22px;
	}

	.answer p {
		white-space: pre-line;
		font-weight: 700;
	}

	.explanation,
	.answer {
		color: var(--text);
	}

	.retry-note {
		font-size: 14px;
		font-weight: 700;
	}

	@keyframes slide-up {
		from {
			transform: translateY(100%);
		}
	}
</style>
