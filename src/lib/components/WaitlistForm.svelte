<script lang="ts">
	import { submitForm } from '#lib/formspree.ts';
	import { track } from '#lib/analytics.ts';
	import Button from '#lib/components/ui/Button.svelte';

	interface Props {
		source: string;
	}

	const { source }: Props = $props();

	let email = $state('');
	let sendState = $state<'idle' | 'sending' | 'done' | 'error'>('idle');

	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		sendState = 'sending';
		const ok = await submitForm('waitlist', { email, source });
		sendState = ok ? 'done' : 'error';
		if (ok) track('waitlist_joined', { source });
	}
</script>

{#if sendState === 'done'}
	<p class="font-semibold text-success" role="status">
		You’re on the list! We’ll let you know when new lessons arrive.
	</p>
{:else}
	<form class="grid grid-cols-1 gap-2.5" {onsubmit}>
		<label class="font-display text-lg font-semibold" for="waitlist-{source}"
			>Want more lessons? Join the waitlist.</label
		>
		<div class="flex gap-2.5">
			<input
				class="min-w-0 flex-1 rounded-lg border border-border bg-card px-3.5 py-3 focus:border-primary focus:outline-none"
				id="waitlist-{source}"
				type="email"
				required
				autocomplete="email"
				placeholder="you@example.com"
				bind:value={email}
			/>
			<Button type="submit" class="w-auto!" disabled={sendState === 'sending'}>
				{sendState === 'sending' ? '…' : 'Join'}
			</Button>
		</div>
		{#if sendState === 'error'}
			<p class="font-semibold text-error" role="alert">Something went wrong. Please try again.</p>
		{/if}
	</form>
{/if}
