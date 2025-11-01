<script lang="ts">
	import type { Todo } from '$lib/stores/todos';
	import { todos } from '$lib/stores/todos';
	import { fade, slide } from 'svelte/transition';

	let { todo }: { todo: Todo } = $props();
	let editing = $state(false);
	let editText = $state(todo.text);

	function handleToggle() {
		todos.toggle(todo.id);
	}

	function handleRemove() {
		todos.remove(todo.id);
	}

	function startEdit() {
		editing = true;
		editText = todo.text;
	}

	function saveEdit() {
		if (editText.trim()) {
			todos.edit(todo.id, editText.trim());
			editing = false;
		}
	}

	function cancelEdit() {
		editing = false;
		editText = todo.text;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			saveEdit();
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
	}
</script>

<li
	transition:slide={{ duration: 200 }}
	class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
>
	{#if !editing}
		<button
			onclick={handleToggle}
			class="flex-shrink-0 w-5 h-5 rounded border-2 transition-all {todo.completed
				? 'bg-indigo-500 dark:bg-purple-600 border-indigo-500 dark:border-purple-600'
				: 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-purple-500'}"
			aria-label="Toggle todo"
		>
			{#if todo.completed}
				<svg
					class="w-full h-full text-white"
					viewBox="0 0 20 20"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
				>
					<path d="M5 10l3 3 7-7" />
				</svg>
			{/if}
		</button>

		<button
			onclick={startEdit}
			class="flex-1 text-left {todo.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-200'}"
		>
			{todo.text}
		</button>

		<button
			onclick={handleRemove}
			class="opacity-0 group-hover:opacity-100 text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all p-1"
			aria-label="Delete todo"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	{:else}
		<input
			type="text"
			bind:value={editText}
			onkeydown={handleKeydown}
			onblur={saveEdit}
			class="flex-1 px-3 py-1 border border-indigo-400 dark:border-purple-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500"
			autofocus
		/>
	{/if}
</li>