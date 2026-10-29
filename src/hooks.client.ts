import type { HandleClientError } from '@sveltejs/kit/hooks';
import { captureException, initAnalytics } from '#lib/analytics.ts';

export const handleError: HandleClientError = ({ error }) => {
	initAnalytics();
	captureException(error);
};
