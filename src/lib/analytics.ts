import type { PostHog } from 'posthog-js';

const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

let client: PostHog | undefined;
let pending: [AnalyticsEvent, Record<string, unknown>][] | undefined;
let pendingExceptions: Error[] = [];

export function initAnalytics(): void {
	if (typeof window === 'undefined' || pending) return;
	if (!key || !host) {
		if (import.meta.env.DEV) {
			const variable = !key ? 'VITE_POSTHOG_KEY' : 'VITE_POSTHOG_HOST';
			throw new Error(
				`${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`
			);
		}
		return;
	}

	pending = [];
	import('posthog-js').then(({ default: posthog }) => {
		posthog.init(key, {
			api_host: host,
			capture_pageview: 'history_change',
			logs: {
				serviceName: 'didache-web',
				environment: import.meta.env.MODE
			},
			capture_exceptions: {
				capture_unhandled_errors: true,
				capture_unhandled_rejections: true,
				capture_console_errors: false
			}
		});
		client = posthog;
		logPostHog('info', 'analytics client initialized', { runtime: 'browser' });
		for (const [event, props] of pending ?? []) posthog.capture(event, props);
		for (const error of pendingExceptions) posthog.captureException(error);
		pending = [];
		pendingExceptions = [];
	});
}

export type AnalyticsEvent =
	| 'intro_completed'
	| 'lesson_started'
	| 'video_started'
	| 'video_completed'
	| 'story_opened'
	| 'story_card_viewed'
	| 'exercise_answered'
	| 'lesson_completed'
	| 'lesson_abandoned'
	| 'unit_completed'
	| 'waitlist_joined'
	| 'feedback_submitted'
	| 'page_shared';

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}): void {
	if (client) client.capture(event, props);
	else if (pending) pending.push([event, props]);
	else if (import.meta.env.DEV) console.debug('[analytics]', event, props);
}

type PostHogLogLevel = 'info' | 'warn';

/** Sends only purpose-written, structured application logs to the PostHog log exporter. */
export function logPostHog(
	level: PostHogLogLevel,
	message: string,
	attributes: Record<string, string | number | boolean>
): void {
	if (client) client.logger[level](message, attributes);
}

export function captureException(error: unknown): void {
	const exception = error instanceof Error ? error : new Error(String(error));
	if (client) client.captureException(exception);
	else if (pending) pendingExceptions.push(exception);
}
