/**
 * Content model: Section → Unit → Lesson → (StoryCard[], Exercise[]).
 * Content files are plain data; nothing here depends on Svelte.
 */

import type { IllustrationKey } from '#lib/components/illustrations/keys.ts';

/** A Bible verse quoted in the ESV. */
export interface Verse {
	ref: string;
	text: string;
}

/** Optional doctrinal deep-dive attached to a story card. */
export interface LearnMore {
	title: string;
	paragraphs: string[];
	verses?: Verse[];
	/** Pointers to confessional standards, e.g. "Heidelberg Catechism Q&A 8". */
	confessions?: string[];
}

export interface StoryCard {
	id: string;
	title: string;
	body: string;
	verse?: Verse;
	illustration?: IllustrationKey;
	learnMore?: LearnMore;
}

interface ExerciseBase {
	id: string;
	/** The verse shown with the feedback, so every answer is tied to Scripture. */
	verse: Verse;
	/** Short explanation shown after answering. */
	explanation?: string;
}

export interface MultipleChoiceExercise extends ExerciseBase {
	type: 'mc';
	prompt: string;
	options: string[];
	answer: string;
}

export interface FillBlankExercise extends ExerciseBase {
	type: 'fill';
	prompt: string;
	/** Sentence containing exactly one `___` placeholder. */
	text: string;
	options: string[];
	answer: string;
}

export interface TrueFalseExercise extends ExerciseBase {
	type: 'truefalse';
	statement: string;
	answer: boolean;
}

export interface OrderExercise extends ExerciseBase {
	type: 'order';
	prompt: string;
	/** Items in the correct order; shuffled when shown. */
	items: string[];
}

export interface MatchExercise extends ExerciseBase {
	type: 'match';
	prompt: string;
	pairs: [left: string, right: string][];
}

export type Exercise =
	MultipleChoiceExercise | FillBlankExercise | TrueFalseExercise | OrderExercise | MatchExercise;

export type ExerciseType = Exercise['type'];

/** The shape of a user's answer for each exercise type. */
export interface AnswerMap {
	mc: string;
	fill: string;
	truefalse: boolean;
	order: string[];
	match: Record<string, string>;
}

export type AnswerFor<E extends Exercise> = AnswerMap[E['type']];
export type AnyAnswer = AnswerMap[ExerciseType];

/**
 * A lesson's intro video (vertical 9:16). Files live in
 * `static/media/<section>/<unit>/<lesson>/`, so paths start with `/media/...`.
 */
export interface LessonVideo {
	src: string;
	poster?: string;
	/** WebVTT captions file. */
	captions?: string;
	/** Display length, e.g. "2:10". */
	duration?: string;
}

export interface Lesson {
	id: string;
	title: string;
	/** Bible passage covered, e.g. "Genesis 6:1–7". */
	passage: string;
	illustration: IllustrationKey;
	/** Intro video; a placeholder is shown until one is added. */
	video?: LessonVideo;
	/** Story as text: shown via "Read the story instead" and as the source of "Learn more". */
	story: StoryCard[];
	exercises: Exercise[];
}

export interface Unit {
	id: string;
	title: string;
	description: string;
	illustration: IllustrationKey;
	lessons: Lesson[];
}

export interface Section {
	id: string;
	title: string;
	description: string;
	/** "Coming soon" blurb shown below the section's units. */
	upcoming?: string;
	units: Unit[];
}
