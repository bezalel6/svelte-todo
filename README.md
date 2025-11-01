# Svelte Todo App

A simple, elegant, and locally persistent todo list application built with SvelteKit, TypeScript, and Tailwind CSS.

## Features

- ✨ **Create, Read, Update, Delete (CRUD)** - Full todo management functionality
- 💾 **Local Persistence** - Todos are automatically saved to localStorage
- 🎨 **Elegant Design** - Beautiful UI with Tailwind CSS
- 📱 **Responsive** - Works perfectly on mobile and desktop
- ⚡ **Fast & Lightweight** - Built with SvelteKit for optimal performance
- 🔄 **Real-time Updates** - Instant UI updates with Svelte stores
- 🎯 **Filtering** - View all, active, or completed todos
- 📊 **Statistics** - Track active and completed todo counts
- ✏️ **Inline Editing** - Double-click to edit todos
- 🗑️ **Bulk Actions** - Toggle all and clear completed functions

## Tech Stack

- **SvelteKit** - Full-stack framework for building web applications
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Lightning-fast build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd svelte-todo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking
- `npm run check:watch` - Run type checking in watch mode

## Usage

1. **Add a todo**: Type in the input field and press Enter or click the Add button
2. **Complete a todo**: Click the checkbox to mark it as completed
3. **Edit a todo**: Click on the todo text to edit inline
4. **Delete a todo**: Hover over a todo and click the X button
5. **Filter todos**: Use the filter buttons (All, Active, Completed) at the bottom
6. **Toggle all**: Click the checkmark button next to the input to toggle all todos
7. **Clear completed**: Click "Clear completed" to remove all completed todos

## Features in Detail

### Local Storage Persistence
Your todos are automatically saved to the browser's local storage, ensuring they persist even after closing the browser.

### Keyboard Shortcuts
- **Enter** - Add new todo or save edited todo
- **Escape** - Cancel editing

### Responsive Design
The app is fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

## Project Structure

```
svelte-todo/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte    # Root layout with Tailwind CSS import
│   │   └── +page.svelte       # Main todo app page
│   ├── lib/
│   │   ├── stores/
│   │   │   └── todos.ts       # Todo store with localStorage
│   │   └── components/
│   │       └── TodoItem.svelte # Individual todo item component
│   └── app.css                # Tailwind CSS imports
├── static/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT