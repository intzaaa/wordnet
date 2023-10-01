<script>
	import * as _ from 'lodash-es';
	import { input } from './store/input';
	import { current, history } from './store/current';
	let id = NaN;
	let level = 0;
	$: length = $history.length - 1;
	const move = {
		back: function () {
			console.log('back!', length - level, $history);
			if (length - level >= 1 && level >= 0) {
				level = level + 1;
				input.set($history[length - level]);
			}
		},
		forward: function () {
			console.log('forward!', length - level, $history);
			if (length >= level && level >= 1) {
				level = level - 1;
				input.set($history[length - level]);
			}
		}
	};
	current.subscribe(() => (level = 0));
	let value = '';
	input.subscribe((i) => (value = i));
</script>

<div class="main">
	<input
		bind:value
		type="text"
		placeholder="Search here..."
		on:keyup={(e) => {
			if (id) {
				clearTimeout(id);
			}
			id = setTimeout(() => {
				if ($input.toLowerCase() !== e.target.value.toLowerCase() && e.target.value.length > 1) {
					input.set(e.target.value);
				}
			}, 1000);
		}}
		on:change={(e) => {
			setTimeout(() => {
				if ($input.toLowerCase() !== e.target.value.toLowerCase() && e.target.value.length > 1) {
					input.set(e.target.value);
				}
			}, 100);
		}}
	/>
	<div class="ctrl">
		<div
			class="del"
			role="button"
			tabindex="0"
			on:click={() => input.set('')}
			on:keypress={() => input.set('')}
			style={`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z'%3E%3C/path%3E%3C/svg%3E");`}
		/>
		<div
			class="back"
			role="button"
			tabindex="0"
			class:opac={!(length - level >= 1 && level >= 0)}
			on:click={move.back}
			on:keypress={move.back}
			style={`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z'%3E%3C/path%3E%3C/svg%3E");`}
		/>
		<div
			class="forward"
			role="button"
			tabindex="0"
			class:opac={!(length >= level && level >= 1)}
			on:click={move.forward}
			on:keypress={move.forward}
			style={`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z'%3E%3C/path%3E%3C/svg%3E");`}
		/>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply flex h-full w-full flex-row;
	}
	input {
		width: calc(100% - 60vh);
		@apply block h-full border-none bg-transparent text-8xl font-bold
			outline-none;
	}
	div {
		@apply h-full;
	}
	.ctrl {
		@apply w-[60vh] cursor-pointer columns-3 gap-0 bg-transparent;
	}
	.ctrl > div {
		@apply h-full w-full opacity-50;
	}
	.opac {
		opacity: 25% !important;
	}
</style>
