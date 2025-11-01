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

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
	<div class="container mx-auto px-4 py-12 max-w-2xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
				Todo App
			</h1>
			<p class="text-gray-500">Simple, elegant, and locally persistent</p>
		</header>

		<!-- Main Todo Card -->
		<div class="bg-white rounded-2xl shadow-xl overflow-hidden">
			<!-- Input Section -->
			<div class="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
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
						class="flex-1 px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
					/>
					<button
						onclick={addTodo}
						disabled={!newTodoText.trim()}
						class="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
					class="px-6 py-4 bg-gray-50 flex items-center justify-between text-sm"
					transition:fade
				>
					<!-- Item count -->
					<span class="text-gray-600">
						{$stats.active} {$stats.active === 1 ? 'item' : 'items'} left
					</span>

					<!-- Filters -->
					<div class="flex gap-1">
						{#each ['all', 'active', 'completed'] as filterType}
							<button
								onclick={() => setFilter(filterType as FilterType)}
								class="px-3 py-1 rounded transition-colors {$filter === filterType
									? 'bg-indigo-500 text-white'
									: 'text-gray-600 hover:bg-gray-200'}"
							>
								{filterType.charAt(0).toUpperCase() + filterType.slice(1)}
							</button>
						{/each}
					</div>

					<!-- Clear completed -->
					{#if $stats.completed > 0}
						<button
							onclick={() => todos.clearCompleted()}
							class="text-gray-600 hover:text-red-600 transition-colors"
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
						class="w-20 h-20 mx-auto mb-4 text-gray-300"
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
					<p class="text-gray-500">No todos yet. Add one above to get started!</p>
				</div>
			{/if}
		</div>

		<!-- Instructions -->
		<div class="mt-8 text-center text-sm text-gray-500 space-y-1">
			<p>Double-click to edit a todo</p>
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

	ul::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 3px;
	}

	ul::-webkit-scrollbar-thumb:hover {
		background: #9ca3af;
	}
</style>