<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Lesson } from '#lib/content/types.ts';

	let {
		lesson,
		number,
		sectionId,
		unitId,
		complete,
		current,
		unlocked
	}: {
		lesson: Lesson;
		number: number;
		sectionId: string;
		unitId: string;
		complete: boolean;
		current: boolean;
		unlocked: boolean;
	} = $props();

	const icon = $derived(complete ? '✓' : unlocked ? '★' : '🔒');
	const stateLabel = $derived(complete ? 'completed' : unlocked ? 'start' : 'locked');
</script>

<div class="node" class:complete class:current class:locked={!unlocked}>
	{#if current}
		<span class="bubble" aria-hidden="true">Start</span>
	{/if}
	{#if unlocked}
		<a
			href={resolve('/learn/[section]/[unit]/[lesson]', {
				section: sectionId,
				unit: unitId,
				lesson: lesson.id
			})}
			class="circle"
			aria-label="Lesson {number}: {lesson.title} ({stateLabel})"
		>
			<span aria-hidden="true">{icon}</span>
		</a>
	{:else}
		<span class="circle" role="img" aria-label="Lesson {number}: {lesson.title} (locked)">
			<span aria-hidden="true">{icon}</span>
		</span>
	{/if}
	<span class="title" aria-hidden="true">{lesson.title}</span>
	<span class="passage" aria-hidden="true">{lesson.passage}</span>
</div>

<style>
	.node {
		position: relative;
		display: grid;
		justify-items: center;
		gap: 4px;
		width: 140px;
		text-align: center;
	}

	.circle {
		display: grid;
		place-items: center;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: var(--primary);
		box-shadow: 0 6px 0 var(--primary-shadow);
		color: white;
		font-size: 30px;
		font-weight: 900;
		text-decoration: none;
		transition: transform 80ms ease;
	}

	a.circle:active {
		transform: translateY(6px);
		box-shadow: 0 0 0 var(--primary-shadow);
	}

	.complete .circle {
		background: var(--sun);
		box-shadow: 0 6px 0 var(--sun-shadow);
	}

	.current .circle {
		outline: 6px solid var(--primary-soft);
		animation: pulse 1.6s ease-in-out infinite;
	}

	.locked .circle {
		background: var(--locked);
		box-shadow: 0 6px 0 var(--locked-shadow);
		font-size: 24px;
	}

	.title {
		margin-top: 8px;
		font-weight: 900;
		font-size: 15px;
		line-height: 1.2;
	}

	.passage {
		font-size: 12px;
		font-weight: 700;
		color: var(--muted);
	}

	.locked .title {
		color: var(--muted);
	}

	.bubble {
		position: absolute;
		top: -38px;
		padding: 4px 12px;
		border: 2px solid var(--border);
		border-radius: 10px;
		background: var(--surface);
		color: var(--primary-shadow);
		font-weight: 900;
		font-size: 13px;
		text-transform: uppercase;
		animation: bob 1.6s ease-in-out infinite;
	}

	.bubble::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: -8px;
		width: 12px;
		height: 12px;
		background: var(--surface);
		border-right: 2px solid var(--border);
		border-bottom: 2px solid var(--border);
		transform: translateX(-50%) rotate(45deg);
	}

	@keyframes pulse {
		50% {
			outline-width: 10px;
		}
	}

	@keyframes bob {
		50% {
			transform: translateY(-4px);
		}
	}
</style>
