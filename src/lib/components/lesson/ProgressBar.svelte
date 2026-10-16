<script lang="ts">
	let { value, label = 'Lesson progress' }: { value: number; label?: string } = $props();
	const pct = $derived(Math.round(Math.min(1, Math.max(0, value)) * 100));
</script>

<div
	class="track"
	role="progressbar"
	aria-label={label}
	aria-valuenow={pct}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<div class="fill" style:width="{pct}%"></div>
</div>

<style>
	.track {
		flex: 1;
		height: 16px;
		border-radius: 999px;
		background: var(--locked);
		overflow: hidden;
	}

	.fill {
		height: 100%;
		min-width: 16px;
		border-radius: 999px;
		background: var(--primary);
		box-shadow: inset 0 -4px 0 rgb(0 0 0 / 0.12);
		transition: width 300ms ease;
		position: relative;
	}

	.fill::after {
		content: '';
		position: absolute;
		top: 4px;
		left: 8px;
		right: 8px;
		height: 4px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.35);
	}
</style>
