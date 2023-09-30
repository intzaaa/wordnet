import { readable } from 'svelte/store';

let wordnet = {},
	res = await fetch('/wordnet.json.gz');
if (res.ok) {
	wordnet = readable(await res.json());
} else {
	wordnet = readable(false);
}

export { wordnet };
