import type { Unit } from '../../types';
import { lesson as aWickedWorld } from './01-a-wicked-world';
import { lesson as noahFoundGrace } from './02-noah-found-grace';
import { lesson as intoTheArk } from './03-into-the-ark';
import { lesson as theFloodAndTheDove } from './04-the-flood-and-the-dove';
import { lesson as theRainbowCovenant } from './05-the-rainbow-covenant';
import { lesson as noahsFall } from './06-noahs-fall';

export const noah: Unit = {
	id: 'noah',
	title: 'Noah and the Flood',
	description: 'Judgment, grace and a covenant promise. Genesis 6–9.',
	illustration: 'ark',
	lessons: [
		aWickedWorld,
		noahFoundGrace,
		intoTheArk,
		theFloodAndTheDove,
		theRainbowCovenant,
		noahsFall
	]
};
