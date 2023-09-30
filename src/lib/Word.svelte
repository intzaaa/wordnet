<script>
	import * as _ from 'lodash-es';
	import { wordnet } from '$lib/load/wordnet';
	import { current } from './load/current';

	const search = {
		word: function (word) {
			return _.filter($wordnet.synset, (i) => {
				return i.word.includes(word);
			});
		},
		synset: function (synset) {
			return $wordnet.synset[synset];
		}
	};
</script>

<div class="main">
	<div>
		<h1>{$current}</h1>
		{#each search.word($current) as synset}
			<div class="synset">
				<div class="title">
					<b>{synset.pos}</b>: {synset.gloss} <span class="l">({synset.pos + synset.offset})</span>
				</div>
				<div class="other-word">
					{#if _.without(synset.word, $current).length > 0}
						{`> `}
						{#each _.without(synset.word, $current) as word}
							<div class="i">[{word.replaceAll('_', ' ')}]</div>
						{/each}
					{/if}
				</div>
				<div class="pointer">
					<details>
						<summary>View Pointers</summary>
						{#each synset.pointer as pointer}
							<div>
								<b>{pointer.symbol}</b>: {#each search.synset(pointer.synset).word as word}
									<div class="i">[{word.replaceAll('_', ' ')}]</div>
								{/each}<span class="l">({pointer.synset})</span>
							</div>
						{/each}
					</details>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	* {
	}
	.i {
		@apply inline;
	}
	.l {
		@apply text-xs opacity-25;
	}
	.main {
		@apply pl-2;
	}
	.other-word,
	.pointer,
	.synset {
		@apply pl-4;
	}
</style>
