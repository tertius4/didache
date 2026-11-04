<script lang="ts">
	import { resolve } from '$app/paths';
	import { afterNavigate, goto } from '$app/navigation';
	import { sections } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { mission } from '#lib/site.ts';
	import Meta from '#lib/components/Meta.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	/** Opened from inside the app (e.g. the intro): "Back" returns there, slide and all. */
	let cameFromApp = $state(false);
	afterNavigate(({ from }) => (cameFromApp = from !== null));

	const fallback = $derived(
		progress.seenIntro ? resolve('/learn/[section]', { section: sections[0].id }) : resolve('/')
	);

	function back(e: MouseEvent) {
		if (!cameFromApp) return;
		e.preventDefault();
		history.back();
	}

	function resetProgress() {
		if (!confirm('Reset all your lesson progress on this device?')) return;
		progress.reset();
		goto(resolve('/'));
	}
</script>

<Meta title="About" description={mission} path="/about" />

<main class="grid gap-6 px-5 pt-4 pb-10 [&_h2]:mb-1.5 [&_h2]:text-2xl">
	<a
		class="inline-flex items-center gap-1.5 justify-self-start text-sm text-foreground-muted no-underline hover:text-foreground"
		href={fallback}
		onclick={back}
	>
		<Icon name="arrow-left" size={14} /> Back
	</a>
	<h1 class="text-4xl">About Didache</h1>

	<section>
		<h2>What is this?</h2>
		<p>
			{mission} This is an early test version with one story, Noah and the Flood. If you enjoy it, let
			us know and join the waitlist for more.
		</p>
	</section>

	<section>
		<h2>What we believe</h2>
		<p>
			We believe the Bible is God’s Word and that it speaks for itself. We try to make what Scripture says easier to understand, and we always point you back to the verses so you can see for yourself what God says.
		</p>
	</section>

	<section>
		<h2>Feedback</h2>
		<p class="mb-3">
			We’re still testing Didache, so every comment helps: what you liked, what confused you, what
			you’d change.
		</p>
		<Button variant="ghost" href={resolve('/feedback')}>
			<Icon name="comment" size={16} /> Send feedback
		</Button>
	</section>

	<section>
		<h2>Privacy</h2>
		<p>
			During this testing phase, no account is needed and your progress is stored only on this
			device. We collect anonymous usage statistics (for example, which lessons are started and
			finished) without cookies, to learn whether the app is helpful. If you join the waitlist, we
			use your email only to tell you about new lessons. This may change as Didache grows; we’ll
			update this page when it does.
		</p>
	</section>

	<section>
		<h2>Credits</h2>
		<p class="text-sm text-foreground-muted">
			Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®),
			copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by
			permission. All rights reserved.
		</p>
		<p class="mt-2 text-sm text-foreground-muted">
			Icons by <a href="https://fontawesome.com">Font Awesome</a> (Free, CC BY 4.0).
		</p>
	</section>

	<Button variant="ghost" onclick={resetProgress}>
		<Icon name="rotate-left" size={16} /> Reset my progress
	</Button>
</main>
