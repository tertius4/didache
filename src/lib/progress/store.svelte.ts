import type { Unit } from '#lib/content/types.ts';
import { lessonKey } from '#lib/content/index.ts';
import { browserStorage, type KeyValueStorage } from './storage';

const STORAGE_KEY = 'didache:progress:v1';
/** Key used before the rename from Unilogos; migrated on first load. */
const LEGACY_STORAGE_KEY = 'unilogos:progress:v1';

interface Saved {
	completed: string[];
	seenIntro: boolean;
}

export class Progress {
	completed = $state<string[]>([]);
	seenIntro = $state(false);
	/** True once saved progress has been read. Until then, progress-dependent UI should wait. */
	ready = $state(false);
	#storage: KeyValueStorage;

	/** Pass `defer` to read saved progress later with `load()` instead of straight away. */
	constructor(storage: KeyValueStorage, { defer = false } = {}) {
		this.#storage = storage;
		if (!defer) this.load();
	}

	/** Reads saved progress from storage. Safe to call more than once. */
	load(): void {
		if (this.ready) return;
		this.#load();
		this.ready = true;
	}

	isComplete(key: string): boolean {
		return this.completed.includes(key);
	}

	/**
	 * The first lesson of a unit is always open; each later lesson opens when the one before it
	 * is complete. Coming-soon lessons stay locked.
	 */
	isUnlocked(sectionId: string, unit: Unit, lessonId: string): boolean {
		const index = unit.lessons.findIndex((l) => l.id === lessonId);
		if (index < 0 || unit.lessons[index].comingSoon) return false;
		if (index === 0) return true;
		return this.isComplete(lessonKey(sectionId, unit.id, unit.lessons[index - 1].id));
	}

	/** The first open lesson in the unit that isn't complete yet, if any. */
	currentLessonId(sectionId: string, unit: Unit): string | undefined {
		return unit.lessons.find(
			(l) => !l.comingSoon && !this.isComplete(lessonKey(sectionId, unit.id, l.id))
		)?.id;
	}

	/** Every lesson is complete; never true while some are still coming soon. */
	isUnitComplete(sectionId: string, unit: Unit): boolean {
		return unit.lessons.every((l) => this.isComplete(lessonKey(sectionId, unit.id, l.id)));
	}

	markComplete(key: string): void {
		if (this.isComplete(key)) return;
		this.completed = [...this.completed, key];
		this.#save();
	}

	markIntroSeen(): void {
		this.seenIntro = true;
		this.#save();
	}

	reset(): void {
		this.completed = [];
		this.seenIntro = false;
		this.#storage.remove(STORAGE_KEY);
	}

	#load(): void {
		this.#migrateLegacy();
		const raw = this.#storage.get(STORAGE_KEY);
		if (!raw) return;
		try {
			const saved = JSON.parse(raw) as Partial<Saved>;
			this.completed = Array.isArray(saved.completed) ? saved.completed.filter(isString) : [];
			this.seenIntro = saved.seenIntro === true;
		} catch {
			// Corrupt data: start fresh.
		}
	}

	#migrateLegacy(): void {
		const legacy = this.#storage.get(LEGACY_STORAGE_KEY);
		if (legacy === null) return;
		if (this.#storage.get(STORAGE_KEY) === null) this.#storage.set(STORAGE_KEY, legacy);
		this.#storage.remove(LEGACY_STORAGE_KEY);
	}

	#save(): void {
		const saved: Saved = { completed: this.completed, seenIntro: this.seenIntro };
		this.#storage.set(STORAGE_KEY, JSON.stringify(saved));
	}
}

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

/**
 * Pages are prerendered, so the first render in the browser must match the HTML, which was
 * built with no progress. Saved progress is therefore loaded after hydration (see
 * +layout.svelte), and progress-dependent UI updates (or waits for `ready`) from there.
 */
export const progress = new Progress(browserStorage(), { defer: true });
