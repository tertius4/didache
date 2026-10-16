<script lang="ts">
	import { resolve } from '$app/paths';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import FeedbackPrompt from '#lib/components/FeedbackPrompt.svelte';
	import WaitlistForm from '#lib/components/WaitlistForm.svelte';
	import type { Lesson } from '#lib/content/types.ts';

	let {
		lesson,
		accuracy,
		total,
		unitComplete,
		unitTitle,
		context
	}: {
		lesson: Lesson;
		accuracy: number;
		total: number;
		unitComplete: boolean;
		unitTitle: string;
		context: Record<string, string>;
	} = $props();

	const pct = $derived(Math.round(accuracy * 100));
</script>

<div class="complete">
	<div class="art"><Illustration name={unitComplete ? 'rainbow' : lesson.illustration} /></div>
	<h1>{unitComplete ? 'Unit complete!' : 'Lesson complete!'}</h1>
	<p class="sub">
		{unitComplete ? `You finished “${unitTitle}”.` : `You finished “${lesson.title}”.`}
	</p>

	<div class="stats">
		<div class="stat">
			<span class="value">{pct}%</span>
			<span class="label">First-try accuracy</span>
		</div>
		<div class="stat">
			<span class="value">{total}</span>
			<span class="label">Questions</span>
		</div>
	</div>

	{#if unitComplete}
		<section class="panel">
			<FeedbackPrompt {context} />
		</section>
		<section class="panel">
			<WaitlistForm source="unit-complete" />
		</section>
	{/if}

	<a class="btn" href={resolve('/learn')}>{unitComplete ? 'Back to lessons' : 'Continue'}</a>
</div>

<style>
	.complete {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 16px;
		text-align: center;
		padding-bottom: 24px;
	}

	.art {
		width: 70%;
		margin: 8px auto 0;
		border-radius: 20px;
		overflow: hidden;
		animation: bounce 600ms ease;
	}

	h1 {
		font-size: 30px;
		color: var(--primary-shadow);
	}

	.sub {
		color: var(--muted);
		font-weight: 700;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.stat {
		display: grid;
		padding: 14px;
		border: 2px solid var(--sun);
		border-radius: var(--radius);
		background: #fff6dc;
	}

	.value {
		font-size: 28px;
		font-weight: 900;
	}

	.label {
		font-size: 13px;
		font-weight: 800;
		color: var(--muted);
		text-transform: uppercase;
	}

	.panel {
		padding: 16px;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		text-align: left;
	}

	@keyframes bounce {
		0% {
			transform: scale(0.6);
			opacity: 0;
		}
		60% {
			transform: scale(1.05);
		}
	}
</style>
