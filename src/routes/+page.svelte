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
		@apply h-[20vh] w-full;
	}
	.info {
		@apply flex h-[80vh] flex-row;
	}
	.list {
		@apply h-full w-[30%] overflow-hidden;
	}
	.word {
		@apply h-full w-[70%] overflow-y-scroll;
	}
</style>
