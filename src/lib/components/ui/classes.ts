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
 * A full-width answer tile. Selected = primary outline; results = success / error tint.
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
			? 'border-success bg-success-soft ring-1 ring-success'
			: wrong
				? 'border-error bg-error-soft ring-1 ring-error'
				: selected
					? 'border-primary bg-primary-soft ring-1 ring-primary'
					: paired
						? 'border-(--pair) bg-[color-mix(in_srgb,var(--pair)_14%,var(--color-card))] ring-1 ring-(--pair)'
						: 'border-border-strong bg-card enabled:hover:bg-card-hover'
	];
}

/** A round, outlined icon link in a page header (feedback, about). */
export const iconLink =
	'grid size-10 place-items-center rounded-full border border-border-strong text-foreground-muted no-underline transition-colors hover:bg-card-hover hover:text-foreground';

/** A word/phrase chip in a word bank; `used` leaves an empty gap where it was. */
export function chip(used = false) {
	return [
		'cursor-pointer rounded-md border px-3.5 py-2.5 font-medium disabled:cursor-default',
		used
			? 'border-transparent bg-surface-sunken text-transparent'
			: 'border-border-strong bg-card enabled:hover:bg-card-hover'
	];
}
