<script lang="ts">
	import TokenValue from './TokenValue.svelte';

	let {
		names,
		kind
	}: {
		names: string[];
		kind: 'color' | 'space' | 'font' | 'size' | 'shadow' | 'radius' | 'line' | 'text';
	} = $props();
</script>

<ul class="list">
	{#each names as name (name)}
		<li>
			<div
				class="sample"
				class:color={kind === 'color'}
				class:space={kind === 'space'}
				class:shadow={kind === 'shadow'}
				class:line={kind === 'line'}
				style:background={kind === 'color' ? `var(${name})` : undefined}
				style:width={kind === 'space' ? `var(${name})` : undefined}
				style:height={kind === 'space' ? `var(${name})` : undefined}
				style:box-shadow={kind === 'shadow' ? `var(${name})` : undefined}
				style:border-radius={kind === 'radius' ? `var(${name})` : undefined}
				style:border-width={kind === 'line' ? `var(${name})` : undefined}
				style:font-family={kind === 'font' ? `var(${name})` : undefined}
				style:font-size={kind === 'size' ? `var(${name})` : undefined}
				style:font-weight={kind === 'text' && name.includes('font-weight') ? `var(${name})` : undefined}
				style:line-height={kind === 'text' && name.includes('line-height') ? `var(${name})` : undefined}
				style:letter-spacing={kind === 'text' && name.includes('letter-spacing') ? `var(${name})` : undefined}
			>
				{#if kind === 'font' || kind === 'size' || kind === 'text'}
					More gratitude
				{/if}
			</div>
			<div class="meta">
				<code>{name}</code>
				<TokenValue {name} />
			</div>
		</li>
	{/each}
</ul>

<style>
	.list {
		display: grid;
		gap: var(--mnb-space-md);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 12rem 1fr;
		gap: var(--mnb-space-md);
		align-items: center;
	}

	.sample {
		min-height: var(--mnb-space-xl);
		background: var(--mnb-color-offwhite);
		border: var(--mnb-border-width) solid var(--mnb-color-black);
	}

	.sample.color {
		min-height: var(--mnb-space-3xl);
	}

	.sample.space {
		min-height: var(--mnb-space-sm);
		background: var(--mnb-color-black);
		border: none;
	}

	.sample.shadow,
	.sample.line {
		min-height: var(--mnb-space-3xl);
	}

	.sample.line {
		border-style: solid;
		border-color: var(--mnb-color-black);
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--mnb-space-xs);
	}

	code {
		font-family: var(--mnb-font-primary);
		font-size: var(--mnb-font-size-sm);
	}
</style>
