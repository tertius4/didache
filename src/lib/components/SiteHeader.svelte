<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="mb-4 flex items-center justify-between">
	<a href={resolve('/learn')} class="font-display text-2xl font-semibold text-primary no-underline">
		Didache
	</a>
	<a
		href={resolve('/about')}
		class="grid size-9 place-items-center rounded-full border border-border font-display text-lg text-foreground-muted italic no-underline hover:text-foreground"
		aria-label="About Didache">i</a
	>
</header>
