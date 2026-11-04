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
const pet3_20: Verse = {
	ref: '1 Peter 3:20',
	text: '…when God’s patience waited in the days of Noah, while the ark was being prepared…'
};

export const lesson: Lesson = {
	id: 'a-wicked-world',
	title: 'A wicked world',
	passage: 'Genesis 6:1–7',
	illustration: 'world',
	video: {
		src: '/media/bible-stories/noah/a-wicked-world/video.mp4',
		poster: '/media/bible-stories/noah/a-wicked-world/poster.webp',
		duration: '0:38'
	},
	// One card per scene of the video script: docs/images/noah/01-a-wicked-world.md
	story: [
		{
			id: 'world-filling-up',
			title: 'A world filling up',
			body: 'After Adam and Eve sinned, their children spread across the earth. Families grew, villages grew, and there were more and more people.',
			image: '/media/bible-stories/noah/a-wicked-world/world-filling-up.webp'
		},
		{
			id: 'sin-spread',
			title: 'Sin spread too',
			body: 'But sin spread with them. People grabbed what wasn’t theirs, cheated their neighbours, and turned away anyone in need.',
			image: '/media/bible-stories/noah/a-wicked-world/sin-spread.webp'
		},
		{
			id: 'only-evil',
			title: 'Only evil, all the time',
			body: 'God looked at the world he had made. People weren’t just doing bad things now and then. Every thought of their hearts was turned to evil.',
			verse: gen6_5,
			image: '/media/bible-stories/noah/a-wicked-world/only-evil.webp'
		},
		{
			id: 'the-lord-was-grieved',
			title: 'The LORD was grieved',
			body: 'Sin isn’t a small thing to God. It grieved him to his heart. He said he would blot out man from the face of the land.',
			verse: gen6_6,
			image: '/media/bible-stories/noah/a-wicked-world/the-lord-was-grieved.webp'
		},
		{
			id: 'one-light',
			title: 'One light in the dark',
			body: 'But God is patient. He gave the world a hundred and twenty years of warning. And in that dark world, there was one man who still walked with God.',
			verse: gen6_3,
			image: '/media/bible-stories/noah/a-wicked-world/one-light.webp'
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
			id: 'l1-patience',
			type: 'truefalse',
			statement: 'Even with judgment coming, God waited patiently before the flood came.',
			answer: true,
			verse: pet3_20
		}
	]
};
