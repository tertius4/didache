import type { Lesson, Verse } from '../../types';

const gen8_20: Verse = {
	ref: 'Genesis 8:20',
	text: 'Then Noah built an altar to the LORD and took some of every clean animal and some of every clean bird and offered burnt offerings on the altar.'
};
const gen8_21: Verse = {
	ref: 'Genesis 8:21',
	text: 'And when the LORD smelled the pleasing aroma, the LORD said in his heart, “I will never again curse the ground because of man, for the intention of man’s heart is evil from his youth. Neither will I ever again strike down every living creature as I have done.”'
};
const gen8_22: Verse = {
	ref: 'Genesis 8:22',
	text: 'While the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night, shall not cease.'
};
const gen9_1: Verse = {
	ref: 'Genesis 9:1',
	text: 'And God blessed Noah and his sons and said to them, “Be fruitful and multiply and fill the earth.”'
};
const gen9_6: Verse = {
	ref: 'Genesis 9:6',
	text: 'Whoever sheds the blood of man, by man shall his blood be shed, for God made man in his own image.'
};
const gen9_11: Verse = {
	ref: 'Genesis 9:11',
	text: 'I establish my covenant with you, that never again shall all flesh be cut off by the waters of the flood, and never again shall there be a flood to destroy the earth.'
};
const gen9_13: Verse = {
	ref: 'Genesis 9:13',
	text: 'I have set my bow in the cloud, and it shall be a sign of the covenant between me and the earth.'
};
const gen9_16: Verse = {
	ref: 'Genesis 9:16',
	text: 'When the bow is in the clouds, I will see it and remember the everlasting covenant between God and every living creature of all flesh that is on the earth.'
};
const eph5_2: Verse = {
	ref: 'Ephesians 5:2',
	text: 'And walk in love, as Christ loved us and gave himself up for us, a fragrant offering and sacrifice to God.'
};
const pet3_9: Verse = {
	ref: '2 Peter 3:9',
	text: 'The Lord is not slow to fulfill his promise as some count slowness, but is patient toward you, not wishing that any should perish, but that all should reach repentance.'
};

export const lesson: Lesson = {
	id: 'the-rainbow-covenant',
	title: 'The rainbow covenant',
	passage: 'Genesis 8:20–9:17',
	illustration: 'rainbow',
	story: [
		{
			id: 'altar',
			title: 'Noah built an altar',
			body: 'The first thing Noah did on dry ground was worship. He built an altar and offered sacrifices to the LORD, and God was pleased.',
			verse: gen8_20,
			illustration: 'altar',
			learnMore: {
				title: 'A sacrifice that points to Christ',
				paragraphs: [
					'Noah’s offering was a “pleasing aroma” to God. But animal sacrifices could never take away sin for good.',
					'They pointed forward to Jesus, who gave himself as the perfect sacrifice. Because of him, God is pleased with all who trust in him.'
				],
				verses: [eph5_2],
				confessions: ['Heidelberg Catechism Q&A 37, 40']
			}
		},
		{
			id: 'seasons',
			title: 'Seedtime and harvest',
			body: 'God promised that while the earth remains, the seasons will keep turning. Then he blessed Noah’s family: “Be fruitful and multiply and fill the earth.”',
			verse: gen8_22,
			illustration: 'world'
		},
		{
			id: 'bow-in-cloud',
			title: 'My bow in the cloud',
			body: 'God made a covenant, a solemn promise, with Noah and with every living creature: never again would a flood destroy the earth. The rainbow is the sign of that promise.',
			verse: gen9_13,
			illustration: 'rainbow',
			learnMore: {
				title: 'A covenant of preservation',
				paragraphs: [
					'In a covenant, God binds himself by a promise. This covenant with Noah promises to keep the world going, with seasons, life and order, even though people are still sinful (8:21).',
					'Why? So that God’s greater plan of salvation can unfold, all the way to Jesus. Every rainbow reminds us that God is patient and keeps his word.'
				],
				verses: [pet3_9],
				confessions: ['Belgic Confession Art. 13']
			}
		}
	],
	exercises: [
		{
			id: 'l5-first-thing',
			type: 'mc',
			prompt: 'What did Noah do first after leaving the ark?',
			options: ['Built an altar', 'Built a house', 'Planted a garden', 'Went to sleep'],
			answer: 'Built an altar',
			verse: gen8_20
		},
		{
			id: 'l5-harvest',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'While the earth remains, seedtime and ___, cold and heat… shall not cease.',
			options: ['harvest', 'rain', 'famine', 'flood'],
			answer: 'harvest',
			verse: gen8_22
		},
		{
			id: 'l5-heart',
			type: 'truefalse',
			statement: 'After the flood, God said man’s heart was now good.',
			answer: false,
			verse: gen8_21,
			explanation:
				'God said the intention of man’s heart is still evil from his youth. The flood didn’t fix the human heart. Only God’s grace can.'
		},
		{
			id: 'l5-multiply',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Be fruitful and ___ and fill the earth.',
			options: ['multiply', 'rest', 'build', 'rule'],
			answer: 'multiply',
			verse: gen9_1
		},
		{
			id: 'l5-image',
			type: 'mc',
			prompt: 'According to Genesis 9:6, why is human life precious?',
			options: [
				'God made man in his own image',
				'People are strong',
				'There were few people left',
				'Noah said so'
			],
			answer: 'God made man in his own image',
			verse: gen9_6
		},
		{
			id: 'l5-bow',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'I have set my ___ in the cloud.',
			options: ['bow', 'star', 'throne', 'sword'],
			answer: 'bow',
			verse: gen9_13
		},
		{
			id: 'l5-promise',
			type: 'mc',
			prompt: 'What did God promise in this covenant?',
			options: [
				'Never again to destroy the earth with a flood',
				'That it would never rain again',
				'That people would never sin again',
				'That Noah would live forever'
			],
			answer: 'Never again to destroy the earth with a flood',
			verse: gen9_11
		},
		{
			id: 'l5-who',
			type: 'truefalse',
			statement: 'God made this covenant with Noah only.',
			answer: false,
			verse: gen9_16,
			explanation:
				'The covenant is with Noah, his descendants and every living creature on the earth.'
		},
		{
			id: 'l5-match',
			type: 'match',
			prompt: 'Match each one to its meaning',
			pairs: [
				['Altar', 'Worship and sacrifice'],
				['Rainbow', 'Sign of the covenant'],
				['Seasons', 'Will not cease while the earth remains'],
				['Image of God', 'Why human life is precious']
			],
			verse: gen9_13
		},
		{
			id: 'l5-order',
			type: 'order',
			prompt: 'Put these events in order',
			items: [
				'Noah builds an altar',
				'God promises seedtime and harvest',
				'God blesses Noah and his sons',
				'God sets his bow in the cloud'
			],
			verse: gen9_13
		},
		{
			id: 'l5-remember',
			type: 'truefalse',
			statement: 'When God sees the rainbow, he remembers his covenant.',
			answer: true,
			verse: gen9_16
		}
	]
};
