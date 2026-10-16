import { describe, expect, it } from 'vitest';
import type { Exercise } from '#lib/content/types.ts';
import { checkAnswer, correctAnswerText, shuffle } from './check';

const verse = { ref: 'Genesis 6:8', text: '…' };

const mc: Exercise = { id: 'mc', type: 'mc', prompt: '?', options: ['a', 'b'], answer: 'b', verse };
const fill: Exercise = {
	id: 'fill',
	type: 'fill',
	prompt: '?',
	text: 'x ___ y',
	options: ['a', 'b'],
	answer: 'a',
	verse
};
const tf: Exercise = { id: 'tf', type: 'truefalse', statement: 's', answer: false, verse };
const order: Exercise = { id: 'o', type: 'order', prompt: '?', items: ['1', '2', '3'], verse };
const match: Exercise = {
	id: 'm',
	type: 'match',
	prompt: '?',
	pairs: [
		['a', 'A'],
		['b', 'B']
	],
	verse
};

describe('checkAnswer', () => {
	it('checks multiple choice and fill-in-the-blank', () => {
		expect(checkAnswer(mc, 'b')).toBe(true);
		expect(checkAnswer(mc, 'a')).toBe(false);
		expect(checkAnswer(fill, 'a')).toBe(true);
		expect(checkAnswer(fill, 'b')).toBe(false);
	});

	it('checks true/false', () => {
		expect(checkAnswer(tf, false)).toBe(true);
		expect(checkAnswer(tf, true)).toBe(false);
	});

	it('checks order, including incomplete answers', () => {
		expect(checkAnswer(order, ['1', '2', '3'])).toBe(true);
		expect(checkAnswer(order, ['2', '1', '3'])).toBe(false);
		expect(checkAnswer(order, ['1', '2'])).toBe(false);
	});

	it('checks match pairs, including incomplete answers', () => {
		expect(checkAnswer(match, { a: 'A', b: 'B' })).toBe(true);
		expect(checkAnswer(match, { a: 'B', b: 'A' })).toBe(false);
		expect(checkAnswer(match, { a: 'A' })).toBe(false);
	});
});

describe('correctAnswerText', () => {
	it('formats each type', () => {
		expect(correctAnswerText(mc)).toBe('b');
		expect(correctAnswerText(tf)).toBe('False');
		expect(correctAnswerText(order)).toBe('1. 1\n2. 2\n3. 3');
		expect(correctAnswerText(match)).toBe('a → A\nb → B');
	});
});

describe('shuffle', () => {
	it('keeps the same items and never returns the original order', () => {
		const items = ['a', 'b', 'c', 'd'];
		for (let i = 0; i < 50; i++) {
			const out = shuffle(items);
			expect([...out].sort()).toEqual(items);
			expect(out).not.toEqual(items);
		}
	});
});
