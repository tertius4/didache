import { error } from '@sveltejs/kit';
import { findUnit, sections } from '#lib/content/index.ts';
import type { PageLoad } from './$types';

export const entries = () =>
	sections.flatMap((s) =>
		s.units.filter((u) => !u.comingSoon).map((u) => ({ section: s.id, unit: u.id }))
	);

export const load: PageLoad = ({ params }) => {
	const found = findUnit(params.section, params.unit);
	if (!found || found.unit.comingSoon) error(404, 'Unit not found');
	return found;
};
