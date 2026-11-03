import type { Section } from '../types';
import { adamAndEve } from './adam-and-eve/unit';
import { cainAndAbel } from './cain-and-abel/unit';
import { noah } from './noah/unit';
import { towerOfBabel } from './tower-of-babel/unit';

export const bibleStories: Section = {
	id: 'bible-stories',
	title: 'Bible Stories',
	description: 'Walk through the great stories of Scripture and see God’s grace in each one.',
	upcoming: 'Abraham, Moses, David, the life of Jesus…',
	// In Bible order; coming-soon units show on the journey but can't be opened yet.
	units: [adamAndEve, cainAndAbel, noah, towerOfBabel]
};
