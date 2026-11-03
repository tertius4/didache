// Every page is prerendered to static HTML (with SSR), so it works on any static host,
// in the Cloudflare Worker's static assets and inside Capacitor. Browser-only state
// (progress in localStorage) loads after hydration; see progress/store.svelte.ts.
export const prerender = true;
