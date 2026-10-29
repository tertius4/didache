<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Section } from '#lib/content/types.ts';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';

	let { section }: { section: Section } = $props();

	/** Height of one stop on the road, in px; the road is drawn on the same grid. */
	const ROW = 176;

	const stops = $derived(
		section.units.map((unit) => ({
			unit,
			done: unit.lessons.filter((l) => progress.isComplete(lessonKey(section.id, unit.id, l.id)))
				.length,
			complete: progress.isUnitComplete(section.id, unit)
		}))
	);
	/** "You are here": the first unit that isn't finished. */
	const currentIndex = $derived(stops.findIndex((s) => !s.complete));
	const count = $derived(stops.length + 1); // + the "coming soon" stop

	/** Medallions alternate between 25% and 75% of the width; the road winds between them. */
	const x = (i: number) => (i % 2 === 0 ? 25 : 75);
	const y = (i: number) => i * ROW + ROW / 2;
	const road = $derived(
		Array.from({ length: count }, (_, i) => i)
			.map((i) =>
				i === 0
					? `M ${x(0)} ${y(0)}`
					: `C ${x(i - 1)} ${y(i - 1) + ROW / 2}, ${x(i)} ${y(i) - ROW / 2}, ${x(i)} ${y(i)}`
			)
			.join(' ')
	);
</script>

<div class="relative" style:height="{count * ROW}px">
	<svg
		class="absolute inset-0 size-full text-sepia/60"
		viewBox="0 0 100 {count * ROW}"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path
			d={road}
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-dasharray="2 7"
			stroke-linecap="round"
			vector-effect="non-scaling-stroke"
		/>
	</svg>

	<ol class="relative">
		{#each stops as { unit, done, complete }, i (unit.id)}
			{@const current = i === currentIndex}
			{@const right = i % 2 === 1}
			<li class="grid h-44 grid-cols-2 items-center">
				<a
					class={[
						'group col-span-2 grid grid-cols-subgrid items-center text-ink no-underline',
						right && '[&>*:first-child]:order-2'
					]}
					href={resolve('/learn/[section]/[unit]', { section: section.id, unit: unit.id })}
					aria-current={current ? 'step' : undefined}
				>
					<span class="relative mx-auto">
						{#if current}
							<span
								class="absolute -top-7 left-1/2 -translate-x-1/2 rounded-sm bg-rubric px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-vellum"
								>You are here</span
							>
						{/if}
						<span
							class={[
								'block size-24 overflow-hidden rounded-full border-2 bg-vellum transition-transform group-hover:scale-105',
								complete && 'border-gold ring-4 ring-gold/25',
								current && 'border-rubric ring-4 ring-rubric/20',
								!complete && !current && 'border-sepia/40 opacity-75 sepia-[.4]'
							]}
						>
							<span class="block h-full w-[150%] -translate-x-1/6">
								<Illustration name={unit.illustration} />
							</span>
						</span>
						{#if complete}
							<span
								class="absolute right-0 bottom-0 grid size-7 place-items-center rounded-full bg-gold text-sm text-vellum"
								aria-label="Complete">✓</span
							>
						{/if}
					</span>
					<span class={['grid gap-0.5 px-2', right ? 'text-right' : 'text-left']}>
						<span class="font-display text-xl leading-tight font-semibold group-hover:underline">
							{unit.title}
						</span>
						<span class="line-clamp-2 text-sm text-sepia">{unit.description}</span>
						<span class="text-sm small-caps text-sepia">
							{done} of {unit.lessons.length} lessons
						</span>
					</span>
				</a>
			</li>
		{/each}

		<li class="grid h-44 grid-cols-2 items-center">
			<span
				class={[
					'mx-auto grid size-24 place-items-center rounded-full border-2 border-dashed border-sepia/40 font-display text-3xl text-sepia/70',
					stops.length % 2 === 1 && 'order-2'
				]}
				aria-hidden="true">✦</span
			>
			<span class={['grid gap-0.5 px-2', stops.length % 2 === 1 ? 'text-right' : 'text-left']}>
				<span class="font-display text-xl font-semibold text-sepia">
					{stops.length ? 'The road continues' : 'Coming soon'}
				</span>
				{#if section.upcoming}<span class="text-sm text-sepia">{section.upcoming}</span>{/if}
			</span>
		</li>
	</ol>
</div>
