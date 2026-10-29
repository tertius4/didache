/**
 * Shared Tailwind class lists for answer controls, so every exercise marks
 * selection and results the same way. Svelte's `class` accepts these arrays.
 */

export interface TileState {
	selected?: boolean;
	correct?: boolean;
	wrong?: boolean;
	/** Matched to a partner; colour comes from the `--pair` CSS variable. */
	paired?: boolean;
}

/**
 * A full-width answer tile. Selected = inked outline; results = olive / rubric tint.
 * Pass `layout` to change padding/alignment: conflicting utilities can't be overridden by appending.
 */
export function tile(
	{ selected, correct, wrong, paired }: TileState = {},
	layout = 'px-4 py-3.5 text-left'
) {
	return [
		'block w-full cursor-pointer rounded-lg border font-medium transition-colors disabled:cursor-default',
		layout,
		correct
			? 'border-olive bg-olive-soft ring-1 ring-olive'
			: wrong
				? 'border-rubric bg-rubric-soft ring-1 ring-rubric'
				: selected
					? 'border-ink bg-vellum-deep ring-1 ring-ink'
					: paired
						? 'border-(--pair) bg-[color-mix(in_srgb,var(--pair)_14%,var(--color-vellum))] ring-1 ring-(--pair)'
						: 'border-sepia/35 bg-vellum/60 enabled:hover:bg-vellum-deep/50'
	];
}

/** A word/phrase chip in a word bank; `used` leaves an empty gap where it was. */
export function chip(used = false) {
	return [
		'cursor-pointer rounded-md border px-3.5 py-2.5 font-medium disabled:cursor-default',
		used
			? 'border-transparent bg-vellum-deep text-transparent'
			: 'border-sepia/35 bg-vellum/60 enabled:hover:bg-vellum-deep/50'
	];
}
