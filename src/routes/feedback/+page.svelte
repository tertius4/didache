<script lang="ts">
	import { resolve } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { sections } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import Meta from '#lib/components/Meta.svelte';
	import FeedbackPrompt from '#lib/components/FeedbackPrompt.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	/** The page the feedback button was tapped on, so comments have context. */
	let fromPath = $state('');
	let cameFromApp = $state(false);
	afterNavigate(({ from }) => {
		cameFromApp = from !== null;
		fromPath = from?.url.pathname ?? '';
	});

	/** Opened straight from a link: back to the intro if it hasn't been seen yet. */
	const fallback = $derived(
		progress.seenIntro ? resolve('/learn/[section]', { section: sections[0].id }) : resolve('/')
	);

	function back(e: MouseEvent) {
		if (!cameFromApp) return;
		e.preventDefault();
		history.back();
	}
</script>

<Meta
	title="Feedback"
	description="Didache is still being tested. Tell us what you think."
	path="/feedback"
/>

<main class="grid gap-6 px-5 pt-4 pb-10">
	<a
		class="inline-flex items-center gap-1.5 justify-self-start text-sm text-foreground-muted no-underline hover:text-foreground"
		href={fallback}
		onclick={back}
	>
		<Icon name="arrow-left" size={14} /> Back
	</a>

	<header class="grid gap-2">
		<h1 class="text-4xl">Help us test Didache</h1>
		<p class="text-foreground-muted">
			We’re still testing, and we read every comment. Tell us what you liked, what confused you, or
			what you’d change.
		</p>
	</header>

	<section class="rounded-lg border border-border bg-surface-sunken p-5">
		<FeedbackPrompt
			question="How is Didache working for you?"
			context={{ source: 'feedback-page', from: fromPath }}
		/>
	</section>
</main>
