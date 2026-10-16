<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { progress } from '#lib/progress/store.svelte.ts';

	function resetProgress() {
		if (!confirm('Reset all your lesson progress on this device?')) return;
		progress.reset();
		goto(resolve('/'));
	}
</script>

<svelte:head>
	<title>About · Unilogos</title>
</svelte:head>

<main class="page about">
	<a class="back" href={resolve('/learn')}>← Back to lessons</a>
	<h1>About Unilogos</h1>

	<section>
		<h2>What is this?</h2>
		<p>
			Unilogos is a playful way to learn the Bible: short lessons that tell the story, then help it
			stick with quick exercises. This is an early demo with one story, Noah and the Flood. If you
			enjoy it, let us know and join the waitlist for more.
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
		<p class="small">
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

	<button type="button" class="btn ghost" onclick={resetProgress}>Reset my progress</button>
</main>

<style>
	.about {
		display: grid;
		gap: 20px;
		padding-bottom: 40px;
	}

	.back {
		font-weight: 800;
		text-decoration: none;
	}

	h1 {
		font-size: 28px;
	}

	h2 {
		font-size: 18px;
		margin-bottom: 6px;
	}

	.small {
		font-size: 14px;
		color: var(--muted);
	}
</style>
