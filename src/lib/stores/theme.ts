import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	// Check for saved theme preference or default to 'light'
	const defaultTheme: Theme = 'light';
	const initialTheme: Theme = browser
		? (localStorage.getItem('theme') as Theme) ||
		  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		: defaultTheme;

	const { subscribe, set, update } = writable<Theme>(initialTheme);

	return {
		subscribe,
		toggle: () => {
			update(theme => {
				const newTheme = theme === 'light' ? 'dark' : 'light';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					// Update the HTML element class for Tailwind dark mode
					if (newTheme === 'dark') {
						document.documentElement.classList.add('dark');
					} else {
						document.documentElement.classList.remove('dark');
					}
				}
				return newTheme;
			});
		},
		init: () => {
			if (browser) {
				const savedTheme = localStorage.getItem('theme') as Theme;
				const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

				set(theme);

				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}

				// Listen for system theme changes
				window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
					if (!localStorage.getItem('theme')) {
						const newTheme = e.matches ? 'dark' : 'light';
						set(newTheme);
						if (newTheme === 'dark') {
							document.documentElement.classList.add('dark');
						} else {
							document.documentElement.classList.remove('dark');
						}
					}
				});
			}
		}
	};
}

export const theme = createThemeStore();