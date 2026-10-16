const formId = import.meta.env.VITE_FORMSPREE_ID;

export type FormKind = 'waitlist' | 'feedback';

/** Sends a form submission to Formspree. Without a configured form id it logs and succeeds (dev stub). */
export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<boolean> {
	if (!formId) {
		console.info('[formspree stub]', kind, data);
		return true;
	}
	try {
		const res = await fetch(`https://formspree.io/f/${formId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ kind, ...data })
		});
		return res.ok;
	} catch {
		return false;
	}
}
