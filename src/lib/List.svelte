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
	async function listPos(name, timeout) {
		const list = new Set();
		await new Promise((r) => setTimeout(r, timeout));
		search.word(name).forEach((i) => {
			list.add(i.pos);
		});
		return Array.from(list).join(', ');
	}
</script>

<div class="main">
	<VirtualList
		items={words.size < 1000
			? Array.from(words)
					.map((i) => i.replaceAll('_', ' '))
					.toSorted()
			: []}
		itemHeight={24}
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
			on:click={(e) => {
				current.set(e.target.innerText);
			}}
			on:keypress={(e) => {
				current.set(e.target.innerText);
			}}
		>
			{item}
		</div>
		<span class="pos"
			>{#await listPos(item, index - start) then pos}
				({pos})
			{/await}</span
		>
	</VirtualList>
</div>

<style lang="postcss">
	.main {
		@apply h-full w-full;
	}
	.item {
		@apply inline-block h-6 cursor-pointer;
	}
	.pos {
		@apply text-xs;
	}
</style>
