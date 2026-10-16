export const illustrationKeys = [
	'world',
	'ark-build',
	'ark',
	'rain',
	'mountain',
	'dove',
	'altar',
	'rainbow',
	'vineyard',
	'cloak',
	'scroll'
] as const;

export type IllustrationKey = (typeof illustrationKeys)[number];
