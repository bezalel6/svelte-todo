<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<!-- Theme toggle button -->
<div class="fixed top-4 right-4 z-50">
	<ThemeToggle />
</div>

{@render children()}
