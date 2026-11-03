<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'success' | 'ghost' | 'quiet' | 'overlay';

	/** Rendered as a link when `href` is set. Everything inside the button comes from `children`. */
	interface LinkProps extends HTMLAnchorAttributes {
		href: string;
		variant?: Variant;
		children: Snippet;
	}

	interface ButtonProps extends HTMLButtonAttributes {
		href?: undefined;
		variant?: Variant;
		children: Snippet;
	}

	type Props = LinkProps | ButtonProps;

	// `class` is taken out of `rest` so it adds to the classes below instead of replacing them.
	const { variant = 'primary', children, class: className, ...rest }: Props = $props();

	const variants: Record<Variant, string> = {
		primary: 'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active',
		success: 'bg-success text-on-success hover:bg-success-hover',
		ghost: 'border border-border-strong text-foreground hover:bg-card-hover',
		quiet: 'text-foreground-muted hover:text-foreground',
		/** For use on the dark video stage. */
		overlay:
			'border border-on-overlay/40 bg-overlay/30 text-on-overlay backdrop-blur-sm hover:bg-on-overlay/10'
	};

	const classes = $derived([
		'inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-semibold no-underline transition-colors',
		'disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-foreground-subtle',
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
