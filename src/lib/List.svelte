<script>
	import VirtualList from './VirtualList.svelte';
	import * as _ from 'lodash-es';
	import { wordnet } from './load/wordnet';
	import { input } from './load/input.js';
	import { current } from './load/current';
	let words = new Set();
	input.subscribe((v) => {
		words = new Set();
		_.each($wordnet.synset, (i) => {
			_.each(i.word, (i) => {
				if (i.toLowerCase().startsWith(v.replaceAll(' ', '_').toLowerCase())) {
					words.add(i);
				}
			});
		});
		console.log(words);
	});
</script>

<div class="main">
	<VirtualList
		items={Array.from(words)
			.map((i) => i.replaceAll('_', ' '))
			.toSorted()}
		itemHeight={24}
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
	</VirtualList>
</div>

<style lang="postcss">
	.main {
		@apply h-full w-full;
	}
	.item {
		@apply inline-block h-6;
	}
</style>
