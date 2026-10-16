<script lang="ts">
	import type { Unit } from '#lib/content/types.ts';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import LessonNode from './LessonNode.svelte';

	let { sectionId, unit }: { sectionId: string; unit: Unit } = $props();

	const currentId = $derived(progress.currentLessonId(sectionId, unit));
	const doneCount = $derived(
		unit.lessons.filter((l) => progress.isComplete(lessonKey(sectionId, unit.id, l.id))).length
	);

	// Zig-zag offsets give the path its winding, Duolingo-like shape.
	const offsets = [0, 48, 72, 48, 0, -48, -72, -48];
</script>

<section class="unit" aria-labelledby="unit-{unit.id}">
	<header class="banner">
		<div class="text">
			<h2 id="unit-{unit.id}">{unit.title}</h2>
			<p>{unit.description}</p>
			<p class="count">{doneCount} / {unit.lessons.length} lessons</p>
		</div>
		<div class="art"><Illustration name={unit.illustration} /></div>
	</header>

	<ol class="path">
		{#each unit.lessons as lesson, i (lesson.id)}
			{@const key = lessonKey(sectionId, unit.id, lesson.id)}
			<li style:--offset="{offsets[i % offsets.length]}px">
				<LessonNode
					{lesson}
					number={i + 1}
					{sectionId}
					unitId={unit.id}
					complete={progress.isComplete(key)}
					current={lesson.id === currentId}
					unlocked={progress.isUnlocked(sectionId, unit, lesson.id)}
				/>
			</li>
		{/each}
	</ol>
</section>

<style>
	.banner {
		display: grid;
		grid-template-columns: 1fr 96px;
		gap: 12px;
		align-items: center;
		padding: 16px;
		border-radius: var(--radius-lg);
		background: var(--primary);
		color: white;
		box-shadow: 0 5px 0 var(--primary-shadow);
	}

	h2 {
		font-size: 22px;
	}

	.text p {
		font-size: 15px;
		opacity: 0.95;
	}

	.count {
		margin-top: 6px;
		font-weight: 900;
	}

	.art {
		border-radius: 14px;
		overflow: hidden;
	}

	.path {
		display: grid;
		justify-items: center;
		gap: 48px;
		margin: 48px 0 0;
		padding: 0;
		list-style: none;
	}

	.path li {
		transform: translateX(var(--offset));
	}
</style>
