## First: the big idea (lock this in 🧠)

### `apps/`

👉 **Runnable things**

* Frontend apps (Next.js, React, Vite)
* Backend apps (Express, Nest, Fastify)
* They **run**, **deploy**, **listen on ports**

### `packages/`

👉 **Non-runnable, shared things**

* Code
* Configs
* Design systems
* Utilities
* Tooling presets

They **do not run alone**.
They are **consumed by apps**.

---


# 1️⃣ `packages/eslint-config`

### What this is in real life

This is a **shared ESLint rulebook**.

Instead of repeating ESLint config in:

* `apps/web`
* `apps/backend`
* `packages/ui`

You define rules **once**, and everyone uses them.

---

### Files you have

* `base.js` → common JS/TS rules
* `react-internal.js` → React-specific rules
* `next.js` → Next.js rules

---

### How apps actually use it

In `apps/web/package.json`:

```json
{
  "devDependencies": {
    "@repo/eslint-config": "*"
  }
}
```

In `apps/web/eslint.config.mjs`:

```js
import config from "@repo/eslint-config/next";

export default config;
```

### Real-world meaning

> “All my projects follow the **same lint rules**, no arguments.”

This is **enterprise-grade consistency**.

---

# 2️⃣ `packages/typescript-config`

### What this is in real life

This is a **shared TypeScript brain** 🧠

Instead of copying `tsconfig.json` everywhere, you:

* centralize it
* extend it

---

### Files you have

* `base.json` → strict TS defaults
* `nextjs.json` → Next.js apps
* `react-library.json` → UI libraries

---

### How apps use it

In `apps/web/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

In `packages/ui/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

### Real-world meaning

> “All my projects compile with **the same standards**.”

No drift.
No random TS errors.
No chaos.

---

# 3️⃣ `packages/ui`

### This one is special ⭐

This is your **design system / component library**.

Buttons, inputs, modals, cards — all live here.

---

### Why this exists

Instead of:

* copying components
* re-styling every app
* fixing bugs in 5 places

You fix **once**, and all apps benefit.

---

### How apps use it

```tsx
import { Button } from "@repo/ui";
```

Turbo guarantees:

* `ui` builds first
* apps rebuild only when UI changes

### Real-world meaning

> “My apps share the same look, feel, and logic.”

This is how companies like:

* Vercel
* Stripe
* Airbnb
  structure their frontend systems.

---

# Why these are called **“default” packages**

Because **almost every serious monorepo needs them**:

| Package           | Purpose      |
| ----------------- | ------------ |
| eslint-config     | Code quality |
| typescript-config | Type safety  |
| ui                | Shared UI    |

They are **infrastructure**, not features.

---

# Now: what OTHER things can go into `packages/`?

Here are **real, production-grade examples** 👇

---

## 🧩 1. `packages/utils`

Shared helpers:

* date formatting
* validators
* API helpers
* constants

Used by:

* backend
* frontend
* jobs

---

## 🧩 2. `packages/db`

Database layer:

* Prisma client
* Drizzle schema
* migrations
* shared types

Used by:

* backend
* workers
* scripts

---

## 🧩 3. `packages/auth`

Auth logic:

* JWT helpers
* session handling
* OAuth utilities

Used by:

* web
* backend
* admin panel

---

## 🧩 4. `packages/config`

Runtime config:

* env validation
* feature flags
* app constants

---

## 🧩 5. `packages/api-contract`

Shared API types:

* request/response types
* Zod schemas
* OpenAPI helpers

Prevents:
❌ backend–frontend mismatch
✅ type-safe APIs

---

# Final mental model (this is gold 🥇)

### `apps/`

> “Things I **run and deploy**”

### `packages/`

> “Things I **reuse everywhere**”

If a folder:

* does NOT run on a port
* does NOT deploy alone
* is imported by others

➡️ it belongs in `packages/`
