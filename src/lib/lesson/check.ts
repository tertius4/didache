import type { AnswerFor, Exercise } from '#lib/content/types.ts';

export function checkAnswer<E extends Exercise>(exercise: E, answer: AnswerFor<E>): boolean {
	const ex = exercise as Exercise;
	switch (ex.type) {
		case 'mc':
		case 'fill':
			return answer === ex.answer;
		case 'truefalse':
			return answer === ex.answer;
		case 'order': {
			const given = answer as string[];
			return given.length === ex.items.length && ex.items.every((item, i) => given[i] === item);
		}
		case 'match': {
			const given = answer as Record<string, string>;
			return (
				Object.keys(given).length === ex.pairs.length &&
				ex.pairs.every(([left, right]) => given[left] === right)
			);
		}
	}
}

/** Human-readable correct answer, shown after a wrong attempt. */
export function correctAnswerText(exercise: Exercise): string {
	switch (exercise.type) {
		case 'mc':
		case 'fill':
			return exercise.answer;
		case 'truefalse':
			return exercise.answer ? 'True' : 'False';
		case 'order':
			return exercise.items.map((item, i) => `${i + 1}. ${item}`).join('\n');
		case 'match':
			return exercise.pairs.map(([l, r]) => `${l} → ${r}`).join('\n');
	}
}

/** Fisher–Yates shuffle; never returns the original order for lists longer than one. */
export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
	if (items.length < 2) return [...items];
	let out: T[];
	do {
		out = [...items];
		for (let i = out.length - 1; i > 0; i--) {
			const j = Math.floor(random() * (i + 1));
			[out[i], out[j]] = [out[j], out[i]];
		}
	} while (new Set(items).size > 1 && out.every((item, i) => item === items[i]));
	return out;
}

/** Swaps the item at `index` with its neighbour; out-of-range moves return the list unchanged. */
export function move<T>(items: readonly T[], index: number, direction: -1 | 1): T[] {
	const target = index + direction;
	const out = [...items];
	if (index < 0 || index >= out.length || target < 0 || target >= out.length) return out;
	[out[index], out[target]] = [out[target], out[index]];
	return out;
}
