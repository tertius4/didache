<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Unit } from '#lib/content/types.ts';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import { track } from '#lib/analytics.ts';

	interface Props {
		sectionId: string;
		unit: Unit;
	}

	const { sectionId, unit }: Props = $props();

	const currentId = $derived(progress.currentLessonId(sectionId, unit));
</script>

<ol class="divide-y divide-border border-y border-border">
	{#each unit.lessons as lesson, i (lesson.id)}
		{@const complete = progress.isComplete(lessonKey(sectionId, unit.id, lesson.id))}
		{@const current = lesson.id === currentId}
		{@const unlocked = progress.isUnlocked(sectionId, unit, lesson.id)}
		<li>
			<svelte:element
				this={unlocked ? 'a' : 'div'}
				class={[
					'flex items-center gap-4 py-4 text-foreground no-underline',
					unlocked ? 'group' : 'opacity-55',
					current && '-mx-3 rounded-lg bg-surface-sunken px-3'
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
				role={unlocked ? 'link' : undefined}
				onclick={() => {
					if (unlocked) {
						track('lesson_started', { section: sectionId, unit: unit.id, lesson: lesson.id });
					}
				}}
			>
				<span
					class={[
						'grid size-10 flex-none place-items-center rounded-full border font-display text-lg',
						complete && 'border-secondary bg-secondary text-on-secondary',
						current && 'border-primary bg-primary text-on-primary',
						!complete && !current && 'border-border-strong text-foreground-muted'
					]}
				>
					{#if complete}<span aria-label="Complete">✓</span>
					{:else if current}<span aria-label="Up next">▶</span>
					{:else if !unlocked}<span aria-label="Locked">🔒︎</span>
					{:else}{i + 1}{/if}
				</span>
				<span class="grid min-w-0 flex-1">
					<span class="truncate font-display text-xl leading-snug group-hover:underline">
						<span class="text-foreground-muted">{i + 1}.</span>
						{lesson.title}
					</span>
					<span class="text-sm small-caps text-foreground-muted">{lesson.passage}</span>
				</span>
				{#if lesson.video?.duration}
					<span class="text-sm text-foreground-muted tabular-nums">{lesson.video.duration}</span>
				{/if}
			</svelte:element>
		</li>
	{/each}
</ol>
