import * as fzstd from 'fzstd';
import { readable } from 'svelte/store';

async function get() {
	const res = await fetch('/wordnet-json-zstd');
	if (res.ok) {
		return readable(
			await new Response(fzstd.decompress(new Uint8Array(await res.arrayBuffer()))).json()
		);
	} else {
		return readable(false);
	}
}

export const wordnet = await get();
