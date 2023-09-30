<script>
	import 'core-js/stable';
	import 'regenerator-runtime';
	import '../app.css';
	import '@fontsource-variable/montserrat';
</script>

<svelte:head>
	<title>WordNet (HYH!)</title>
</svelte:head>

<div class="main">
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(*) {
		font-family: 'Montserrat Variable', sans-serif;
		@apply m-0 box-border break-words p-0;
	}
	.main {
		@apply h-screen w-full;
	}
</style>
