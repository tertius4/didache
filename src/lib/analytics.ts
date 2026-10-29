import type { PostHog } from 'posthog-js';

const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

let client: PostHog | undefined;
let pending: [AnalyticsEvent, Record<string, unknown>][] | undefined;

/**
 * Anonymous, cookieless analytics. Does nothing when no PostHog key is configured.
 * PostHog is loaded lazily so it never weighs down the first paint; events fired
 * before it loads are queued.
 */
export function initAnalytics(): void {
	if (pending || !key || typeof window === 'undefined') return;
	pending = [];
	import('posthog-js').then(({ default: posthog }) => {
		posthog.init(key, {
			api_host: host,
			persistence: 'memory',
			autocapture: false,
			capture_pageview: 'history_change',
			disable_session_recording: true,
			person_profiles: 'never'
		});
		client = posthog;
		for (const [event, props] of pending ?? []) posthog.capture(event, props);
		pending = [];
	});
}

export type AnalyticsEvent =
	| 'intro_completed'
	| 'lesson_started'
	| 'video_started'
	| 'video_completed'
	| 'story_opened'
	| 'story_card_viewed'
	| 'learn_more_opened'
	| 'exercise_answered'
	| 'lesson_completed'
	| 'lesson_abandoned'
	| 'unit_completed'
	| 'waitlist_joined'
	| 'feedback_submitted';

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}): void {
	if (client) client.capture(event, props);
	else if (pending) pending.push([event, props]);
	else if (import.meta.env.DEV) console.debug('[analytics]', event, props);
}
