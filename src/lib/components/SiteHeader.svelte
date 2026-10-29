<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="mb-4 flex items-center justify-between">
	<a href={resolve('/learn')} class="font-display text-2xl font-semibold text-rubric no-underline">
		Unilogos
	</a>
	<a
		href={resolve('/about')}
		class="grid size-9 place-items-center rounded-full border border-sepia/30 font-display text-lg text-sepia italic no-underline hover:text-ink"
		aria-label="About Unilogos">i</a
	>
</header>
