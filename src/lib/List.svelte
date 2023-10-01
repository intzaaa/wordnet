<script>
	import VirtualList from './VirtualList.svelte';
	import * as _ from 'lodash-es';
	import { wordnet } from './store/wordnet';
	import { input } from './store/input.js';
	import { current } from './store/current';
	import { search } from '$lib/tool/search';
	let words = new Set(),
		start,
		end;
	input.subscribe((v) => {
		words = new Set();
		if (v !== '') {
			_.each($wordnet.synset, (i) => {
				_.each(i.word, (i) => {
					if (i.toLowerCase().startsWith(v.replaceAll(' ', '_').toLowerCase())) {
						words.add(i);
					}
				});
			});
			console.log(words);
		}
	});
	async function info(name, timeout) {
		const pos = new Set(),
			words = new Set();
		await new Promise((r) => setTimeout(r, timeout));
		search.word(name).forEach((i) => {
			pos.add(i.pos);
			i.word.forEach((i) => {
				words.add(i);
			});
		});
		return {
			pos: Array.from(pos).join(', '),
			words:
				words.size >= 2
					? '<span style="white-space: nowrap">[' +
					  _.without(Array.from(words), name)
							.join(']</span><span style="white-space: nowrap">[')
							.replaceAll('_', ' ') +
					  ']</span>'
					: false
		};
	}
</script>

<div class="main">
	<VirtualList
		items={Array.from(words)
			.map((i) => i.replaceAll('_', ' '))
			.toSorted()}
		bind:start
		bind:end
		let:item
		let:index
	>
		<div
			id={index}
			class="item"
			role="button"
			tabindex="0"
			on:click={() => {
				current.set(item);
			}}
			on:keypress={(e) => {
				current.set(item);
			}}
		>
			<span class="word">{item}</span>
			{#await info(item, index - start) then info}
				<span class="pos">({info.pos})</span>
				<div class="words">
					{#if info.words}
						{`> `}{@html info.words}
					{/if}
				</div>
			{/await}
		</div>
	</VirtualList>
</div>

<style lang="postcss">
	.main {
		@apply h-full w-full;
	}
	.item {
		@apply inline-block h-[60px]  pb-1 pr-2 pt-1;
	}
	.word {
		@apply cursor-pointer;
	}
	.pos {
		@apply text-xs;
	}
	.words {
		@apply line-clamp-2 overflow-ellipsis pl-2 text-xs;
	}
</style>
