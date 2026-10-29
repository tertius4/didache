<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'success' | 'ghost' | 'quiet';
	type Props = { variant?: Variant; children: Snippet } & (
		({ href: string } & HTMLAnchorAttributes) | ({ href?: undefined } & HTMLButtonAttributes)
	);

	let { variant = 'primary', children, class: className, ...rest }: Props = $props();

	const variants: Record<Variant, string> = {
		primary: 'bg-rubric text-vellum hover:bg-rubric/90',
		success: 'bg-olive text-vellum hover:bg-olive/90',
		ghost: 'border border-sepia/40 text-ink hover:bg-vellum-deep/60',
		quiet: 'text-sepia hover:text-ink'
	};

	const classes = $derived([
		'inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-semibold no-underline transition-colors',
		'disabled:cursor-not-allowed disabled:bg-vellum-deep disabled:text-sepia',
		variants[variant],
		className
	]);
</script>

{#if rest.href !== undefined}
	<a class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button type="button" class={classes} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
