// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface ImportMetaEnv {
		readonly VITE_POSTHOG_KEY?: string;
		readonly VITE_POSTHOG_HOST?: string;
		readonly VITE_FORMSPREE_ID?: string;
	}
}

export {};
