import type { Section } from '../types';
import { noah } from './noah/unit';

export const bibleStories: Section = {
	id: 'bible-stories',
	title: 'Bible Stories',
	description: 'Walk through the great stories of Scripture and see God’s grace in each one.',
	units: [noah]
};
