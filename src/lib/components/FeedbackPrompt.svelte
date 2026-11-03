<script lang="ts">
	import { submitForm } from '#lib/formspree.ts';
	import { track } from '#lib/analytics.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import { tile } from '#lib/components/ui/classes.ts';
	import Icon from '#lib/components/ui/Icon.svelte';

	interface Props {
		/** Sent along with the rating, e.g. which lesson or page it came from. */
		context: Record<string, string>;
		question?: string;
	}

	const { context, question = 'Did you enjoy this?' }: Props = $props();

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
	<p class="font-semibold text-success" role="status">Thank you for your feedback!</p>
{:else}
	<form class="grid grid-cols-1 gap-3" {onsubmit}>
		<p class="font-display text-lg font-semibold" id="feedback-q">{question}</p>
		<div class="grid grid-cols-2 gap-2.5" role="group" aria-labelledby="feedback-q">
			<button
				type="button"
				class={tile(
					{ selected: rating === 'up' },
					'inline-flex items-center justify-center gap-2 px-4 py-3'
				)}
				aria-pressed={rating === 'up'}
				onclick={() => (rating = 'up')}><Icon name="thumbs-up" /> Yes</button
			>
			<button
				type="button"
				class={tile(
					{ selected: rating === 'down' },
					'inline-flex items-center justify-center gap-2 px-4 py-3'
				)}
				aria-pressed={rating === 'down'}
				onclick={() => (rating = 'down')}><Icon name="thumbs-down" /> Not really</button
			>
		</div>
		{#if rating}
			<label class="font-semibold" for="feedback-comment"
				>Anything we could do better? (optional)</label
			>
			<textarea
				id="feedback-comment"
				class="resize-y rounded-lg border border-border bg-card px-3.5 py-3 focus:border-primary focus:outline-none"
				rows="3"
				bind:value={comment}></textarea>
			<Button type="submit" disabled={sendState === 'sending'}>
				<Icon name="paper-plane" size={16} /> Send feedback
			</Button>
		{/if}
		{#if sendState === 'error'}
			<p class="font-semibold text-error" role="alert">Something went wrong. Please try again.</p>
		{/if}
	</form>
{/if}
