import type { Unit } from '#lib/content/types.ts';
import { lessonKey } from '#lib/content/index.ts';
import { browserStorage, type KeyValueStorage } from './storage';

const STORAGE_KEY = 'unilogos:progress:v1';

interface Saved {
	completed: string[];
	seenIntro: boolean;
}

export class Progress {
	completed = $state<string[]>([]);
	seenIntro = $state(false);
	#storage: KeyValueStorage;

	constructor(storage: KeyValueStorage) {
		this.#storage = storage;
		this.#load();
	}

	isComplete(key: string): boolean {
		return this.completed.includes(key);
	}

	/** The first lesson of a unit is always open; each later lesson opens when the one before it is complete. */
	isUnlocked(sectionId: string, unit: Unit, lessonId: string): boolean {
		const index = unit.lessons.findIndex((l) => l.id === lessonId);
		if (index < 0) return false;
		if (index === 0) return true;
		return this.isComplete(lessonKey(sectionId, unit.id, unit.lessons[index - 1].id));
	}

	/** The first lesson in the unit that isn't complete yet, if any. */
	currentLessonId(sectionId: string, unit: Unit): string | undefined {
		return unit.lessons.find((l) => !this.isComplete(lessonKey(sectionId, unit.id, l.id)))?.id;
	}

	isUnitComplete(sectionId: string, unit: Unit): boolean {
		return this.currentLessonId(sectionId, unit) === undefined;
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

	#save(): void {
		const saved: Saved = { completed: this.completed, seenIntro: this.seenIntro };
		this.#storage.set(STORAGE_KEY, JSON.stringify(saved));
	}
}

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export const progress = new Progress(browserStorage());
