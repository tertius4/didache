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
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<!-- neutral-100 (--color-background); meta tags can't read CSS variables. -->
	<meta name="theme-color" content="#EAE4DF" />
</svelte:head>

<ScrollSheet>{@render children()}</ScrollSheet>
