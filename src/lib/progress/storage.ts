/**
 * Minimal key/value storage so progress can move to Capacitor Preferences later
 * without touching the rest of the app.
 */
export interface KeyValueStorage {
	get(key: string): string | null;
	set(key: string, value: string): void;
	remove(key: string): void;
}

export function memoryStorage(): KeyValueStorage {
	const data = new Map<string, string>();
	return {
		get: (key) => data.get(key) ?? null,
		set: (key, value) => void data.set(key, value),
		remove: (key) => void data.delete(key)
	};
}

/** localStorage, falling back to memory when it is unavailable (private mode, SSR, tests). */
export function browserStorage(): KeyValueStorage {
	try {
		const ls = globalThis.localStorage;
		const probe = '__unilogos_probe__';
		ls.setItem(probe, '1');
		ls.removeItem(probe);
		return {
			get: (key) => ls.getItem(key),
			set: (key, value) => {
				try {
					ls.setItem(key, value);
				} catch {
					// Storage full or blocked; progress just won't persist.
				}
			},
			remove: (key) => ls.removeItem(key)
		};
	} catch {
		return memoryStorage();
	}
}
