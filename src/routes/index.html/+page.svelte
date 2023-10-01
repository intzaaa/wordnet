<script>
	import Input from '$lib/Input.svelte';
	import List from '$lib/List.svelte';
	import Word from '$lib/Word.svelte';
</script>

<div class="main">
	<div class="input">
		<Input />
	</div>
	<div class="info">
		<div class="list">
			<List />
		</div>
		<div class="word">
			<Word />
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply flex h-full w-full flex-col;
	}
	.input {
		@apply h-[20vh] w-full bg-slate-200 pl-2 pr-2;
	}
	.info {
		@apply flex h-[80vh] flex-row;
	}
	.list {
		@apply h-full w-[30%] overflow-hidden bg-slate-100 pb-2 pl-2 pt-2;
	}
	.word {
		@apply h-full w-[70%] overflow-y-scroll bg-slate-50 pb-2 pr-2 pt-2;
	}
</style>
