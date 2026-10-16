<script lang="ts">
	import type { IllustrationKey } from './keys';

	let { name, label = '' }: { name: IllustrationKey; label?: string } = $props();
</script>

<svg
	viewBox="0 0 240 160"
	role={label ? 'img' : 'presentation'}
	aria-label={label || undefined}
	aria-hidden={label ? undefined : 'true'}
>
	{#if name === 'world'}
		<rect width="240" height="160" rx="20" fill="#cfe9fb" />
		<g fill="#8a8fa3">
			<ellipse cx="70" cy="36" rx="34" ry="14" />
			<ellipse cx="96" cy="30" rx="26" ry="14" />
			<ellipse cx="170" cy="44" rx="30" ry="12" />
			<ellipse cx="190" cy="38" rx="20" ry="12" />
		</g>
		<path d="M0 116 Q60 88 120 112 T240 104 V160 H0Z" fill="#7fcf8a" />
		<path d="M0 132 Q70 116 140 134 T240 128 V160 H0Z" fill="#5cb96b" />
		<g>
			<rect x="52" y="96" width="24" height="18" fill="#f2c48d" />
			<path d="M48 98 L64 84 L80 98Z" fill="#c9673c" />
			<rect x="150" y="100" width="28" height="18" fill="#f2c48d" />
			<path d="M146 102 L164 88 L182 102Z" fill="#c9673c" />
			<rect x="104" y="108" width="20" height="14" fill="#f2c48d" />
			<path d="M100 110 L114 99 L128 110Z" fill="#c9673c" />
		</g>
	{:else if name === 'ark-build'}
		<rect width="240" height="160" rx="20" fill="#ffe9b8" />
		<circle cx="196" cy="34" r="18" fill="#ffc533" />
		<path d="M0 126 H240 V160 H0Z" fill="#9bd37e" />
		<path d="M36 82 H204 L186 126 H54Z" fill="#a8693c" />
		<g stroke="#7c4a26" stroke-width="3">
			<line x1="44" y1="96" x2="198" y2="96" />
			<line x1="50" y1="110" x2="192" y2="110" />
		</g>
		<g stroke="#c99a6b" stroke-width="4" stroke-linecap="round">
			<line x1="70" y1="82" x2="70" y2="40" />
			<line x1="170" y1="82" x2="170" y2="40" />
			<line x1="64" y1="48" x2="176" y2="48" />
		</g>
		<rect x="98" y="54" width="44" height="28" fill="#c98b56" />
		<g transform="translate(206 100) rotate(-30)">
			<rect x="-3" y="0" width="6" height="26" rx="2" fill="#7c4a26" />
			<rect x="-10" y="-6" width="20" height="9" rx="2" fill="#6f6878" />
		</g>
	{:else if name === 'ark'}
		<rect width="240" height="160" rx="20" fill="#cfe9fb" />
		<path d="M30 84 H210 L190 124 H50Z" fill="#a8693c" />
		<g stroke="#7c4a26" stroke-width="3">
			<line x1="38" y1="98" x2="202" y2="98" />
			<line x1="44" y1="112" x2="196" y2="112" />
		</g>
		<rect x="72" y="52" width="96" height="32" fill="#c98b56" />
		<path d="M64 54 L120 34 L176 54Z" fill="#7c4a26" />
		<rect x="110" y="62" width="20" height="22" rx="3" fill="#5b3418" />
		<rect x="82" y="62" width="14" height="10" rx="2" fill="#ffe9b8" />
		<rect x="144" y="62" width="14" height="10" rx="2" fill="#ffe9b8" />
		<path
			d="M0 120 Q20 112 40 120 T80 120 T120 120 T160 120 T200 120 T240 120 V160 H0Z"
			fill="#3aa6e8"
		/>
		<path
			d="M0 136 Q20 128 40 136 T80 136 T120 136 T160 136 T200 136 T240 136 V160 H0Z"
			fill="#2380bd"
		/>
	{:else if name === 'rain'}
		<rect width="240" height="160" rx="20" fill="#7d8aa3" />
		<g fill="#5c667c">
			<ellipse cx="60" cy="30" rx="44" ry="18" />
			<ellipse cx="130" cy="24" rx="50" ry="20" />
			<ellipse cx="196" cy="32" rx="40" ry="16" />
		</g>
		<g stroke="#cfe9fb" stroke-width="3" stroke-linecap="round" opacity="0.8">
			{#each [20, 44, 68, 92, 116, 140, 164, 188, 212] as x, i (x)}
				<line x1={x} y1={52 + (i % 2) * 10} x2={x - 8} y2={72 + (i % 2) * 10} />
				<line x1={x + 10} y1={86 + (i % 3) * 6} x2={x + 2} y2={104 + (i % 3) * 6} />
			{/each}
		</g>
		<path d="M84 104 H156 L148 122 H92Z" fill="#a8693c" />
		<rect x="102" y="90" width="36" height="14" fill="#c98b56" />
		<path
			d="M0 118 Q20 108 40 118 T80 118 T120 118 T160 118 T200 118 T240 118 V160 H0Z"
			fill="#2380bd"
		/>
		<path
			d="M0 136 Q20 126 40 136 T80 136 T120 136 T160 136 T200 136 T240 136 V160 H0Z"
			fill="#1b6596"
		/>
	{:else if name === 'mountain'}
		<rect width="240" height="160" rx="20" fill="#cfe9fb" />
		<circle cx="200" cy="34" r="16" fill="#ffc533" />
		<path d="M30 160 L120 50 L210 160Z" fill="#8c7a6b" />
		<path d="M104 70 L120 50 L136 70 L128 66 L120 74 L112 66Z" fill="#ffffff" />
		<path d="M92 82 H148 L142 96 H98Z" fill="#a8693c" />
		<rect x="106" y="72" width="28" height="10" fill="#c98b56" />
		<path d="M0 138 Q30 130 60 138 T120 138 T180 138 T240 138 V160 H0Z" fill="#3aa6e8" />
	{:else if name === 'dove'}
		<rect width="240" height="160" rx="20" fill="#cfe9fb" />
		<g fill="#ffffff">
			<ellipse cx="60" cy="130" rx="40" ry="12" />
			<ellipse cx="190" cy="124" rx="34" ry="10" />
		</g>
		<g transform="translate(120 80)">
			<path
				d="M-46 4 Q-10 -6 22 4 Q8 22 -26 18Z"
				fill="#ffffff"
				stroke="#d6cdbd"
				stroke-width="2"
			/>
			<path
				d="M-14 2 Q-40 -46 -2 -50 Q4 -20 6 2Z"
				fill="#f4f1ea"
				stroke="#d6cdbd"
				stroke-width="2"
			/>
			<circle cx="26" cy="-2" r="13" fill="#ffffff" stroke="#d6cdbd" stroke-width="2" />
			<circle cx="30" cy="-5" r="2.5" fill="#2b2633" />
			<path d="M38 -2 L50 2 L38 5Z" fill="#ffb347" />
			<path d="M-46 4 L-62 -4 L-58 12Z" fill="#ffffff" stroke="#d6cdbd" stroke-width="2" />
			<path d="M46 3 Q60 10 70 24" stroke="#6b8e23" stroke-width="3" fill="none" />
			<ellipse cx="58" cy="12" rx="8" ry="4" fill="#6b8e23" transform="rotate(35 58 12)" />
			<ellipse cx="68" cy="22" rx="8" ry="4" fill="#7fae2e" transform="rotate(60 68 22)" />
		</g>
	{:else if name === 'altar'}
		<rect width="240" height="160" rx="20" fill="#ffe9b8" />
		<path d="M0 132 H240 V160 H0Z" fill="#9bd37e" />
		<g fill="#b8ad9c" stroke="#8c7a6b" stroke-width="2">
			<rect x="80" y="110" width="40" height="22" rx="6" />
			<rect x="120" y="110" width="40" height="22" rx="6" />
			<rect x="90" y="90" width="30" height="20" rx="6" />
			<rect x="120" y="90" width="30" height="20" rx="6" />
		</g>
		<path
			d="M120 90 Q96 70 112 46 Q114 62 122 64 Q120 44 136 30 Q132 54 146 66 Q148 82 120 90Z"
			fill="#ff8a3d"
		/>
		<path
			d="M120 90 Q108 78 116 64 Q120 74 126 74 Q128 62 134 58 Q136 74 136 82 Q132 90 120 90Z"
			fill="#ffc533"
		/>
		<g stroke="#d6cdbd" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8">
			<path d="M124 26 Q114 16 124 6" />
		</g>
	{:else if name === 'rainbow'}
		<rect width="240" height="160" rx="20" fill="#cfe9fb" />
		<g fill="none" stroke-width="10">
			<path d="M30 140 A90 90 0 0 1 210 140" stroke="#ef5b5b" />
			<path d="M40 140 A80 80 0 0 1 200 140" stroke="#ff8a3d" />
			<path d="M50 140 A70 70 0 0 1 190 140" stroke="#ffc533" />
			<path d="M60 140 A60 60 0 0 1 180 140" stroke="#2fb36b" />
			<path d="M70 140 A50 50 0 0 1 170 140" stroke="#3aa6e8" />
			<path d="M80 140 A40 40 0 0 1 160 140" stroke="#8a63d2" />
		</g>
		<g fill="#ffffff">
			<ellipse cx="34" cy="132" rx="26" ry="12" />
			<ellipse cx="206" cy="132" rx="26" ry="12" />
		</g>
		<path d="M0 140 Q60 128 120 140 T240 136 V160 H0Z" fill="#7fcf8a" />
	{:else if name === 'vineyard'}
		<rect width="240" height="160" rx="20" fill="#ffe9b8" />
		<path d="M0 134 H240 V160 H0Z" fill="#9bd37e" />
		<path
			d="M120 20 Q118 36 124 46"
			stroke="#7c4a26"
			stroke-width="5"
			fill="none"
			stroke-linecap="round"
		/>
		<path d="M124 34 Q150 14 168 32 Q148 40 124 34Z" fill="#5cb96b" />
		<g fill="#8a63d2">
			{#each [[110, 56], [126, 56], [142, 56], [102, 72], [118, 72], [134, 72], [150, 72], [110, 88], [126, 88], [142, 88], [118, 104], [134, 104], [126, 120]] as [cx, cy] (`${cx}-${cy}`)}
				<circle {cx} {cy} r="10" />
			{/each}
		</g>
		<g fill="#ffffff" opacity="0.35">
			<circle cx="106" cy="52" r="3" />
			<circle cx="122" cy="68" r="3" />
			<circle cx="138" cy="84" r="3" />
		</g>
	{:else if name === 'cloak'}
		<rect width="240" height="160" rx="20" fill="#f4e6ff" />
		<path d="M70 30 Q120 46 170 30 L196 132 Q120 146 44 132Z" fill="#8a63d2" />
		<path d="M70 30 Q120 46 170 30 L176 52 Q120 66 64 52Z" fill="#6f4bb8" />
		<g stroke="#ffc533" stroke-width="4" fill="none">
			<path d="M50 120 Q120 134 190 120" />
		</g>
	{:else if name === 'scroll'}
		<rect width="240" height="160" rx="20" fill="#e3f3fd" />
		<rect
			x="58"
			y="30"
			width="124"
			height="100"
			rx="6"
			fill="#fff6dc"
			stroke="#d6cdbd"
			stroke-width="2"
		/>
		<rect x="48" y="22" width="16" height="116" rx="8" fill="#c98b56" />
		<rect x="176" y="22" width="16" height="116" rx="8" fill="#c98b56" />
		<g stroke="#b8ad9c" stroke-width="4" stroke-linecap="round">
			<line x1="78" y1="54" x2="162" y2="54" />
			<line x1="78" y1="70" x2="150" y2="70" />
			<line x1="78" y1="86" x2="162" y2="86" />
			<line x1="78" y1="102" x2="138" y2="102" />
		</g>
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
