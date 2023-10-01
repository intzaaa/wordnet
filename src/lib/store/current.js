import { writable } from 'svelte/store';
import * as _ from 'lodash-es';
export const current = writable('');

function createHistory() {
	const { subscribe, set, update } = writable([]);
	return {
		subscribe,
		add: (i) => {
			let value;
			update((i) => {
				value = i;
				return i;
			});
			value.push(i);
		}
	};
}

export const history = createHistory();

current.subscribe((i) => {
	if (i) {
		history.add(i);
	}
});
