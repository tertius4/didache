<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Section } from '#lib/content/types.ts';
	import { lessonKey } from '#lib/content/index.ts';
	import { progress } from '#lib/progress/store.svelte.ts';
	import Icon from '#lib/components/ui/Icon.svelte';

	interface Props {
		section: Section;
	}

	const { section }: Props = $props();

	/** Height of one stop on the road, in px; the road is drawn on the same grid. */
	const ROW = 176;

	const stops = $derived(
		section.units.map((unit) => ({
			unit,
			done: unit.lessons.filter((l) => progress.isComplete(lessonKey(section.id, unit.id, l.id)))
				.length,
			complete: !unit.comingSoon && progress.isUnitComplete(section.id, unit)
		}))
	);
	/** "You are here": the first open unit that isn't finished. */
	const currentIndex = $derived(stops.findIndex((s) => !s.unit.comingSoon && !s.complete));
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
		class="absolute inset-0 size-full text-foreground-subtle"
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
				{#if unit.comingSoon}
					<div
						class={[
							'col-span-2 grid grid-cols-subgrid items-center',
							right && '[&>*:first-child]:order-2'
						]}
						aria-disabled="true"
					>
						<span
							class="mx-auto grid size-24 place-items-center overflow-hidden rounded-full border-2 border-dashed border-border-strong bg-surface text-foreground-subtle"
						>
							{#if unit.illustration}
								<img
									class="size-full object-cover opacity-50 grayscale"
									src={unit.illustration}
									alt=""
								/>
							{:else}
								<Icon name="lock" size={26} />
							{/if}
						</span>
						<span class={['grid gap-0.5 px-2', right ? 'text-right' : 'text-left']}>
							<span class="font-display text-xl leading-tight font-semibold text-foreground-muted">
								{unit.title}
							</span>
							<span class="line-clamp-2 text-sm text-foreground-subtle">{unit.description}</span>
							<span class="text-sm small-caps text-foreground-subtle">Coming soon</span>
						</span>
					</div>
				{:else}
					<a
						class={[
							'group col-span-2 grid grid-cols-subgrid items-center text-foreground no-underline',
							right && '[&>*:first-child]:order-2'
						]}
						href={resolve('/learn/[section]/[unit]', { section: section.id, unit: unit.id })}
						aria-current={current ? 'step' : undefined}
					>
						<!--
							A raised button: a solid "lip" underneath that presses in when tapped,
							and a badge that says what tapping does.
						-->
						<span class="relative mx-auto">
							{#if current}
								<span class="absolute inset-0 animate-pulse-ring rounded-full" aria-hidden="true"
								></span>
							{/if}
							<span
								class={[
									'relative block size-24 overflow-hidden rounded-full border-4 bg-surface transition-transform duration-150',
									'group-hover:-translate-y-0.5 group-active:translate-y-1',
									complete &&
										'border-secondary shadow-[0_6px_0_0_var(--color-secondary-700)] group-active:shadow-[0_2px_0_0_var(--color-secondary-700)]',
									current &&
										'border-primary shadow-[0_6px_0_0_var(--color-primary-700)] group-active:shadow-[0_2px_0_0_var(--color-primary-700)]',
									!complete &&
										!current &&
										'border-border-strong shadow-[0_6px_0_0_var(--color-neutral-400)] group-active:shadow-[0_2px_0_0_var(--color-neutral-400)]'
								]}
							>
								<img class="size-full object-cover" src={unit.illustration} alt="" />
							</span>
							<span
								class={[
									'absolute -right-1 bottom-0 grid size-8 place-items-center rounded-full ring-4 ring-surface transition-transform duration-150 group-hover:-translate-y-0.5 group-active:translate-y-1',
									complete ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'
								]}
							>
								{#if complete}
									<span class="sr-only">Complete</span><Icon name="check" size={14} />
								{:else}
									<Icon name="play" size={12} class="ml-0.5" />
								{/if}
							</span>
							{#if current}
								<span
									class="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-semibold whitespace-nowrap text-on-primary shadow-[0_2px_0_0_var(--color-primary-700)]"
								>
									{done === 0 ? 'Start' : 'Continue'}
								</span>
							{/if}
						</span>
						<span class={['grid gap-0.5 px-2', right ? 'text-right' : 'text-left']}>
							<span class="font-display text-xl leading-tight font-semibold group-hover:underline">
								{unit.title}
							</span>
							<span class="line-clamp-2 text-sm text-foreground-muted">{unit.description}</span>
							<span class="text-sm small-caps text-foreground-muted">
								{done} of {unit.lessons.length} lessons
							</span>
						</span>
					</a>
				{/if}
			</li>
		{/each}

		<li class="grid h-44 grid-cols-2 items-center">
			<span
				class={[
					'mx-auto grid size-24 place-items-center rounded-full border-2 border-dashed border-border-strong text-foreground-subtle',
					stops.length % 2 === 1 && 'order-2'
				]}
				aria-hidden="true"
			>
				<Icon name="star" size={26} />
			</span>
			<span class={['grid gap-0.5 px-2', stops.length % 2 === 1 ? 'text-right' : 'text-left']}>
				<span class="font-display text-xl font-semibold text-foreground-muted">
					{stops.length ? 'The road continues' : 'Coming soon'}
				</span>
				{#if section.upcoming}<span class="text-sm text-foreground-muted">{section.upcoming}</span
					>{/if}
			</span>
		</li>
	</ol>
</div>
