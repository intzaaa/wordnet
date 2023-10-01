<script>
	import * as _ from 'lodash-es';
	import { input } from './store/input';
	import { current } from './store/current';
	import { search } from '$lib/tool/search';

	function splitSentence(sentence) {
		const iterator = new Intl.Segmenter('en', { granularity: 'word' });
		let result = [];
		Array.from(iterator.segment(sentence)).forEach((i) => {
			console.log(i);
			if (i.isWordLike) {
				result.push(`<span>${i.segment}</span>`);
			} else {
				result.push(i.segment);
			}
		});
		console.log(result);
		return result.join('');
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="main"
	on:dblclick={(e) => {
		const x = e.clientX;
		const y = e.clientY;
		const ele = document.elementFromPoint(x, y);
		console.log(e, ele, ele.dataset.ns);
		const value = ele.textContent;
		const blacklist = ['[', ']'];
		if (!(ele.dataset.ns === '' ? true : false) && !blacklist.includes(value)) input.set(value);
	}}
>
	<div>
		<div class="head" data-ns>{$current}</div>
		{#each search.word($current) as synset}
			<div class="synset">
				<div class="title" data-ns>
					<span class="pos" data-ns>{synset.pos}</span>: {@html splitSentence(synset.gloss)}
					<span class="l" data-ns>({synset.pos + synset.offset})</span>
				</div>
				<div class="words" data-ns="">
					{#if _.without(synset.word, $current).length > 0}
						{`> `}
						{#each _.without(synset.word, $current) as word}
							<div class="i"><ns>[</ns><span>{word.replaceAll('_', ' ')}</span><ns>]</ns></div>
						{/each}
					{/if}
				</div>
				<div class="pointer">
					<details>
						<summary data-ns><ns data-ns>View Pointers</ns></summary>
						{#each synset.pointer as pointer}
							<div>
								<b>{pointer.symbol}</b>:
								<span class="words"
									>{#each search.synset(pointer.synset).word as word}
										<div class="i">
											<ns>[</ns><span>{word.replaceAll('_', ' ')}</span><ns>]</ns>
										</div>
									{/each}</span
								><span class="l">({pointer.synset})</span>
							</div>
						{/each}
					</details>
				</div>
			</div>
		{/each}
	</div>
	<div>
		<p class="sign" data-ns>* Powered by WordNet (A Lexical Database for English). Made by HYH!</p>
	</div>
</div>

<style lang="postcss">
	* {
		@apply text-lg;
	}
	.i {
		@apply inline whitespace-nowrap;
	}
	.i > span {
		@apply select-all;
	}
	.l {
		@apply text-xs opacity-25;
	}
	.head {
		@apply text-2xl font-medium;
	}
	.pos {
		@apply text-xl font-medium;
	}
	ns {
		@apply select-none;
	}
	.head,
	.pointer,
	.synset {
		@apply pl-4;
	}
	.sign {
		@apply w-full text-right;
	}
</style>
