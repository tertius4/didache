<script lang="ts">
	import type { LearnMore } from '#lib/content/types.ts';
	import Button from '#lib/components/ui/Button.svelte';
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
	class="mx-auto mt-auto mb-0 max-h-[85dvh] w-full max-w-content rounded-t-2xl bg-vellum paper-grain text-ink backdrop:bg-ink/45 open:animate-slide-up"
	{onclose}
	onclick={(e) => e.target === dialog && dialog.close()}
	aria-labelledby="learn-more-title"
>
	{#if content}
		<div class="grid gap-3.5 px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]">
			<div class="h-1 w-11 justify-self-center rounded-full bg-sepia/30" aria-hidden="true"></div>
			<p class="text-sm small-caps text-gold">Learn more</p>
			<h2 id="learn-more-title" class="-mt-2 text-3xl">{content.title}</h2>
			{#each content.paragraphs as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
			{#each content.verses ?? [] as verse (verse.ref)}
				<VerseQuote {verse} />
			{/each}
			{#if content.confessions?.length}
				<p class="text-sm text-sepia">
					<strong>Read further:</strong>
					{content.confessions.join(' · ')}
				</p>
			{/if}
			<Button onclick={() => dialog?.close()}>Got it</Button>
		</div>
	{/if}
</dialog>
