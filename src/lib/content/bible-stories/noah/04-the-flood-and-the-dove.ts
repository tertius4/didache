import type { Lesson, Verse } from '../../types';

const gen7_19: Verse = {
	ref: 'Genesis 7:19',
	text: 'And the waters prevailed so mightily on the earth that all the high mountains under the whole heaven were covered.'
};
const gen7_23: Verse = {
	ref: 'Genesis 7:23',
	text: 'He blotted out every living thing that was on the face of the ground, man and animals and creeping things and birds of the heavens. They were blotted out from the earth. Only Noah was left, and those who were with him in the ark.'
};
const gen7_24: Verse = {
	ref: 'Genesis 7:24',
	text: 'And the waters prevailed on the earth 150 days.'
};
const gen8_1: Verse = {
	ref: 'Genesis 8:1',
	text: 'But God remembered Noah and all the beasts and all the livestock that were with him in the ark. And God made a wind blow over the earth, and the waters subsided.'
};
const gen8_4: Verse = {
	ref: 'Genesis 8:4',
	text: 'And in the seventh month, on the seventeenth day of the month, the ark came to rest on the mountains of Ararat.'
};
const gen8_7: Verse = {
	ref: 'Genesis 8:7',
	text: 'And sent forth a raven. It went to and fro until the waters were dried up from the earth.'
};
const gen8_11: Verse = {
	ref: 'Genesis 8:11',
	text: 'And the dove came back to him in the evening, and behold, in her mouth was a freshly plucked olive leaf. So Noah knew that the waters had subsided from the earth.'
};
const gen8_16: Verse = {
	ref: 'Genesis 8:15–16',
	text: 'Then God said to Noah, “Go out from the ark, you and your wife, and your sons and your sons’ wives with you.”'
};
const pet2_5: Verse = {
	ref: '2 Peter 2:5',
	text: 'If he did not spare the ancient world, but preserved Noah, a herald of righteousness, with seven other persons, when he brought a flood upon the world of the ungodly…'
};

export const lesson: Lesson = {
	id: 'the-flood-and-the-dove',
	title: 'The flood and the dove',
	passage: 'Genesis 7:17–8:19',
	illustration: 'dove',
	story: [
		{
			id: 'waters-prevailed',
			title: 'The waters prevailed',
			body: 'The water rose until even the highest mountains were covered. Everything outside the ark died. Only Noah and those with him were left.',
			verse: gen7_23,
			illustration: 'rain',
			learnMore: {
				title: 'Judgment is real',
				paragraphs: [
					'The flood shows that God really does judge sin. Peter uses it as a warning: the same God will judge the world again one day.',
					'But the flood also shows God keeping his people safe through judgment. In Christ, believers are carried through God’s judgment, just as the ark carried Noah.'
				],
				verses: [pet2_5]
			}
		},
		{
			id: 'god-remembered',
			title: 'But God remembered Noah',
			body: 'After 150 days, God sent a wind and the water began to go down. The ark came to rest on the mountains of Ararat.',
			verse: gen8_1,
			illustration: 'mountain',
			learnMore: {
				title: 'God remembers his promises',
				paragraphs: [
					'“God remembered” doesn’t mean God had forgotten. In the Bible it means God acts on his promise.',
					'Back in Genesis 6:18 God promised a covenant with Noah. Now, right on time, he keeps it. God never forgets his people.'
				],
				confessions: ['Heidelberg Catechism Q&A 26–28']
			}
		},
		{
			id: 'raven-and-dove',
			title: 'The raven and the dove',
			body: 'Noah sent out a raven, and then a dove. The first time, the dove found nowhere to land. The second time, she came back with a fresh olive leaf! The third time, she didn’t come back at all.',
			verse: gen8_11,
			illustration: 'dove'
		},
		{
			id: 'go-out',
			title: '“Go out from the ark”',
			body: 'Noah waited for God’s word. When God said “Go out”, Noah, his family and all the animals stepped onto dry ground.',
			verse: gen8_16,
			illustration: 'mountain'
		}
	],
	exercises: [
		{
			id: 'l4-mountains',
			type: 'mc',
			prompt: 'How high did the water rise?',
			options: [
				'All the high mountains were covered',
				'Up to the hilltops',
				'Up to the tree tops',
				'Only the valleys flooded'
			],
			answer: 'All the high mountains were covered',
			verse: gen7_19
		},
		{
			id: 'l4-only-noah',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Only Noah was ___, and those who were with him in the ark.',
			options: ['left', 'sad', 'sleeping', 'lost'],
			answer: 'left',
			verse: gen7_23
		},
		{
			id: 'l4-150',
			type: 'mc',
			prompt: 'How long did the waters prevail on the earth?',
			options: ['150 days', '40 days', '7 days', '10 years'],
			answer: '150 days',
			verse: gen7_24
		},
		{
			id: 'l4-remembered',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'But God ___ Noah.',
			options: ['remembered', 'forgot', 'tested', 'blamed'],
			answer: 'remembered',
			verse: gen8_1
		},
		{
			id: 'l4-ararat',
			type: 'mc',
			prompt: 'Where did the ark come to rest?',
			options: ['The mountains of Ararat', 'Mount Sinai', 'Mount Zion', 'The Mount of Olives'],
			answer: 'The mountains of Ararat',
			verse: gen8_4
		},
		{
			id: 'l4-first-bird',
			type: 'mc',
			prompt: 'Which bird did Noah send out first?',
			options: ['A raven', 'A dove', 'An eagle', 'A sparrow'],
			answer: 'A raven',
			verse: gen8_7
		},
		{
			id: 'l4-olive-leaf',
			type: 'truefalse',
			statement: 'The dove came back with an olive leaf in her mouth.',
			answer: true,
			verse: gen8_11
		},
		{
			id: 'l4-match',
			type: 'match',
			prompt: 'Match each bird to what happened',
			pairs: [
				['The raven', 'Went to and fro'],
				['The dove, 1st time', 'Found nowhere to land'],
				['The dove, 2nd time', 'Brought an olive leaf'],
				['The dove, 3rd time', 'Did not return']
			],
			verse: gen8_11
		},
		{
			id: 'l4-order',
			type: 'order',
			prompt: 'Put these events in order',
			items: [
				'The ark rests on Ararat',
				'Noah sends out a raven',
				'The dove returns with an olive leaf',
				'The dove does not return',
				'God says: “Go out from the ark”'
			],
			verse: gen8_16
		},
		{
			id: 'l4-waited',
			type: 'truefalse',
			statement: 'Noah waited for God to tell him to leave the ark.',
			answer: true,
			verse: gen8_16
		}
	]
};
