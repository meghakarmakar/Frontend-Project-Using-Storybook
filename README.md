📖 Assignment – Frontend Components

This project implements two reusable, accessible, and well-documented UI components using React, TypeScript, TailwindCSS, and Storybook:

InputField – a flexible text input with multiple variants, states, and interactive features.

DataTable – a responsive table with sorting, row selection, loading, and empty states.

Both components are designed to be accessible (a11y), responsive (mobile + dark mode), and follow best practices for reusability and maintainability.

🚀 Tech Stack

React 18

TypeScript

TailwindCSS

Storybook – for component documentation and preview

Vitest + Testing Library – for unit tests

Vite – for fast development & build

📂 Folder Structure
src/
  components/
    input-field/
      InputField.tsx
      InputField.stories.tsx
      InputField.test.tsx
      index.ts
    data-table/
      DataTable.tsx
      DataTable.stories.tsx
      DataTable.test.tsx
      index.ts
    index.ts        # Barrel export
  icons/
    Spinner.tsx
  lib/
    cva.ts
  App.tsx
  main.tsx
  index.css
test/
  setup.ts          # Vitest + RTL setup

🛠️ Setup & Commands

Clone the repository:

``` bash 
git clone https://github.com/meghakarmakar/Frontend-Project-Using-Storybook.git
cd assignment
npm install
```


Run locally:

# Dev server (Vite)
``` bash
npm run dev
```

# Storybook (component docs)
npm run storybook

# Run tests
``` bash 
npm run test       # watch mode
npm run test:run
```
  # single run

# Production builds
npm run build             # build app
npm run build-storybook   # build Storybook docs


Preview production build:

``` bash 
npm run preview
```
# serves dist/ at http://localhost:4173

🧩 Components
🔹 InputField

Props:

label, placeholder, helperText, error

variant: filled | outlined | ghost

size: sm | md | lg

disabled, loading, clearable, type="password" (toggle visibility)

Features:

Clear button ✖

Password toggle 👁️

Loading spinner ⏳

Accessible labels, error messages, focus ring

Dark mode + responsive

🔹 DataTable

Props:

columns: with optional sortable: true

data: array of rows

selectable: enables row checkboxes

loading, emptyMessage

Features:

Sorting (ascending/descending)

Row selection (single, multi, select-all)

Loading spinner row

Empty state fallback

Responsive & accessible

📖 Storybook Docs

Each component includes:

✅ Usage examples (variants, sizes, states)

✅ Props table (autodocs)

✅ Accessibility notes (labels, roles, focus states)

✅ Theming & responsiveness (light/dark, sm/md/lg)

✅ Best practices & do/don’t

📍 Live Storybook Preview: View Here

🧪 Testing

Unit tests cover:

Rendering with props

States: loading, disabled, error, empty

Interactions: typing, clearing, toggling password, sorting, selecting rows

Accessibility: labels, roles, aria attributes

Run tests:

``` bash 
npm run test
```


Example passing output:

✓ InputField.test.tsx (7 tests | 7 passed)
✓ DataTable.test.tsx (6 tests | 6 passed)

Test Files  2 passed (2)
Tests       13 passed (13)



InputField states (default, error, disabled, loading)

Password toggle & clear button

DataTable sorting, row selection, empty, loading

📦 Deployment

Storybook deployed to Chromatic or Vercel.

App built with:

``` bash 
npm run build
```


→ outputs to /dist.

✅ Submission Checklist

 InputField component with required states & features

 DataTable component with sorting, selection, loading, empty state

 Storybook stories (docs, states, a11y, theming, usage)

 Unit tests (Vitest + Testing Library)

 Clean folder structure + barrel exports

 GitHub repo with README + code

 Storybook deployed link

