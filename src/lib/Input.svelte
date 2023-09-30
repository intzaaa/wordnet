<script>
	import { input } from './load/input';
	let id = NaN;
</script>

<input
	on:keyup={(e) => {
		if (id) {
			clearTimeout(id);
		}
		id = setTimeout(() => {
			input.set(e.target.value);
		}, 100);
	}}
	on:change={(e) => {
		input.set(e.target.value);
	}}
/>

<style lang="postcss">
	input {
		@apply block h-full w-full border-none text-8xl outline-none;
	}
</style>
