import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { illustrationKeys } from '#lib/components/illustrations/keys.ts';
import { allLessonParams, findLesson, sections } from '.';

const slug = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe('content integrity', () => {
	it('uses unique, URL-safe ids at every level', () => {
		expect(new Set(sections.map((s) => s.id)).size).toBe(sections.length);
		for (const section of sections) {
			expect(section.id).toMatch(slug);
			expect(new Set(section.units.map((u) => u.id)).size).toBe(section.units.length);
			for (const unit of section.units) {
				expect(unit.id).toMatch(slug);
				if (unit.comingSoon) expect(unit.lessons, unit.id).toEqual([]);
				else {
					expect(unit.lessons.length, unit.id).toBeGreaterThan(0);
					expect(unit.illustration, unit.id).toBeTruthy();
				}
				expect(new Set(unit.lessons.map((l) => l.id)).size).toBe(unit.lessons.length);
				for (const lesson of unit.lessons) expect(lesson.id).toMatch(slug);
			}
		}
	});

	it('has unique exercise ids across all content', () => {
		const ids = allLessonParams().flatMap((p) =>
			findLesson(p.section, p.unit, p.lesson)!.lesson.exercises.map((e) => e.id)
		);
		expect(new Set(ids).size).toBe(ids.length);
	});

	for (const p of allLessonParams()) {
		const { lesson } = findLesson(p.section, p.unit, p.lesson)!;

		describe(`${p.unit}/${p.lesson}`, () => {
			it('has story cards and enough exercises', () => {
				expect(lesson.story.length).toBeGreaterThan(0);
				expect(lesson.exercises.length).toBeGreaterThanOrEqual(8);
			});

			it('uses known illustrations', () => {
				const keys = [lesson.illustration, ...lesson.story.map((c) => c.illustration)];
				for (const key of keys.filter(Boolean)) expect(illustrationKeys).toContain(key);
			});

			it('has a picture for every story card, and every image file exists', () => {
				expect(new Set(lesson.story.map((c) => c.id)).size).toBe(lesson.story.length);
				for (const card of lesson.story) {
					expect(card.image ?? card.illustration, card.id).toBeTruthy();
					if (card.image) expect(existsSync(`static${card.image}`), card.image).toBe(true);
				}
			});

			it('has its video files in place', () => {
				const files = [lesson.video?.src, lesson.video?.poster, lesson.video?.captions];
				const missing = files.filter((f) => f && !existsSync(`static${f}`));
				expect(missing).toEqual([]);
			});

			it('has valid exercises tied to a verse', () => {
				for (const ex of lesson.exercises) {
					expect(ex.verse.ref, ex.id).toBeTruthy();
					expect(ex.verse.text, ex.id).toBeTruthy();
					switch (ex.type) {
						case 'mc':
							expect(ex.options, ex.id).toContain(ex.answer);
							expect(new Set(ex.options).size, ex.id).toBe(ex.options.length);
							break;
						case 'fill':
							expect(ex.options, ex.id).toContain(ex.answer);
							expect(ex.text.split('___').length, ex.id).toBe(2);
							break;
						case 'order':
							expect(ex.items.length, ex.id).toBeGreaterThanOrEqual(3);
							expect(new Set(ex.items).size, ex.id).toBe(ex.items.length);
							break;
						case 'match':
							expect(ex.pairs.length, ex.id).toBeGreaterThanOrEqual(3);
							expect(new Set(ex.pairs.map((p) => p[0])).size, ex.id).toBe(ex.pairs.length);
							expect(new Set(ex.pairs.map((p) => p[1])).size, ex.id).toBe(ex.pairs.length);
							break;
						case 'truefalse':
							expect(typeof ex.answer, ex.id).toBe('boolean');
							break;
					}
				}
			});
		});
	}
});
