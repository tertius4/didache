<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import type { Lesson } from '#lib/content/types.ts';
	import Illustration from '#lib/components/illustrations/Illustration.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	interface Props {
		lesson: Lesson;
		/** Section and unit ids, for the close link back to the unit page. */
		section: string;
		unit: string;
		onplay: () => void;
		onended: () => void;
		onread: () => void;
		onpractice: () => void;
	}

	const { lesson, section, unit, onplay, onended, onread, onpractice }: Props = $props();

	let paused = $state(true);
	let ended = $state(false);
	let muted = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	/** Icon that briefly flashes in the centre after a tap, like a shorts player. */
	let flash = $state<'play' | 'pause' | null>(null);
	let flashTimer: ReturnType<typeof setTimeout> | undefined;
	let started = false;

	const progressPct = $derived(duration ? (currentTime / duration) * 100 : 0);

	function toggle() {
		if (ended) currentTime = 0;
		paused = !paused;
		flash = paused ? 'pause' : 'play';
		clearTimeout(flashTimer);
		flashTimer = setTimeout(() => (flash = null), 500);
	}

	function handlePlay() {
		if (started) return;
		started = true;
		onplay();
	}

	/** Space or K toggles playback, unless a control has focus (it handles its own keys). */
	function onkeydown(e: KeyboardEvent) {
		if (!lesson.video || (e.key !== ' ' && e.key !== 'k')) return;
		if (e.target instanceof HTMLElement && e.target.closest('button, a, input, textarea')) return;
		e.preventDefault();
		toggle();
	}
</script>

<svelte:window {onkeydown} />

<!--
	Full screen, over the scroll sheet, like a shorts player: the picture fills everything
	above a slim control bar. The bar doesn't overlap the video, so narration captions
	burned into the bottom of the picture stay readable.
-->
<div class="fixed inset-0 z-20 animate-pop-in overflow-hidden bg-overlay text-on-overlay">
	{#if lesson.video?.poster}
		<!-- Wider screens: fills the space either side of the 9:16 column. -->
		<img
			class="absolute inset-0 size-full scale-110 object-cover opacity-40 blur-2xl"
			src={lesson.video.poster}
			alt=""
		/>
	{/if}
	<!--
		Phones (any portrait screen): full width, the video covers the space edge to edge.
		Wider screens: a centred 9:16 column, so the picture isn't cropped to a thin strip.
	-->
	<div
		class="relative mx-auto flex h-full w-full flex-col [@media(min-aspect-ratio:3/4)]:max-w-[calc(100dvh*9/16)]"
	>
		<div class="relative min-h-0 flex-1">
			{#if lesson.video}
				<!--
					On screens shorter than 9:16 the frame is trimmed from the top (mostly sky, under
					the title bar), never the bottom, where the captions and poster title sit.
					Captions are optional in the content data; add a .vtt per video when available.
				-->
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					class="absolute inset-0 size-full object-cover object-bottom"
					src={lesson.video.src}
					poster={lesson.video.poster}
					playsinline
					preload="metadata"
					bind:paused
					bind:ended
					bind:muted
					bind:currentTime
					bind:duration
					onplay={handlePlay}
					{onended}
				>
					{#if lesson.video.captions}
						<track
							kind="captions"
							src={lesson.video.captions}
							srclang="en"
							label="English"
							default
						/>
					{/if}
				</video>

				<!-- The whole picture is the play/pause button. -->
				<button
					type="button"
					class="absolute inset-0 grid cursor-pointer place-items-center"
					aria-label={paused ? 'Play video' : 'Pause video'}
					onclick={toggle}
				>
					{#if paused && !flash}
						<span
							class="grid size-20 place-items-center rounded-full bg-overlay/45 backdrop-blur-sm"
							transition:fade={{ duration: 150 }}
						>
							<Icon name={ended ? 'rotate-left' : 'play'} size={34} class={ended ? '' : 'ml-1'} />
						</span>
					{:else if flash}
						<span
							class="grid size-20 place-items-center rounded-full bg-overlay/45"
							out:fade={{ duration: 350 }}
						>
							<Icon name={flash} size={30} class={flash === 'play' ? 'ml-1' : ''} />
						</span>
					{/if}
				</button>
			{:else}
				<div
					class="flex size-full flex-col items-center justify-center gap-6 bg-surface-sunken paper-grain p-6 pt-20 text-center text-foreground"
				>
					<div class="w-4/5 max-w-sm overflow-hidden rounded-lg opacity-80 sepia-[.35]">
						<Illustration name={lesson.illustration} />
					</div>
					<p class="text-sm font-semibold tracking-widest text-foreground-muted uppercase">
						Video coming soon
					</p>
				</div>
			{/if}

			<!-- Top: close, what this is, and sound. Fades into the picture. -->
			<div
				class="pointer-events-none absolute inset-x-0 top-0 flex items-start gap-1 bg-linear-to-b from-overlay/75 to-transparent px-2 pt-[calc(8px+env(safe-area-inset-top))] pb-10"
			>
				<a
					class="pointer-events-auto grid size-11 flex-none place-items-center rounded-full text-on-overlay no-underline hover:bg-on-overlay/10"
					href={resolve('/learn/[section]/[unit]', { section, unit })}
					aria-label="Close lesson"
				>
					<Icon name="xmark" size={24} />
				</a>
				<div class="min-w-0 flex-1 pt-1">
					<p class="text-sm small-caps tracking-wide text-on-overlay/80">{lesson.passage}</p>
					<h1 class="truncate font-display text-2xl leading-tight font-semibold">
						{lesson.title}
					</h1>
				</div>
				{#if lesson.video}
					<button
						type="button"
						class="pointer-events-auto grid size-11 flex-none cursor-pointer place-items-center rounded-full hover:bg-on-overlay/10"
						aria-label={muted ? 'Turn sound on' : 'Mute'}
						aria-pressed={muted}
						onclick={() => (muted = !muted)}
					>
						<Icon name={muted ? 'volume-xmark' : 'volume-high'} size={22} />
					</button>
				{/if}
			</div>
		</div>

		<!-- Bottom bar: where you are in the video, and what to do next. -->
		<div class="grid gap-2 bg-overlay px-4 pt-1 pb-[calc(12px+env(safe-area-inset-bottom))]">
			{#if lesson.video}
				<input
					class="scrubber"
					type="range"
					min="0"
					max={duration || 0}
					step="0.1"
					bind:value={currentTime}
					style:--pct="{progressPct}%"
					aria-label="Video position"
				/>
			{/if}
			<div class="grid grid-cols-2 gap-3">
				<Button variant="overlay" class="px-3! whitespace-nowrap" onclick={onread}>
					<Icon name="book-open" size={18} /> Read story
				</Button>
				<Button class="px-3! whitespace-nowrap" onclick={onpractice}
					><Icon name="pencil" size={16} /> Start practice</Button
				>
			</div>
		</div>
	</div>
</div>

<style>
	/* A thin bar that thickens under the finger; the filled part shows how far along you are. */
	.scrubber {
		appearance: none;
		width: 100%;
		height: 1.25rem;
		background: transparent;
		cursor: pointer;
	}
	.scrubber::-webkit-slider-runnable-track {
		height: 4px;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--color-on-overlay) var(--pct),
			color-mix(in srgb, var(--color-on-overlay) 30%, transparent) var(--pct)
		);
	}
	.scrubber::-moz-range-track {
		height: 4px;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--color-on-overlay) var(--pct),
			color-mix(in srgb, var(--color-on-overlay) 30%, transparent) var(--pct)
		);
	}
	.scrubber::-webkit-slider-thumb {
		appearance: none;
		margin-top: -5px;
		width: 14px;
		height: 14px;
		border-radius: 999px;
		background: var(--color-on-overlay);
	}
	.scrubber::-moz-range-thumb {
		width: 14px;
		height: 14px;
		border: 0;
		border-radius: 999px;
		background: var(--color-on-overlay);
	}
</style>
