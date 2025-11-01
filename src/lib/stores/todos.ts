import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	createdAt: Date;
}

// Load todos from localStorage
function loadTodos(): Todo[] {
	if (!browser) return [];
	const stored = localStorage.getItem('todos');
	if (!stored) return [];

	try {
		const parsed = JSON.parse(stored);
		// Convert date strings back to Date objects
		return parsed.map((todo: any) => ({
			...todo,
			createdAt: new Date(todo.createdAt)
		}));
	} catch {
		return [];
	}
}

// Create the store with localStorage persistence
function createTodoStore() {
	const { subscribe, set, update } = writable<Todo[]>(loadTodos());

	return {
		subscribe,

		add: (text: string) => {
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				text,
				completed: false,
				createdAt: new Date()
			};

			update(todos => {
				const updated = [...todos, newTodo];
				if (browser) {
					localStorage.setItem('todos', JSON.stringify(updated));
				}
				return updated;
			});
		},

		remove: (id: string) => {
			update(todos => {
				const updated = todos.filter(t => t.id !== id);
				if (browser) {
					localStorage.setItem('todos', JSON.stringify(updated));
				}
				return updated;
			});
		},

		toggle: (id: string) => {
			update(todos => {
				const updated = todos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo
				);
				if (browser) {
					localStorage.setItem('todos', JSON.stringify(updated));
				}
				return updated;
			});
		},

		edit: (id: string, text: string) => {
			update(todos => {
				const updated = todos.map(todo =>
					todo.id === id ? { ...todo, text } : todo
				);
				if (browser) {
					localStorage.setItem('todos', JSON.stringify(updated));
				}
				return updated;
			});
		},

		clearCompleted: () => {
			update(todos => {
				const updated = todos.filter(t => !t.completed);
				if (browser) {
					localStorage.setItem('todos', JSON.stringify(updated));
				}
				return updated;
			});
		},

		toggleAll: () => {
			update(todos => {
				const allCompleted = todos.every(t => t.completed);
				const updated = todos.map(todo => ({ ...todo, completed: !allCompleted }));
				if (browser) {
					localStorage.setItem('todos', JSON.stringify(updated));
				}
				return updated;
			});
		}
	};
}

export const todos = createTodoStore();

// Derived stores for filtering
import { derived } from 'svelte/store';

export type FilterType = 'all' | 'active' | 'completed';
export const filter = writable<FilterType>('all');

export const filteredTodos = derived(
	[todos, filter],
	([$todos, $filter]) => {
		switch ($filter) {
			case 'active':
				return $todos.filter(t => !t.completed);
			case 'completed':
				return $todos.filter(t => t.completed);
			default:
				return $todos;
		}
	}
);

export const stats = derived(todos, $todos => ({
	total: $todos.length,
	active: $todos.filter(t => !t.completed).length,
	completed: $todos.filter(t => t.completed).length
}));