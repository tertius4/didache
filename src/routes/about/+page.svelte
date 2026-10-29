<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { progress } from '#lib/progress/store.svelte.ts';
	import Button from '#lib/components/ui/Button.svelte';

	function resetProgress() {
		if (!confirm('Reset all your lesson progress on this device?')) return;
		progress.reset();
		goto(resolve('/'));
	}
</script>

<svelte:head>
	<title>About · Unilogos</title>
</svelte:head>

<main class="grid gap-6 px-5 pt-4 pb-10 [&_h2]:mb-1.5 [&_h2]:text-2xl">
	<a class="text-sm text-sepia no-underline hover:text-ink" href={resolve('/learn')}
		>← Back to lessons</a
	>
	<h1 class="text-4xl">About Unilogos</h1>

	<section>
		<h2>What is this?</h2>
		<p>
			Unilogos is a story-first way to learn the Bible: short narrated lessons that tell the story,
			then help it stick with a few questions. This is an early demo with one story, Noah and the
			Flood. If you enjoy it, let us know and join the waitlist for more.
		</p>
	</section>

	<section>
		<h2>What we believe</h2>
		<p>
			Unilogos teaches from a historic Protestant, Reformed perspective. We hold that the Bible is
			the inspired and authoritative Word of God, and that salvation is by grace alone, through
			faith alone, in Christ alone, to the glory of God alone. Our teaching follows the Three Forms
			of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort) and the Westminster
			Standards.
		</p>
	</section>

	<section>
		<h2>Scripture</h2>
		<p class="text-sm text-sepia">
			Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®),
			copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by
			permission. All rights reserved.
		</p>
	</section>

	<section>
		<h2>Privacy</h2>
		<p>
			No account needed. Your progress is stored only on this device. We collect anonymous usage
			statistics (for example, which lessons are started and finished) without cookies, to learn
			whether this app is helpful. If you join the waitlist, we use your email only to tell you
			about new lessons.
		</p>
	</section>

	<Button variant="ghost" onclick={resetProgress}>Reset my progress</Button>
</main>
