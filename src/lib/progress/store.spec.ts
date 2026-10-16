import { describe, expect, it } from 'vitest';
import { lessonKey } from '#lib/content/index.ts';
import { noah } from '#lib/content/bible-stories/noah/unit.ts';
import { memoryStorage } from './storage';
import { Progress } from './store.svelte.ts';

const section = 'bible-stories';
const [l1, l2, l3] = noah.lessons;

describe('Progress', () => {
	it('unlocks lessons sequentially', () => {
		const p = new Progress(memoryStorage());
		expect(p.isUnlocked(section, noah, l1.id)).toBe(true);
		expect(p.isUnlocked(section, noah, l2.id)).toBe(false);

		p.markComplete(lessonKey(section, noah.id, l1.id));
		expect(p.isUnlocked(section, noah, l2.id)).toBe(true);
		expect(p.isUnlocked(section, noah, l3.id)).toBe(false);
		expect(p.currentLessonId(section, noah)).toBe(l2.id);
	});

	it('persists across instances (reload)', () => {
		const storage = memoryStorage();
		const a = new Progress(storage);
		a.markComplete(lessonKey(section, noah.id, l1.id));
		a.markIntroSeen();

		const b = new Progress(storage);
		expect(b.isUnlocked(section, noah, l2.id)).toBe(true);
		expect(b.seenIntro).toBe(true);
	});

	it('reports unit completion', () => {
		const p = new Progress(memoryStorage());
		for (const l of noah.lessons) p.markComplete(lessonKey(section, noah.id, l.id));
		expect(p.isUnitComplete(section, noah)).toBe(true);
		expect(p.currentLessonId(section, noah)).toBeUndefined();
	});

	it('ignores corrupt saved data', () => {
		const storage = memoryStorage();
		storage.set('unilogos:progress:v1', '{not json');
		const p = new Progress(storage);
		expect(p.completed).toEqual([]);
	});
});
