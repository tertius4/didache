<script lang="ts">
	import { submitForm } from '#lib/formspree.ts';
	import { track } from '#lib/analytics.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import { tile } from '#lib/components/ui/classes.ts';

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
	<p class="font-semibold text-olive" role="status">Thank you for your feedback!</p>
{:else}
	<form class="grid grid-cols-1 gap-3" {onsubmit}>
		<p class="font-display text-lg font-semibold" id="feedback-q">Did you enjoy this?</p>
		<div class="grid grid-cols-2 gap-2.5" role="group" aria-labelledby="feedback-q">
			<button
				type="button"
				class={tile({ selected: rating === 'up' }, 'px-4 py-3 text-center')}
				aria-pressed={rating === 'up'}
				onclick={() => (rating = 'up')}>👍 Yes</button
			>
			<button
				type="button"
				class={tile({ selected: rating === 'down' }, 'px-4 py-3 text-center')}
				aria-pressed={rating === 'down'}
				onclick={() => (rating = 'down')}>👎 Not really</button
			>
		</div>
		{#if rating}
			<label class="font-semibold" for="feedback-comment"
				>Anything we could do better? (optional)</label
			>
			<textarea
				id="feedback-comment"
				class="resize-y rounded-lg border border-sepia/35 bg-vellum/60 px-3.5 py-3 focus:border-ink focus:outline-none"
				rows="3"
				bind:value={comment}></textarea>
			<Button type="submit" disabled={sendState === 'sending'}>Send feedback</Button>
		{/if}
		{#if sendState === 'error'}
			<p class="font-semibold text-rubric" role="alert">Something went wrong. Please try again.</p>
		{/if}
	</form>
{/if}
