<script lang="ts">
	import { track } from '#lib/analytics.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { iconLink } from '#lib/components/ui/classes.ts';

	interface Props {
		/** Title for the native share sheet. */
		title: string;
		/** Short text shared with the link. */
		text: string;
		/** Sent along with the analytics event, e.g. which section was shared. */
		context: Record<string, string>;
	}

	const { title, text, context }: Props = $props();

	let copied = $state(false);
	let copiedTimer: ReturnType<typeof setTimeout> | undefined;

	async function shareNatively(url: string): Promise<'shared' | 'cancelled' | 'failed'> {
		try {
			await navigator.share({ title, text, url });
			return 'shared';
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
			return 'failed';
		}
	}

	async function copyLink(url: string) {
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			return;
		}
		track('page_shared', { method: 'clipboard', ...context });
		copied = true;
		clearTimeout(copiedTimer);
		copiedTimer = setTimeout(() => (copied = false), 2000);
	}

	async function onclick() {
		const url = "https://didache.co.za";
		if (typeof navigator.share === 'function') {
			const result = await shareNatively(url);
			if (result === 'shared') track('page_shared', { method: 'native', ...context });
			if (result !== 'failed') return;
		}
		await copyLink(url);
	}
</script>

<button type="button" class={[iconLink, 'cursor-pointer']} aria-label="Share this page" {onclick}>
	<Icon name={copied ? 'check' : 'share-nodes'} size={18} />
</button>
<span class="sr-only" role="status">{copied ? 'Link copied' : ''}</span>
