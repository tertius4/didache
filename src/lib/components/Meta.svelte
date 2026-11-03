<script lang="ts">
	interface Props {
		/** Page title without the site name; omit on the home page. */
		title?: string;
		description: string;
		/** Share image: a path under `static/`, e.g. `/media/…/icon.webp`. */
		image?: string;
		/** The page's own path, e.g. `/learn/bible-stories`, for canonical and og:url. */
		path: string;
		type?: 'website' | 'article';
		/** Images the page shows straight away; preloaded so they appear with the page. */
		preload?: string[];
	}

	const {
		title,
		description,
		image = '/media/about/about-story-alive.webp',
		path,
		type = 'website',
		preload = []
	}: Props = $props();

	/** Share URLs must be absolute; fall back to the production origin. */
	const origin = import.meta.env.VITE_SITE_URL || 'https://didache.co.za';

	const fullTitle = $derived(title ? `${title} · Didache` : 'Didache: get to know your Bible');
	const url = $derived(new URL(path, origin).href);
	const imageUrl = $derived(new URL(image, origin).href);
</script>

<!-- Pages are prerendered with SSR, so these tags are in the HTML that link previews read. -->
<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:site_name" content="Didache" />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{#each preload as src (src)}
		<link rel="preload" as="image" href={src} />
	{/each}
</svelte:head>
