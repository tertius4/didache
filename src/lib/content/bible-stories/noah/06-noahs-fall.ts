import type { Lesson, Verse } from '../../types';

const gen6_8: Verse = {
	ref: 'Genesis 6:8',
	text: 'But Noah found favour in the eyes of the LORD.'
};
const gen9_20: Verse = {
	ref: 'Genesis 9:20',
	text: 'Noah began to be a man of the soil, and he planted a vineyard.'
};
const gen9_21: Verse = {
	ref: 'Genesis 9:21',
	text: 'He drank of the wine and became drunk and lay uncovered in his tent.'
};
const gen9_22: Verse = {
	ref: 'Genesis 9:22',
	text: 'And Ham, the father of Canaan, saw the nakedness of his father and told his two brothers outside.'
};
const gen9_23: Verse = {
	ref: 'Genesis 9:23',
	text: 'Then Shem and Japheth took a garment, laid it on both their shoulders, and walked backward and covered the nakedness of their father. Their faces were turned backward, and they did not see their father’s nakedness.'
};
const gen9_25: Verse = {
	ref: 'Genesis 9:25',
	text: 'He said, “Cursed be Canaan; a servant of servants shall he be to his brothers.”'
};
const gen9_26: Verse = {
	ref: 'Genesis 9:26',
	text: 'He also said, “Blessed be the LORD, the God of Shem; and let Canaan be his servant.”'
};
const gen9_29: Verse = {
	ref: 'Genesis 9:29',
	text: 'All the days of Noah were 950 years, and he died.'
};
const rom3_23: Verse = {
	ref: 'Romans 3:23',
	text: 'For all have sinned and fall short of the glory of God.'
};
export const lesson: Lesson = {
	id: 'noahs-fall',
	title: 'Noah’s fall',
	passage: 'Genesis 9:18–29',
	comingSoon: true,
	illustration: 'vineyard',
	story: [
		{
			id: 'vineyard',
			title: 'A man of the soil',
			body: 'Noah planted a vineyard. One day he drank too much wine, got drunk and lay uncovered in his tent. The hero of the flood fell into sin.',
			verse: gen9_21,
			illustration: 'vineyard'
		},
		{
			id: 'covering',
			title: 'Covering their father',
			body: 'Ham saw his father’s shame and went and told his brothers. But Shem and Japheth walked in backward with a garment and covered their father without looking.',
			verse: gen9_23,
			illustration: 'cloak'
		},
		{
			id: 'blessing',
			title: 'A blessing for Shem',
			body: 'When Noah woke up, he spoke a curse on Canaan, Ham’s son, and a blessing on Shem. Noah lived 950 years in all, and then he died.',
			verse: gen9_26,
			illustration: 'scroll'
		}
	],
	exercises: [
		{
			id: 'l6-planted',
			type: 'mc',
			prompt: 'What did Noah plant after the flood?',
			options: ['A vineyard', 'An olive grove', 'A wheat field', 'A fig tree'],
			answer: 'A vineyard',
			verse: gen9_20
		},
		{
			id: 'l6-never-sinned',
			type: 'truefalse',
			statement: 'Noah never sinned again after the flood.',
			answer: false,
			verse: gen9_21,
			explanation: 'Noah got drunk and lay uncovered. Even the heroes of the Bible needed grace.'
		},
		{
			id: 'l6-father-of-canaan',
			type: 'mc',
			prompt: 'Which son was the father of Canaan?',
			options: ['Ham', 'Shem', 'Japheth', 'Noah'],
			answer: 'Ham',
			verse: gen9_22
		},
		{
			id: 'l6-covered',
			type: 'mc',
			prompt: 'What did Shem and Japheth do?',
			options: [
				'Covered their father, walking backward',
				'Laughed at their father',
				'Told everyone in the village',
				'Left their father’s tent'
			],
			answer: 'Covered their father, walking backward',
			verse: gen9_23
		},
		{
			id: 'l6-cursed',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Cursed be ___; a servant of servants shall he be to his brothers.',
			options: ['Canaan', 'Shem', 'Japheth', 'Noah'],
			answer: 'Canaan',
			verse: gen9_25
		},
		{
			id: 'l6-age',
			type: 'mc',
			prompt: 'How old was Noah when he died?',
			options: ['950 years', '600 years', '120 years', '969 years'],
			answer: '950 years',
			verse: gen9_29
		},
		{
			id: 'l6-match',
			type: 'match',
			prompt: 'Match each person to what happened',
			pairs: [
				['Noah', 'Planted a vineyard'],
				['Ham', 'Told his brothers'],
				['Shem and Japheth', 'Covered their father'],
				['Canaan', 'Was cursed by Noah']
			],
			verse: gen9_23
		},
		{
			id: 'l6-glory',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'For all have sinned and fall short of the ___ of God.',
			options: ['glory', 'law', 'house', 'mountain'],
			answer: 'glory',
			verse: rom3_23
		},
		{
			id: 'l6-order',
			type: 'order',
			prompt: 'Put these events in order',
			items: [
				'Noah plants a vineyard',
				'Noah becomes drunk',
				'Ham tells his brothers',
				'Shem and Japheth cover their father',
				'Noah blesses Shem'
			],
			verse: gen9_26
		},
		{
			id: 'l6-grace',
			type: 'truefalse',
			statement: 'Noah needed God’s grace just as much as anyone else.',
			answer: true,
			verse: gen6_8,
			explanation:
				'Noah’s story began with grace (“Noah found favour”) and ends by showing how much he needed it.'
		}
	]
};
