import type { AnyAnswer, Exercise } from '#lib/content/types.ts';
import { checkAnswer } from './check';

export type Status = 'answering' | 'correct' | 'wrong';

/**
 * Runs one lesson's exercises. A wrong answer sends the exercise to the back of
 * the queue, so the lesson only finishes once every exercise is answered correctly.
 */
export class LessonSession {
	readonly total: number;
	queue = $state.raw<Exercise[]>([]);
	position = $state(0);
	status = $state<Status>('answering');
	solved = $state(0);
	firstTryCorrect = $state(0);
	#attempts: Record<string, number> = {};

	constructor(exercises: Exercise[]) {
		this.queue = [...exercises];
		this.total = exercises.length;
	}

	get current(): Exercise | undefined {
		return this.queue[this.position];
	}

	get done(): boolean {
		return this.position >= this.queue.length;
	}

	/** 0..1, counting only correctly solved exercises. */
	get progress(): number {
		return this.total === 0 ? 1 : this.solved / this.total;
	}

	/** Share of exercises answered correctly on the first try. */
	get accuracy(): number {
		return this.total === 0 ? 1 : this.firstTryCorrect / this.total;
	}

	/** True when the current exercise is a retry of an earlier mistake. */
	get isRetry(): boolean {
		const ex = this.current;
		if (!ex) return false;
		// While feedback is shown the current attempt has already been counted.
		const earlier = (this.#attempts[ex.id] ?? 0) - (this.status === 'answering' ? 0 : 1);
		return earlier > 0;
	}

	/** Checks the answer for the current exercise; returns whether it was correct. */
	submit(answer: AnyAnswer): { correct: boolean; attempt: number } {
		const ex = this.current;
		if (!ex || this.status !== 'answering') throw new Error('No exercise awaiting an answer');

		const attempt = (this.#attempts[ex.id] ?? 0) + 1;
		this.#attempts[ex.id] = attempt;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- answer shape is enforced by the exercise components
		const correct = checkAnswer(ex, answer as any);
		if (correct) {
			this.solved++;
			if (attempt === 1) this.firstTryCorrect++;
			this.status = 'correct';
		} else {
			this.queue = [...this.queue, ex];
			this.status = 'wrong';
		}
		return { correct, attempt };
	}

	/** Moves on after feedback has been shown. */
	next(): void {
		if (this.status === 'answering') return;
		this.position++;
		this.status = 'answering';
	}
}
