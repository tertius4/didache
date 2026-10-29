<script lang="ts">
	import '@fontsource-variable/eb-garamond';
	import '@fontsource-variable/inter';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import ScrollSheet from '#lib/components/ui/ScrollSheet.svelte';
	import { initAnalytics } from '#lib/analytics.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(initAnalytics);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#eadbb8" />
</svelte:head>

<ScrollSheet>{@render children()}</ScrollSheet>
