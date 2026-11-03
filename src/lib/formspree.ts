import { logPostHog } from '#lib/analytics.ts';

const formId = import.meta.env.VITE_FORMSPREE_ID;

export type FormKind = 'waitlist' | 'feedback';

/**
 * Sends a form submission to Formspree and resolves to whether it was accepted.
 * In `npm run dev` without a form id it logs and succeeds (a stub). A production build
 * without one fails instead, so a misconfigured build can't pretend people signed up.
 */
export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<boolean> {
	if (!formId) {
		if (import.meta.env.DEV) {
			console.info('[formspree stub]', kind, data);
			logPostHog('info', 'form submission accepted by development stub', {
				submission_kind: kind,
				delivery: 'development_stub'
			});
			return true;
		}
		console.error('VITE_FORMSPREE_ID was not set when this build was made; form not sent.');
		logPostHog('warn', 'form submission failed: no Formspree form id in build', {
			submission_kind: kind,
			delivery: 'formspree',
			failure_kind: 'missing_form_id'
		});
		return false;
	}
	try {
		const res = await fetch(`https://formspree.io/f/${formId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ kind, ...data })
		});
		// Formspree explains rejections (unconfirmed form, reCAPTCHA, domain not allowed…).
		const error = res.ok ? undefined : await formspreeError(res);
		if (error) console.error('Formspree rejected the submission:', res.status, error);
		logPostHog(res.ok ? 'info' : 'warn', 'form submission delivery completed', {
			submission_kind: kind,
			delivery: 'formspree',
			http_status: res.status,
			success: res.ok,
			...(error && { error })
		});
		return res.ok;
	} catch {
		logPostHog('warn', 'form submission delivery failed', {
			submission_kind: kind,
			delivery: 'formspree',
			failure_kind: 'network_error'
		});
		return false;
	}
}

/** Formspree's error body: `{ error?: string, errors?: { message: string }[] }`. */
async function formspreeError(res: Response): Promise<string> {
	try {
		const body = (await res.json()) as { error?: string; errors?: { message?: string }[] };
		return body.errors?.map((e) => e.message).join('; ') || body.error || res.statusText;
	} catch {
		return res.statusText;
	}
}
