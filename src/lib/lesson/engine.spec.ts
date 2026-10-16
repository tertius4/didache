import { describe, expect, it } from 'vitest';
import type { Exercise } from '#lib/content/types.ts';
import { LessonSession } from './engine.svelte.ts';

const verse = { ref: 'Genesis 6:8', text: '…' };
const exercises: Exercise[] = [
	{ id: 'q1', type: 'truefalse', statement: 's1', answer: true, verse },
	{ id: 'q2', type: 'truefalse', statement: 's2', answer: false, verse },
	{ id: 'q3', type: 'mc', prompt: '?', options: ['a', 'b'], answer: 'a', verse }
];

describe('LessonSession', () => {
	it('finishes after all exercises are answered correctly', () => {
		const s = new LessonSession(exercises);
		s.submit(true);
		s.next();
		s.submit(false);
		s.next();
		expect(s.done).toBe(false);
		s.submit('a');
		s.next();
		expect(s.done).toBe(true);
		expect(s.accuracy).toBe(1);
		expect(s.progress).toBe(1);
	});

	it('re-queues wrong answers until they are answered correctly', () => {
		const s = new LessonSession(exercises);
		expect(s.submit(false)).toEqual({ correct: false, attempt: 1 });
		expect(s.status).toBe('wrong');
		expect(s.isRetry).toBe(false);
		s.next();
		s.submit(false);
		s.next();
		s.submit('a');
		s.next();

		expect(s.done).toBe(false);
		expect(s.current?.id).toBe('q1');
		expect(s.isRetry).toBe(true);
		expect(s.submit(true)).toEqual({ correct: true, attempt: 2 });
		s.next();

		expect(s.done).toBe(true);
		expect(s.solved).toBe(3);
		expect(s.accuracy).toBeCloseTo(2 / 3);
	});

	it('only counts progress for solved exercises', () => {
		const s = new LessonSession(exercises);
		s.submit(false);
		expect(s.progress).toBe(0);
		s.next();
		s.submit(false);
		expect(s.progress).toBeCloseTo(1 / 3);
	});

	it('rejects a second submit before next()', () => {
		const s = new LessonSession(exercises);
		s.submit(true);
		expect(() => s.submit(true)).toThrow();
	});
});
