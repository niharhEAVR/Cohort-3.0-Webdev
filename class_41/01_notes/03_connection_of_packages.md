### let’s **walk it end-to-end** with a **real `apps/web` ↔ `packages/ui` dependency flow**, exactly how Turborepo *thinks and executes*.

---

# 🧠 The setup (realistic & minimal)

```
repo/
├─ apps/
│  └─ web/
│     ├─ package.json
│     └─ src/
│        └─ page.tsx
├─ packages/
│  └─ ui/
│     ├─ package.json
│     └─ src/
│        └─ Button.tsx
├─ package.json        (root)
└─ turbo.json
```

---

## 1️⃣ `packages/ui` (shared library)

### `packages/ui/package.json`

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "lint": "eslint .",
    "check-types": "tsc --noEmit"
  }
}
```

This is:

* A **library**
* Built **before** apps that depend on it
* Has no runtime server

---

## 2️⃣ `apps/web` (consumer)

### `apps/web/package.json`

```json
{
  "name": "web",
  "private": true,
  "dependencies": {
    "@repo/ui": "*"
  },
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "check-types": "tsc --noEmit"
  }
}
```

Key thing:

```json
"@repo/ui": "*"
```

This tells pnpm:

> “Link the local workspace package, not npm registry.”

So `apps/web` **depends on** `packages/ui`.

---

## 3️⃣ How Turborepo *sees* this

Turbo builds a **dependency graph** automatically:

```
packages/ui
     ↓
apps/web
```

You never define this graph manually — Turbo infers it from:

* workspaces
* package.json dependencies

---

# 4️⃣ Now the MAGIC: `npm run build` at root

You run:

```bash
npm run build
```

Root script:

```json
"build": "turbo run build"
```

---

## 🔄 Turbo execution order (internally)

Turbo reads `turbo.json`:

```json
"build": {
  "dependsOn": ["^build"]
}
```

### Meaning of `^build`:

> “Before building this package, build **its dependencies** first.”

---

### 🔹 Step-by-step execution

#### 1. Turbo scans all packages

Finds:

* `packages/ui` → has `build`
* `apps/web` → has `build`

#### 2. Turbo checks dependency graph

* `apps/web` depends on `@repo/ui`

#### 3. Turbo decides order

```
1️⃣ packages/ui → build
2️⃣ apps/web   → build
```

You didn’t specify this.
Turbo figured it out automatically.

---

## 5️⃣ First build (cold cache)

Terminal output (simplified):

```
packages/ui:build
  cache miss → running tsc
  outputs saved

apps/web:build
  cache miss → running next build
  outputs saved
```

Turbo now stores:

* Source hash
* Dependency hash
* Output files

---

# 6️⃣ Second build (this is where Turborepo shines)

You run again:

```bash
npm run build
```

Nothing changed.

### Turbo checks:

* Source files → same
* Dependencies → same
* Env files → same

### Result:

```
packages/ui:build
  cache hit → replaying outputs

apps/web:build
  cache hit → replaying outputs
```

⚡ **Build finishes in seconds**

No TypeScript.
No Next.js build.
No CPU burn.

---

# 7️⃣ Change ONLY `packages/ui`

You edit:

```ts
// packages/ui/src/Button.tsx
export function Button() {
  return <button>Click me</button>;
}
```

Now run:

```bash
npm run build
```

---

## 🔥 Turbo reacts intelligently

### What changed?

* `packages/ui` source hash ❌
* `apps/web` dependency hash ❌ (because it depends on ui)

### What Turbo does:

```
packages/ui:build
  cache miss → rebuild

apps/web:build
  cache miss → rebuild (dependency changed)
```

Correct behavior ✔️
No stale builds.

---

# 8️⃣ Change ONLY `apps/web`

Edit:

```tsx
// apps/web/src/page.tsx
import { Button } from "@repo/ui";

export default function Page() {
  return <Button />;
}
```

Run build again.

### Turbo behavior:

```
packages/ui:build
  cache hit

apps/web:build
  cache miss → rebuild
```

UI didn’t change → skipped
Web changed → rebuilt

This is **dependency-aware caching**.

---

# 9️⃣ What about `dev`?

You run:

```bash
npm run dev
```

`turbo.json`:

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

Turbo:

* Starts `apps/web` dev server
* Keeps it running
* Does NOT cache
* Does NOT rebuild `ui` unless dev script exists

Usually:

* `ui` is watched via TS path / symlink
* `web` hot reloads instantly

---

# 🔑 Final mental model (lock this in)

### Root `package.json`

> “I don’t build apps. I **coordinate** them.”

### `packages/ui`

> “I must be built **before** anything that uses me.”

### `apps/web`

> “I depend on shared code, so my build waits.”

### `turbo.json`

> “This is the **rulebook** for order + caching.”
