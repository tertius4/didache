import type { Lesson, Verse } from '../../types';

const gen6_8: Verse = {
	ref: 'Genesis 6:8',
	text: 'But Noah found favor in the eyes of the LORD.'
};
const gen6_9: Verse = {
	ref: 'Genesis 6:9',
	text: 'These are the generations of Noah. Noah was a righteous man, blameless in his generation. Noah walked with God.'
};
const gen6_10: Verse = {
	ref: 'Genesis 6:10',
	text: 'And Noah had three sons, Shem, Ham, and Japheth.'
};
const gen6_13: Verse = {
	ref: 'Genesis 6:13',
	text: 'And God said to Noah, “I have determined to make an end of all flesh, for the earth is filled with violence through them. Behold, I will destroy them with the earth.”'
};
const gen6_14: Verse = {
	ref: 'Genesis 6:14',
	text: 'Make yourself an ark of gopher wood. Make rooms in the ark, and cover it inside and out with pitch.'
};
const gen6_15: Verse = {
	ref: 'Genesis 6:15',
	text: 'This is how you are to make it: the length of the ark 300 cubits, its breadth 50 cubits, and its height 30 cubits.'
};
const gen6_18: Verse = {
	ref: 'Genesis 6:18',
	text: 'But I will establish my covenant with you, and you shall come into the ark, you, your sons, your wife, and your sons’ wives with you.'
};
const gen6_19: Verse = {
	ref: 'Genesis 6:19',
	text: 'And of every living thing of all flesh, you shall bring two of every sort into the ark to keep them alive with you. They shall be male and female.'
};
const gen6_22: Verse = {
	ref: 'Genesis 6:22',
	text: 'Noah did this; he did all that God commanded him.'
};
const heb11_7: Verse = {
	ref: 'Hebrews 11:7',
	text: 'By faith Noah, being warned by God concerning events as yet unseen, in reverent fear constructed an ark for the saving of his household. By this he condemned the world and became an heir of the righteousness that comes by faith.'
};
const eph2_8: Verse = {
	ref: 'Ephesians 2:8',
	text: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.'
};

export const lesson: Lesson = {
	id: 'noah-found-grace',
	title: 'Noah found grace',
	passage: 'Genesis 6:8–22',
	illustration: 'ark-build',
	story: [
		{
			id: 'but-noah',
			title: '“But Noah…”',
			body: 'In a world full of evil, one small word changes everything: “But”. God showed favor to Noah.',
			verse: gen6_8,
			illustration: 'scroll',
			learnMore: {
				title: 'Grace comes first',
				paragraphs: [
					'Look at the order. First we read that Noah found favor (grace) with God (6:8). Only after that are we told Noah was righteous and walked with God (6:9).',
					'Noah wasn’t saved because he was better than everyone else. God’s grace came first, and Noah’s faithful life grew out of that grace. It’s the same for us.'
				],
				verses: [eph2_8],
				confessions: ['Heidelberg Catechism Q&A 60–61', 'Belgic Confession Art. 22–24']
			}
		},
		{
			id: 'walked-with-god',
			title: 'Noah walked with God',
			body: 'Noah lived close to God in a world that had turned away from him. He had three sons: Shem, Ham and Japheth.',
			verse: gen6_9,
			illustration: 'world'
		},
		{
			id: 'build-an-ark',
			title: 'Build an ark',
			body: 'God told Noah the flood was coming and gave him exact plans: a huge boat of gopher wood, sealed with pitch, about 135 metres long!',
			verse: gen6_14,
			illustration: 'ark-build'
		},
		{
			id: 'noah-did-all',
			title: 'Noah did all God commanded',
			body: 'God promised to make a covenant with Noah and keep his family alive. Noah believed God and got to work, even though no flood had ever been seen.',
			verse: gen6_22,
			illustration: 'ark-build',
			learnMore: {
				title: 'Faith that obeys',
				paragraphs: [
					'Hebrews says Noah built the ark “by faith”. He trusted God’s word about something he couldn’t yet see.',
					'True faith isn’t just agreeing with facts. It trusts God’s promises and then acts on them. Good works don’t earn grace; they are the fruit of it.'
				],
				verses: [heb11_7],
				confessions: ['Heidelberg Catechism Q&A 21, 86']
			}
		}
	],
	exercises: [
		{
			id: 'l2-found-favor',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'But Noah found ___ in the eyes of the LORD.',
			options: ['favor', 'gold', 'rest', 'fault'],
			answer: 'favor',
			verse: gen6_8
		},
		{
			id: 'l2-sons',
			type: 'mc',
			prompt: 'Who were Noah’s three sons?',
			options: [
				'Shem, Ham and Japheth',
				'Cain, Abel and Seth',
				'Abraham, Isaac and Jacob',
				'Peter, James and John'
			],
			answer: 'Shem, Ham and Japheth',
			verse: gen6_10
		},
		{
			id: 'l2-whose-idea',
			type: 'truefalse',
			statement: 'Building the ark was Noah’s own idea.',
			answer: false,
			verse: gen6_13,
			explanation: 'God warned Noah and told him exactly what to build.'
		},
		{
			id: 'l2-wood',
			type: 'mc',
			prompt: 'What kind of wood was the ark made from?',
			options: ['Gopher wood', 'Cedar', 'Oak', 'Olive wood'],
			answer: 'Gopher wood',
			verse: gen6_14
		},
		{
			id: 'l2-pitch',
			type: 'mc',
			prompt: 'What covered the ark inside and out?',
			options: ['Pitch', 'Gold', 'Paint', 'Animal skins'],
			answer: 'Pitch',
			verse: gen6_14
		},
		{
			id: 'l2-size',
			type: 'match',
			prompt: 'Match the ark’s measurements',
			pairs: [
				['Length', '300 cubits'],
				['Breadth', '50 cubits'],
				['Height', '30 cubits']
			],
			verse: gen6_15
		},
		{
			id: 'l2-walked',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Noah ___ with God.',
			options: ['walked', 'argued', 'ran', 'slept'],
			answer: 'walked',
			verse: gen6_9
		},
		{
			id: 'l2-two-of-every-sort',
			type: 'mc',
			prompt: 'In Genesis 6, how many of every sort of living thing did God tell Noah to bring?',
			options: ['Two, male and female', 'One of each', 'Ten of each', 'As many as would fit'],
			answer: 'Two, male and female',
			verse: gen6_19
		},
		{
			id: 'l2-order',
			type: 'order',
			prompt: 'Put these events in order',
			items: [
				'God sees that the earth is corrupt',
				'God tells Noah the flood is coming',
				'God gives the ark’s measurements',
				'God promises his covenant',
				'Noah does all God commanded'
			],
			verse: gen6_18
		},
		{
			id: 'l2-by-faith',
			type: 'truefalse',
			statement: 'The Bible says Noah built the ark by faith.',
			answer: true,
			verse: heb11_7
		},
		{
			id: 'l2-did-all',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Noah did this; he did ___ that God commanded him.',
			options: ['all', 'some', 'half', 'most'],
			answer: 'all',
			verse: gen6_22
		}
	]
};
