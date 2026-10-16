<script lang="ts">
	import { submitForm } from '#lib/formspree.ts';
	import { track } from '#lib/analytics.ts';

	let { context }: { context: Record<string, string> } = $props();

	let rating = $state<'up' | 'down' | null>(null);
	let comment = $state('');
	let sendState = $state<'idle' | 'sending' | 'done' | 'error'>('idle');

	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!rating) return;
		sendState = 'sending';
		const ok = await submitForm('feedback', { rating, comment, ...context });
		sendState = ok ? 'done' : 'error';
		if (ok)
			track('feedback_submitted', { rating, has_comment: comment.trim().length > 0, ...context });
	}
</script>

{#if sendState === 'done'}
	<p class="done" role="status">Thank you for your feedback! 🙏</p>
{:else}
	<form {onsubmit}>
		<p class="question" id="feedback-q">Did you enjoy this?</p>
		<div class="thumbs" role="group" aria-labelledby="feedback-q">
			<button
				type="button"
				class="tile"
				class:selected={rating === 'up'}
				aria-pressed={rating === 'up'}
				onclick={() => (rating = 'up')}>👍 Yes</button
			>
			<button
				type="button"
				class="tile"
				class:selected={rating === 'down'}
				aria-pressed={rating === 'down'}
				onclick={() => (rating = 'down')}>👎 Not really</button
			>
		</div>
		{#if rating}
			<label for="feedback-comment">Anything we could do better? (optional)</label>
			<textarea id="feedback-comment" rows="3" bind:value={comment}></textarea>
			<button type="submit" class="btn" disabled={sendState === 'sending'}>Send feedback</button>
		{/if}
		{#if sendState === 'error'}
			<p class="error" role="alert">Something went wrong. Please try again.</p>
		{/if}
	</form>
{/if}

<style>
	form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 12px;
	}

	.question,
	label {
		font-weight: 800;
	}

	.thumbs {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
	}

	.thumbs .tile {
		text-align: center;
	}

	textarea {
		padding: 12px 14px;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		font: inherit;
		resize: vertical;
	}

	textarea:focus {
		border-color: var(--sky);
		outline: none;
	}

	.done {
		font-weight: 800;
		color: var(--primary-shadow);
	}

	.error {
		color: var(--danger-shadow);
		font-weight: 700;
	}
</style>
