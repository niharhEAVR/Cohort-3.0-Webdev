# 1️⃣ Role of **root `package.json`** in a Turborepo

Think of the root as the **control room**, not a real app.

### What the root **IS**

* Workspace manager
* Task orchestrator
* Tooling holder

### What the root **IS NOT**

* ❌ An app
* ❌ A place for React / Next / backend deps
* ❌ A runtime package

Your file confirms this philosophy 👇

---

## 🔹 Root `package.json` — line by line

```json
{
  "name": "02_code",
  "private": true,
```

### ✅ `private: true`

Very important.

* Prevents accidental publishing
* Enforces monorepo safety
* Required for workspaces

---

```json
"scripts": {
  "build": "turbo run build",
  "dev": "turbo run dev",
  "lint": "turbo run lint",
  "format": "prettier --write \"**/*.{ts,tsx,md}\"",
  "check-types": "turbo run check-types"
}
```

### 🎯 Root scripts = **command dispatchers**

When you run:

```bash
npm run build
```

You are **NOT** building here.

Instead:

* Root → `turbo`
* Turbo → finds **all packages**
* Turbo → runs `build` **inside each package that defines it**

So:

```
root build
 └─ apps/web → build
 └─ apps/docs → build
 └─ packages/ui → build
```

The root **does not care how** they build — it only **coordinates**.

---

```json
"devDependencies": {
  "prettier": "^3.7.4",
  "turbo": "^2.8.3",
  "typescript": "5.9.2"
}
```

### ✅ Correct root-only dependencies

These are:

* Shared tools
* Used by **every package**
* Not shipped to production

**Rule**:

> If every project needs it → root
> If only one app needs it → that app

---

```json
"workspaces": [
  "apps/*",
  "packages/*"
]
```

### 🧠 This is what turns folders into a monorepo

This tells the package manager:

* `apps/web` → package
* `packages/ui` → package
* Auto-link them
* Allow `@repo/ui` imports
* Enable dependency graph

Without this → Turborepo is useless.

---

```json
"engines": {
  "node": ">=18"
}
```

### ✅ Enforces consistent Node version

Critical for:

* CI
* Team members
* Turborepo caching correctness

---

```json
"packageManager": "npm@11.7.0"
```

This locks:

* npm version
* Prevents pnpm/yarn mismatch bugs
* Improves reproducibility

---

# 2️⃣ Role of **`turbo.json`**

If `package.json` is the **control room**,
`turbo.json` is the **traffic rules** 🚦

It tells Turbo:

* What tasks exist
* How they depend on each other
* What can be cached
* What must always run

---

## 🔹 Top-level config

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
```

* Schema → autocomplete + validation
* `tui` → terminal UI (progress, cache hits, timing)

---

# 3️⃣ Understanding **tasks** (this is the heart)

```json
"tasks": {
```

Each task maps to **scripts inside packages**.

---

## 🧩 `build` task

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": ["$TURBO_DEFAULT$", ".env*"],
  "outputs": [".next/**", "!.next/cache/**"]
}
```

### 🔁 `dependsOn: ["^build"]`

This is HUGE.

It means:

> Before building this package, build **all its dependencies first**

Example:

```
packages/ui → build
apps/web → build
```

If `apps/web` depends on `@repo/ui`, Turbo does:

```
packages/ui build
↓
apps/web build
```

Automatically.
No manual ordering needed.

---

### 📥 `inputs`

```json
"inputs": ["$TURBO_DEFAULT$", ".env*"]
```

Turbo hashes:

* Source files
* config files
* env files

If nothing changes → **cache hit** ⚡

---

### 📤 `outputs`

```json
"outputs": [".next/**", "!.next/cache/**"]
```

This tells Turbo:

* What files represent a successful build
* What to store in cache
* What to ignore

So next time:

```
turbo run build
→ cache hit
→ instant build
```

This is why Turborepo is fast.

---

## 🧩 `lint` task

```json
"lint": {
  "dependsOn": ["^lint"]
}
```

* Lint dependencies first
* Useful when shared configs exist (`eslint-config`)

---

## 🧩 `check-types`

```json
"check-types": {
  "dependsOn": ["^check-types"]
}
```

Same idea as build, but for:

* `tsc --noEmit`
* type safety across repo

---

## 🧩 `dev` task (special)

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

### Why?

* `dev` never ends
* Hot reload keeps running
* Cache makes no sense

So Turbo:

* Runs dev servers
* Keeps them alive
* Does **not** cache

---

# 4️⃣ How everything works together (mental model)

### When you run:

```bash
npm run dev
```

Flow:

```
root package.json
 └─ turbo run dev
     ├─ apps/web → dev
     ├─ apps/docs → dev
     └─ packages/ui → ignored (unless it has dev)
```

Turbo:

* Builds dependency graph
* Runs tasks in correct order
* Skips unchanged tasks
* Uses cache when possible

---

# 5️⃣ Golden rules (memorize this)

### Root `package.json`

* ✅ Workspaces
* ✅ Tooling
* ❌ App code
* ❌ UI libs
* ❌ Runtime deps

### `turbo.json`

* Defines **how tasks flow**
* Controls **cache**
* Controls **execution order**
* Makes monorepo fast
