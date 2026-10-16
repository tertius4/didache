<script lang="ts">
	import { submitForm } from '#lib/formspree.ts';
	import { track } from '#lib/analytics.ts';

	let { source }: { source: string } = $props();

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
	<p class="done" role="status">
		🎉 You’re on the list! We’ll let you know when new lessons arrive.
	</p>
{:else}
	<form {onsubmit}>
		<label for="waitlist-{source}">Want more lessons? Join the waitlist.</label>
		<div class="row">
			<input
				id="waitlist-{source}"
				type="email"
				required
				autocomplete="email"
				placeholder="you@example.com"
				bind:value={email}
			/>
			<button type="submit" class="btn sky" disabled={sendState === 'sending'}>
				{sendState === 'sending' ? '…' : 'Join'}
			</button>
		</div>
		{#if sendState === 'error'}
			<p class="error" role="alert">Something went wrong. Please try again.</p>
		{/if}
	</form>
{/if}

<style>
	form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 10px;
	}

	label {
		font-weight: 800;
	}

	.row {
		display: flex;
		gap: 10px;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 12px 14px;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		font: inherit;
		background: var(--surface);
	}

	input:focus {
		border-color: var(--sky);
		outline: none;
	}

	.row .btn {
		width: auto;
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
