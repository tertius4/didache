import { logPostHog } from '#lib/analytics.ts';

const formId = import.meta.env.VITE_FORMSPREE_ID;

export type FormKind = 'waitlist' | 'feedback';

/** Sends a form submission to Formspree. Without a configured form id it logs and succeeds (dev stub). */
export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<boolean> {
	if (!formId) {
		console.info('[formspree stub]', kind, data);
		logPostHog('info', 'form submission accepted by development stub', {
			submission_kind: kind,
			delivery: 'development_stub'
		});
		return true;
	}
	try {
		const res = await fetch(`https://formspree.io/f/${formId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ kind, ...data })
		});
		logPostHog(res.ok ? 'info' : 'warn', 'form submission delivery completed', {
			submission_kind: kind,
			delivery: 'formspree',
			http_status: res.status,
			success: res.ok
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
