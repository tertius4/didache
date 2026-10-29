<script lang="ts">
	let { value, label = 'Lesson progress' }: { value: number; label?: string } = $props();
	const pct = $derived(Math.round(Math.min(1, Math.max(0, value)) * 100));
</script>

<div
	class="h-2 flex-1 overflow-hidden rounded-full bg-sepia/15"
	role="progressbar"
	aria-label={label}
	aria-valuenow={pct}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<div
		class="h-full min-w-2 rounded-full bg-rubric transition-[width] duration-300"
		style:width="{pct}%"
	></div>
</div>
