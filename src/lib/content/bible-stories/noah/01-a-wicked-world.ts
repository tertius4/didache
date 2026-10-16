import type { Lesson, Verse } from '../../types';

const gen6_3: Verse = {
	ref: 'Genesis 6:3',
	text: 'Then the LORD said, “My Spirit shall not abide in man forever, for he is flesh: his days shall be 120 years.”'
};
const gen6_5: Verse = {
	ref: 'Genesis 6:5',
	text: 'The LORD saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually.'
};
const gen6_6: Verse = {
	ref: 'Genesis 6:6',
	text: 'And the LORD regretted that he had made man on the earth, and it grieved him to his heart.'
};
const gen6_7: Verse = {
	ref: 'Genesis 6:7',
	text: 'So the LORD said, “I will blot out man whom I have created from the face of the land, man and animals and creeping things and birds of the heavens, for I am sorry that I made them.”'
};
const rom3_10: Verse = {
	ref: 'Romans 3:10',
	text: 'As it is written: “None is righteous, no, not one.”'
};
const rom6_23: Verse = {
	ref: 'Romans 6:23',
	text: 'For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.'
};
const pet3_20: Verse = {
	ref: '1 Peter 3:20',
	text: '…when God’s patience waited in the days of Noah, while the ark was being prepared…'
};

export const lesson: Lesson = {
	id: 'a-wicked-world',
	title: 'A wicked world',
	passage: 'Genesis 6:1–7',
	illustration: 'world',
	story: [
		{
			id: 'people-multiplied',
			title: 'A world filling up',
			body: 'After Adam and Eve sinned, their children spread across the earth. There were more and more people, but sin spread with them.',
			illustration: 'world'
		},
		{
			id: 'only-evil',
			title: 'Only evil, all the time',
			body: 'God looked at the world he had made. People weren’t just doing bad things now and then. Their hearts were turned away from him.',
			verse: gen6_5,
			illustration: 'world',
			learnMore: {
				title: 'Total depravity',
				paragraphs: [
					'Reformed Christians call this “total depravity”. It doesn’t mean people are as bad as they could possibly be. It means sin has reached every part of us: our thoughts, our desires, our choices.',
					'That’s why we can’t fix ourselves by trying harder. The problem is the heart, and only God can give a new one.'
				],
				verses: [rom3_10],
				confessions: ['Heidelberg Catechism Q&A 5–8', 'Canons of Dort III/IV, Art. 1–3']
			}
		},
		{
			id: 'grieved',
			title: 'The LORD was grieved',
			body: 'Sin isn’t a small thing to God. It grieved him to his heart, and he said he would bring judgment on the earth.',
			verse: gen6_6,
			illustration: 'rain',
			learnMore: {
				title: 'A holy and patient God',
				paragraphs: [
					'God is holy and just, so he can’t ignore sin forever. Judgment is what sin deserves.',
					'But look at his patience: he gave the world 120 years of warning while the ark was being built. God is slow to anger, even when judgment is coming.'
				],
				verses: [rom6_23, pet3_20],
				confessions: ['Heidelberg Catechism Q&A 10–11']
			}
		}
	],
	exercises: [
		{
			id: 'l1-what-god-saw',
			type: 'mc',
			prompt: 'What did the LORD see when he looked at the earth?',
			options: [
				'The wickedness of man was great',
				'People were seeking him',
				'Everyone lived in peace',
				'The earth was empty'
			],
			answer: 'The wickedness of man was great',
			verse: gen6_5
		},
		{
			id: 'l1-only-evil',
			type: 'fill',
			prompt: 'Complete the verse',
			text: 'Every intention of the thoughts of his heart was only ___ continually.',
			options: ['evil', 'good', 'sad', 'hidden'],
			answer: 'evil',
			verse: gen6_5
		},
		{
			id: 'l1-god-pleased',
			type: 'truefalse',
			statement: 'God was pleased with how people lived before the flood.',
			answer: false,
			verse: gen6_6,
			explanation: 'The wickedness of the world grieved God to his heart.'
		},
		{
			id: 'l1-god-felt',
			type: 'mc',
			prompt: 'How did the LORD feel about the evil in the world?',
			options: [
				'It grieved him to his heart',
				'He didn’t notice it',
				'He thought it was funny',
				'He didn’t mind'
			],
			answer: 'It grieved him to his heart',
			verse: gen6_6
		},
		{
			id: 'l1-heart',
			type: 'truefalse',
			statement: 'According to Genesis 6:5, sin only affected what people did, not their hearts.',
			answer: false,
			verse: gen6_5,
			explanation: 'Sin went right down to “the thoughts of his heart”. It starts inside us.'
		},
		{
			id: 'l1-120-years',
			type: 'mc',
			prompt: 'How long did God say man’s days would be?',
			options: ['120 years', '40 years', '7 years', '1,000 years'],
			answer: '120 years',
			verse: gen6_3
		},
		{
			id: 'l1-match',
			type: 'match',
			prompt: 'Match each phrase from Genesis 6',
			pairs: [
				['Wickedness of man', 'Great in the earth'],
				['Thoughts of his heart', 'Only evil continually'],
				['The LORD', 'Grieved to his heart'],
				['Judgment', 'Blot out man from the land']
			],
			verse: gen6_7
		},
		{
			id: 'l1-order',
			type: 'order',
			prompt: 'Put these events in order',
			items: [
				'People multiplied on the earth',
				'Wickedness filled the earth',
				'The LORD was grieved',
				'The LORD decided to blot out man'
			],
			verse: gen6_7
		},
		{
			id: 'l1-none-righteous',
			type: 'fill',
			prompt: 'Paul says the same about all of us',
			text: 'None is ___, no, not one.',
			options: ['righteous', 'lost', 'strong', 'wise'],
			answer: 'righteous',
			verse: rom3_10
		},
		{
			id: 'l1-patience',
			type: 'truefalse',
			statement: 'Even with judgment coming, God waited patiently before the flood came.',
			answer: true,
			verse: pet3_20
		}
	]
};
