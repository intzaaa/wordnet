import { wordnet } from '$lib/store/wordnet';
import * as _ from 'lodash-es';
let wn = {};
wordnet.subscribe((i) => {
	wn = i;
});

export const search = {
	word: function (word) {
		return _.filter(wn.synset, (i) => {
			return i.word.includes(word.replaceAll(' ', '_'));
		});
	},
	synset: function (synset) {
		return wn.synset[synset];
	}
};
