<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Unit } from '#lib/content/types.ts';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';

	let { sectionId, unit }: { sectionId: string; unit: Unit } = $props();

	const currentId = $derived(progress.currentLessonId(sectionId, unit));
</script>

<ol class="divide-y divide-sepia/20 border-y border-sepia/20">
	{#each unit.lessons as lesson, i (lesson.id)}
		{@const complete = progress.isComplete(lessonKey(sectionId, unit.id, lesson.id))}
		{@const current = lesson.id === currentId}
		{@const unlocked = progress.isUnlocked(sectionId, unit, lesson.id)}
		<li>
			<svelte:element
				this={unlocked ? 'a' : 'div'}
				class={[
					'flex items-center gap-4 py-4 text-ink no-underline',
					unlocked ? 'group' : 'opacity-55',
					current && '-mx-3 rounded-lg bg-vellum-deep/50 px-3'
				]}
				href={unlocked
					? resolve('/learn/[section]/[unit]/[lesson]', {
							section: sectionId,
							unit: unit.id,
							lesson: lesson.id
						})
					: undefined}
				aria-current={current ? 'step' : undefined}
				aria-disabled={unlocked ? undefined : 'true'}
			>
				<span
					class={[
						'grid size-10 flex-none place-items-center rounded-full border font-display text-lg',
						complete && 'border-gold bg-gold text-vellum',
						current && 'border-rubric bg-rubric text-vellum',
						!complete && !current && 'border-sepia/40 text-sepia'
					]}
				>
					{#if complete}<span aria-label="Complete">✓</span>
					{:else if current}<span aria-label="Up next">▶</span>
					{:else if !unlocked}<span aria-label="Locked">🔒︎</span>
					{:else}{i + 1}{/if}
				</span>
				<span class="grid min-w-0 flex-1">
					<span class="truncate font-display text-xl leading-snug group-hover:underline">
						<span class="text-sepia">{i + 1}.</span>
						{lesson.title}
					</span>
					<span class="text-sm small-caps text-sepia">{lesson.passage}</span>
				</span>
				{#if lesson.video?.duration}
					<span class="text-sm text-sepia tabular-nums">{lesson.video.duration}</span>
				{/if}
			</svelte:element>
		</li>
	{/each}
</ol>
