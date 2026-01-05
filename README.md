# 📅 Datepicker Component

A lightweight, accessible, and themable React date picker component designed for modern web apps. Built with TypeScript, Vite, and a composable hook-based model, this component is focused on clarity, testability, and easy integration.

## ✨ Features

- 📅 Small and focused UI component for selecting single dates
- ♿ Accessible keyboard support and screen-reader friendly
- 🧩 Composable hooks for input, popover, preview calendar, and selection logic
- 🎨 Easy to style via CSS Modules
- 🧪 Unit-tested utilities with Vitest

## 🚀 Quick Start

1. 📦 Install dependencies:

```bash
pnpm install
```

2. ▶️ Start the dev server (Vite):

```bash
pnpm dev
```

3. ✅ Run tests (Vitest):

```bash
pnpm test
```

(Adjust commands to match the scripts in `package.json`.)

## 👉 Usage

Import the component and use it in your React app:

```tsx
import React from 'react';
import DatePicker from './src/ui/date-picker/date-picker';

export default function Example() {
  return (
    <div>
      <h3>Pick a date</h3>
      <DatePicker />
    </div>
  );
}
```

Notes:

- 📁 The component is implemented under `src/ui/date-picker/date-picker.tsx`.
- 🔧 Low-level hooks live in `src/model/` (for example, `use-date-input.ts`, `use-select-date.ts`, `use-popover.ts`).

## 🗂️ Project Structure

- `src/ui/` — UI components and styles (CSS Modules)
  - 🔹 `date-picker/` — top-level `DatePicker` UI component
  - 🔹 `date-picker-input/`, `date-picker-calendar/` — subcomponents
- `src/model/` — hooks and state management for the picker
- `src/lib/` — shared utilities and tests (e.g., `date.ts`, `date.test.ts`)
- `src/stories/` — Storybook stories for interactive demos

## 🛠️ Development

- Keep components small and focused: UI in `src/ui`, logic in `src/model`.
- Use the existing CSS Modules patterns (see `*.module.css`) for styling.
- Add unit tests to `src/lib` (or alongside the component) using Vitest.

Suggested local workflow:

```bash
pnpm install
pnpm dev    # run local dev server
pnpm test   # run unit tests
```

## 🧪 Testing

- Utilities have example tests in `src/lib/date.test.ts`.
- Use `vitest` for unit tests and snapshots where applicable.

## 🤝 Contributing

- Open issues for bugs or feature requests.
- Prefer small, focused PRs that include tests and update stories or examples.
- Maintain consistent code style and TypeScript types.
