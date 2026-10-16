import { error } from '@sveltejs/kit';
import { allLessonParams, findLesson } from '#lib/content/index.ts';
import type { PageLoad } from './$types';

export const entries = () => allLessonParams();

export const load: PageLoad = ({ params }) => {
	const location = findLesson(params.section, params.unit, params.lesson);
	if (!location) error(404, 'Lesson not found');
	return { location };
};
