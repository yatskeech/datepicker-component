# 📅 Datepicker Component

A lightweight, customizable, and accessible React date picker component for selecting a single date. Built with TypeScript and Vite, the project is organized into small hooks and UI components for easy integration and testability.

## ✨ Key features

- 🎯 Small focused UI for single-date selection
- ♿ Accessibility: keyboard navigation and screen reader support
- 🧭 Logic separated into hooks: input, popover, preview calendar, date selection
- 🎨 Styles via CSS Modules
- 🧪 Unit-tested utilities using Vitest

## 🚀 Quick start

1. ➕ Install dependencies:

```bash
pnpm install
```

2. 🧪 Run Storybook for local UI development (recommended):

```bash
pnpm storybook
```

3. 🛠️ Build the package (produces `dist`):

```bash
pnpm build
```

4. ✅ Run unit tests (Vitest):

```bash
pnpm unit:test
```

Additional useful scripts:

- 🔍 Storybook checks: `pnpm storybook:test`
- 🧹 Lint: `pnpm lint` (fix: `pnpm lint:fix`)
- 🧼 Format: `pnpm format` (fix: `pnpm format:fix`)

⚠️ Note: there is no `dev` script for a plain Vite dev server in `package.json`; use Storybook for interactive component development (`pnpm storybook`). The package build is handled by `pnpm build`.

## 👉 Usage

During development you can import the `DatePicker` component directly from the source. The component is exported as a named export, not a default export:

```tsx
import React from 'react';
import 'datepicker-component/index.css'; // 📦 optional shared styles from built package
import { DatePicker } from './src/ui/date-picker/date-picker';

export default function Example() {
  return (
    <DatePicker
      defaultDate={new Date()}
      onChange={(d) => console.log('selected', d)}
    />
  );
}
```

After building/publishing, the package exposes entry points from `dist` (see `main`, `module`, `types` in `package.json`). Import from the package root when consuming the built package.

## 🗂️ Project layout (key files)

- 📁 UI component: `src/ui/date-picker/date-picker.tsx`
- 🧠 Hooks: `src/model/use-date-input.ts`, `src/model/use-select-date.ts`
- 🧰 Utilities and tests: `src/lib/date.ts`, `src/lib/date.test.ts`
- 📚 Storybook stories: `stories/date-picker.stories.tsx`

## 🧪 Testing

- ✅ Unit tests: `pnpm unit:test` (Vitest)
- 🧪 Storybook test project: `pnpm storybook:test`

## 📦 Build & publish

- 🛠️ Build: `pnpm build` (runs `tsc -b` then `vite build`).
- 📦 Built artifacts go to `dist`; package exports are defined in `package.json` (`main`/`module`/`types`).
- 🔎 Verify `package.json` fields and version before publishing.

## ⚙️ Dependencies & requirements

- 🔗 Peer dependencies: React ^18 or ^19 (see `package.json`).
- ⚙️ Runtime dependencies: `@floating-ui/react`, `clsx`.
- 🧩 Dev dependencies include Storybook, Vitest, ESLint, Stylelint, Prettier, Playwright, TypeScript, Vite, and tooling used for CI and local development.

## 🛠️ Development notes

- 🧩 Keep UI in `src/ui` and logic in `src/model`.
- 🎨 Use CSS Modules for component styling (`*.module.css`).
- 🧪 Add unit tests for logic and Storybook stories for UI variations.

## 🤝 Contributing

- 🐛 Open issues for bugs or feature requests.
- ✨ Prefer small, focused PRs that include tests and update stories where applicable.
- 🔒 Husky is set up (`prepare` script) for local git hooks; use lint-staged to run checks before commits.
