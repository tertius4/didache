<script lang="ts">
	import type { LearnMore } from '#lib/content/types.ts';
	import VerseQuote from './VerseQuote.svelte';

	let { content, onclose }: { content: LearnMore | null; onclose: () => void } = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (!dialog) return;
		if (content && !dialog.open) dialog.showModal();
		else if (!content && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	{onclose}
	onclick={(e) => e.target === dialog && dialog.close()}
	aria-labelledby="learn-more-title"
>
	{#if content}
		<div class="sheet">
			<div class="grabber" aria-hidden="true"></div>
			<p class="eyebrow">Learn more</p>
			<h2 id="learn-more-title">{content.title}</h2>
			{#each content.paragraphs as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
			{#each content.verses ?? [] as verse (verse.ref)}
				<VerseQuote {verse} />
			{/each}
			{#if content.confessions?.length}
				<p class="confessions">
					<strong>Read further:</strong>
					{content.confessions.join(' · ')}
				</p>
			{/if}
			<button type="button" class="btn sky" onclick={() => dialog?.close()}>Got it</button>
		</div>
	{/if}
</dialog>

<style>
	dialog {
		width: 100%;
		max-width: var(--content-width);
		max-height: 85dvh;
		margin: auto auto 0;
		padding: 0;
		border: none;
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		background: var(--surface);
		color: var(--text);
	}

	dialog[open] {
		animation: slide-up 240ms ease;
	}

	dialog::backdrop {
		background: rgb(43 38 51 / 0.45);
	}

	.sheet {
		display: grid;
		gap: 14px;
		padding: 12px 20px calc(20px + env(safe-area-inset-bottom));
	}

	.grabber {
		justify-self: center;
		width: 44px;
		height: 5px;
		border-radius: 999px;
		background: var(--border-strong);
	}

	.eyebrow {
		font-size: 13px;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--sun-shadow);
	}

	h2 {
		font-size: 22px;
		margin-top: -8px;
	}

	.confessions {
		font-size: 14px;
		color: var(--muted);
	}

	@keyframes slide-up {
		from {
			transform: translateY(100%);
		}
	}
</style>
