import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { sections } from '#lib/content/index.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	redirect(307, resolve('/learn/[section]', { section: sections[0].id }));
};
