import { error } from '@sveltejs/kit';
import { findSection, sections } from '#lib/content/index.ts';
import type { PageLoad } from './$types';

export const entries = () => sections.map((s) => ({ section: s.id }));

export const load: PageLoad = ({ params }) => {
	const section = findSection(params.section);
	if (!section) error(404, 'Section not found');
	return { section };
};
