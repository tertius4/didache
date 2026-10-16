import type { Lesson, Verse } from '../../types';

const gen7_1: Verse = {
	ref: 'Genesis 7:1',
	text: 'Then the LORD said to Noah, “Go into the ark, you and all your household, for I have seen that you are righteous before me in this generation.”'
};
const gen7_2: Verse = {
	ref: 'Genesis 7:2',
	text: 'Take with you seven pairs of all clean animals, the male and his mate, and a pair of the animals that are not clean, the male and his mate.'
};
const gen7_4: Verse = {
	ref: 'Genesis 7:4',
	text: 'For in seven days I will send rain on the earth forty days and forty nights, and every living thing that I have made I will blot out from the face of the ground.'
};
const gen7_6: Verse = {
	ref: 'Genesis 7:6',
	text: 'Noah was six hundred years old when the flood of waters came upon the earth.'
};
const gen7_11: Verse = {
	ref: 'Genesis 7:11',
	text: 'In the six hundredth year of Noah’s life, in the second month, on the seventeenth day of the month, on that day all the fountains of the great deep burst forth, and the windows of the heavens were opened.'
};
const gen7_16: Verse = {
	ref: 'Genesis 7:16',
	text: 'And those that entered, male and female of all flesh, went in as God had commanded him. And the LORD shut him in.'
};
const pet3_20: Verse = {
	ref: '1 Peter 3:20',
	text: '…while the ark was being prepared, in which a few, that is, eight persons, were brought safely through water.'
};
const john10_9: Verse = {
	ref: 'John 10:9',
	text: 'I am the door. If anyone enters by me, he will be saved and will go in and out and find pasture.'
};
const matt24_38: Verse = {
	ref: 'Matthew 24:38–39',
	text: 'For as in those days before the flood they were eating and drinking, marrying and giving in marriage, until the day when Noah entered the ark, and they were unaware until the flood came and swept them all away, so will be the coming of the Son of Man.'
};

export const lesson: Lesson = {
	id: 'into-the-ark',
	title: 'Into the ark',
	passage: 'Genesis 7:1–16',
	illustration: 'ark',
	story: [
		{
			id: 'go-in',
			title: '“Go into the ark”',
			body: 'The ark was finished. God told Noah to go in with his family and the animals: seven pairs of every clean animal and one pair of the others. In seven days the rain would come.',
			verse: gen7_1,
			illustration: 'ark'
		},
		{
			id: 'flood-begins',
			title: 'The flood begins',
			body: 'Noah was 600 years old. Water burst up from deep under the earth and poured down from the sky. It rained for forty days and forty nights.',
			verse: gen7_11,
			illustration: 'rain',
			learnMore: {
				title: 'Unaware until it came',
				paragraphs: [
					'Jesus said people in Noah’s day carried on as usual, eating, drinking and marrying, right up until the flood came.',
					'He warned that his own return will be the same. God’s patience is real, but it won’t last forever. Today is the day to come to him.'
				],
				verses: [matt24_38]
			}
		},
		{
			id: 'shut-in',
			title: 'The LORD shut him in',
			body: 'Once everyone was inside, Noah didn’t close the door. God did. Noah and his family were safe because God himself shut them in.',
			verse: gen7_16,
			illustration: 'ark',
			learnMore: {
				title: 'Christ, our ark',
				paragraphs: [
					'There was one ark with one door. Everyone inside was saved; everyone outside was lost. The Bible points to Jesus as the true ark and the true door.',
					'And notice who closed the door: the LORD. Salvation is God’s work from start to finish. Those he brings in are kept safe by him, not by their own grip.'
				],
				verses: [john10_9, pet3_20],
				confessions: ['Heidelberg Catechism Q&A 1', 'Canons of Dort V, Art. 8']
			}
		}
	],
	exercises: [
		{
			id: 'l3-seven-days',
			type: 'mc',
			prompt: 'How many days after God’s command did the rain begin?',
			options: ['Seven', 'Forty', 'Three', 'One hundred'],
			answer: 'Seven',
			verse: gen7_4
		},
		{
			id: 'l3-forty',
			type: 'mc',
			prompt: 'How long did it rain?',
			options: [
				'Forty days and forty nights',
				'Seven days and seven nights',
				'One whole year',
				'Three days'
			],
			answer: 'Forty days and forty nights',
			verse: gen7_4
		},
		{
			id: 'l3-seven-pairs',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Take with you seven ___ of all clean animals.',
			options: ['pairs', 'baskets', 'herds', 'days'],
			answer: 'pairs',
			verse: gen7_2
		},
		{
			id: 'l3-age',
			type: 'truefalse',
			statement: 'Noah was 600 years old when the flood came.',
			answer: true,
			verse: gen7_6
		},
		{
			id: 'l3-waters-source',
			type: 'mc',
			prompt: 'Where did the flood waters come from?',
			options: [
				'The great deep and the windows of the heavens',
				'Only from the rain',
				'The Jordan River',
				'Melting snow'
			],
			answer: 'The great deep and the windows of the heavens',
			verse: gen7_11
		},
		{
			id: 'l3-shut-in',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'And the LORD shut him ___.',
			options: ['in', 'out', 'down', 'away'],
			answer: 'in',
			verse: gen7_16
		},
		{
			id: 'l3-who-shut',
			type: 'truefalse',
			statement: 'Noah shut the door of the ark himself.',
			answer: false,
			verse: gen7_16,
			explanation: 'The LORD shut him in. His safety was God’s work.'
		},
		{
			id: 'l3-eight',
			type: 'mc',
			prompt: 'How many people were saved in the ark?',
			options: ['Eight', 'Two', 'Twelve', 'One hundred'],
			answer: 'Eight',
			verse: pet3_20,
			explanation: 'Noah, his wife, their three sons and their sons’ wives.'
		},
		{
			id: 'l3-match',
			type: 'match',
			prompt: 'Match each one to the right detail',
			pairs: [
				['The LORD', 'Shut the door'],
				['Clean animals', 'Seven pairs'],
				['Unclean animals', 'One pair'],
				['The rain', 'Forty days and nights']
			],
			verse: gen7_2
		},
		{
			id: 'l3-order',
			type: 'order',
			prompt: 'Put these events in order',
			items: [
				'God says: “Go into the ark”',
				'Seven days of waiting',
				'The fountains of the deep burst open',
				'Forty days and nights of rain'
			],
			verse: gen7_4
		},
		{
			id: 'l3-unaware',
			type: 'truefalse',
			statement: 'Jesus said people before the flood were unaware until it came.',
			answer: true,
			verse: matt24_38
		}
	]
};
