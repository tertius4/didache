import type { Lesson, Section, Unit } from './types';
import { bibleStories } from './bible-stories/section';
import { theBigStory } from './the-big-story/section';
import { christInAllScripture } from './christ-in-all-scripture/section';

export const sections: Section[] = [bibleStories, theBigStory, christInAllScripture];

export function findSection(sectionId: string): Section | undefined {
	return sections.find((s) => s.id === sectionId);
}

export function findUnit(
	sectionId: string,
	unitId: string
): { section: Section; unit: Unit } | undefined {
	const section = findSection(sectionId);
	const unit = section?.units.find((u) => u.id === unitId);
	return section && unit ? { section, unit } : undefined;
}

/** Globally unique, stable key for a lesson; used for progress and analytics. */
export function lessonKey(sectionId: string, unitId: string, lessonId: string): string {
	return `${sectionId}/${unitId}/${lessonId}`;
}

export interface LessonLocation {
	section: Section;
	unit: Unit;
	lesson: Lesson;
	index: number;
	key: string;
}

export function findLesson(
	sectionId: string,
	unitId: string,
	lessonId: string
): LessonLocation | undefined {
	const found = findUnit(sectionId, unitId);
	if (!found) return undefined;
	const { section, unit } = found;
	const index = unit.lessons.findIndex((l) => l.id === lessonId);
	if (index < 0) return undefined;
	return {
		section,
		unit,
		lesson: unit.lessons[index],
		index,
		key: lessonKey(section.id, unit.id, lessonId)
	};
}

/** The next lesson in the same unit, if any. */
export function nextLesson(loc: LessonLocation): Lesson | undefined {
	return loc.unit.lessons[loc.index + 1];
}

/** Every lesson route, for prerendering. */
export function allLessonParams(): { section: string; unit: string; lesson: string }[] {
	return sections.flatMap((section) =>
		section.units.flatMap((unit) =>
			unit.lessons.map((lesson) => ({ section: section.id, unit: unit.id, lesson: lesson.id }))
		)
	);
}
