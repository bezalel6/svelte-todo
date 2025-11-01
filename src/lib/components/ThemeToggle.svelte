<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { scale, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { get } from 'svelte/store';

	let currentTheme = $state<'light' | 'dark'>('light');

	// Subscribe to theme store changes
	$effect(() => {
		const unsubscribe = theme.subscribe(value => {
			currentTheme = value;
		});

		// Set initial value
		currentTheme = get(theme);

		return unsubscribe;
	});

	function handleToggle() {
		theme.toggle();
	}
</script>

<button
	onclick={handleToggle}
	class="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group overflow-hidden"
	aria-label="Toggle theme"
>
	<!-- Background animation -->
	<div class="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-300 dark:from-blue-900 dark:to-purple-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

	<!-- Sun icon -->
	{#if currentTheme === 'light'}
		<div
			class="absolute inset-0 flex items-center justify-center"
			in:scale={{ duration: 300, easing: cubicInOut }}
			out:fade={{ duration: 150 }}
		>
			<svg
				class="w-8 h-8 text-yellow-500"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
					clip-rule="evenodd"
				/>
			</svg>
			<!-- Sun rays animation -->
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-16 h-16 rounded-full animate-ping bg-yellow-400 opacity-20"></div>
			</div>
		</div>
	{:else}
		<div
			class="absolute inset-0 flex items-center justify-center"
			in:scale={{ duration: 300, easing: cubicInOut }}
			out:fade={{ duration: 150 }}
		>
			<svg
				class="w-7 h-7 text-purple-400 animate-pulse"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
			</svg>
			<!-- Stars around moon -->
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div class="relative w-full h-full">
					<div class="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
					<div class="absolute top-3 right-3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-200"></div>
					<div class="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-400"></div>
					<div class="absolute bottom-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-600"></div>
				</div>
			</div>
		</div>
	{/if}
</button>

<style>
	@keyframes twinkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	:global(.animate-twinkle) {
		animation: twinkle 2s ease-in-out infinite;
	}

	:global(.animation-delay-200) {
		animation-delay: 200ms;
	}

	:global(.animation-delay-400) {
		animation-delay: 400ms;
	}

	:global(.animation-delay-600) {
		animation-delay: 600ms;
	}
</style>