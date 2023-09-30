<script>
	import 'core-js/stable';
	import 'regenerator-runtime';
	import '../app.css';
	import '@fontsource-variable/montserrat';
</script>

<div class="main">
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(*) {
		font-family: 'Montserrat Variable', sans-serif;
		@apply m-0 box-border break-words p-0 text-base;
	}
	.main {
		@apply h-screen w-full;
	}
	.content {
		@apply pl-2 pr-4;
	}
</style>
