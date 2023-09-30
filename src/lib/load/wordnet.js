import { readable } from 'svelte/store';

async function get() {
	const res = await fetch('/wordnet.json.gz');
	if (res.ok) {
		return readable(await res.json());
	} else {
		return readable(false);
	}
}

export const wordnet = await get();
