<script lang="ts">
	import { todos, filteredTodos, filter, stats, type FilterType } from '$lib/stores/todos';
	import TodoItem from '$lib/components/TodoItem.svelte';
	import { fade, fly } from 'svelte/transition';

	let newTodoText = $state('');

	function addTodo() {
		if (newTodoText.trim()) {
			todos.add(newTodoText.trim());
			newTodoText = '';
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			addTodo();
		}
	}

	function setFilter(newFilter: FilterType) {
		filter.set(newFilter);
	}

	$effect(() => {
		// Update document title with active todo count
		const activeCount = $stats.active;
		document.title = activeCount ? `(${activeCount}) Todo App` : 'Todo App';
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
	<div class="container mx-auto px-4 py-12 max-w-2xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
				Todo App
			</h1>
			<p class="text-gray-500 dark:text-gray-400">Simple, elegant, and locally persistent</p>
		</header>

		<!-- Main Todo Card -->
		<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
			<!-- Input Section -->
			<div class="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700">
				<div class="flex gap-2">
					{#if $todos.length > 0}
						<button
							onclick={() => todos.toggleAll()}
							class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
							aria-label="Toggle all todos"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</button>
					{/if}
					<input
						type="text"
						bind:value={newTodoText}
						onkeydown={handleKeydown}
						placeholder="What needs to be done?"
						class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-purple-400/50 placeholder-gray-400 dark:placeholder-gray-400 transition-colors duration-200"
					/>
					<button
						onclick={addTodo}
						disabled={!newTodoText.trim()}
						class="px-6 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Add
					</button>
				</div>
			</div>

			<!-- Todo List -->
			{#if $todos.length > 0}
				<ul class="divide-y divide-gray-100 max-h-96 overflow-y-auto">
					{#each $filteredTodos as todo (todo.id)}
						<TodoItem {todo} />
					{/each}
				</ul>

				<!-- Footer -->
				<div
					class="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-between text-sm transition-colors duration-300"
					transition:fade
				>
					<!-- Item count -->
					<span class="text-gray-600 dark:text-gray-400">
						{$stats.active} {$stats.active === 1 ? 'item' : 'items'} left
					</span>

					<!-- Filters -->
					<div class="flex gap-1">
						{#each ['all', 'active', 'completed'] as filterType}
							<button
								onclick={() => setFilter(filterType as FilterType)}
								class="px-3 py-1 rounded transition-colors {$filter === filterType
									? 'bg-indigo-500 dark:bg-purple-600 text-white'
									: 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}"
							>
								{filterType.charAt(0).toUpperCase() + filterType.slice(1)}
							</button>
						{/each}
					</div>

					<!-- Clear completed -->
					{#if $stats.completed > 0}
						<button
							onclick={() => todos.clearCompleted()}
							class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
							transition:fade
						>
							Clear completed
						</button>
					{:else}
						<div class="w-24"></div>
					{/if}
				</div>
			{:else}
				<!-- Empty state -->
				<div class="px-6 py-16 text-center">
					<svg
						class="w-20 h-20 mx-auto mb-4 text-gray-300 dark:text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
					<p class="text-gray-500 dark:text-gray-400">No todos yet. Add one above to get started!</p>
				</div>
			{/if}
		</div>

		<!-- Instructions -->
		<div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
			<p>Click on a todo to edit it</p>
			<p>Your todos are automatically saved locally</p>
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for todo list */
	ul::-webkit-scrollbar {
		width: 6px;
	}

	ul::-webkit-scrollbar-track {
		background: #f3f4f6;
	}

	:global(.dark) ul::-webkit-scrollbar-track {
		background: #1f2937;
	}

	ul::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 3px;
	}

	:global(.dark) ul::-webkit-scrollbar-thumb {
		background: #4b5563;
	}

	ul::-webkit-scrollbar-thumb:hover {
		background: #9ca3af;
	}

	:global(.dark) ul::-webkit-scrollbar-thumb:hover {
		background: #6b7280;
	}
</style>