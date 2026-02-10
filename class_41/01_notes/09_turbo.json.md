# 1️⃣ What `turbo.json` really is

Think of `turbo.json` as:

> **“The traffic control system for all projects in the repo.”**

It does **NOT**:

* build code
* start servers
* install dependencies

It only:

* decides **what runs**
* decides **when it runs**
* decides **what can be skipped**
* decides **what can be reused from cache**

---

## Top-level config

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
```

### `$schema`

* For autocomplete
* For validation
* No runtime effect

### `ui: "tui"`

* Shows the nice Turbo terminal UI
* Task progress
* Cache hit/miss
* Execution order

---

# 2️⃣ The most important part: `tasks`

```json
"tasks": { ... }
```

Each key (`build`, `lint`, `dev`, etc.) is **NOT a script**.

Instead:

> A Turbo task = “Run the script with the SAME name inside each package.”

So:

* Turbo task `build` → runs `"build"` scripts
* Turbo task `dev` → runs `"dev"` scripts

---

# 3️⃣ `build` task (deep dive)

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": ["$TURBO_DEFAULT$", ".env*"],
  "outputs": [".next/**", "!.next/cache/**"]
}
```

This is the **most important task**.

---

## 3.1 `dependsOn: ["^build"]`

### What `^` means

`^build` = **build my dependencies first**

### Real example

```
packages/ui
apps/web (depends on @repo/ui)
```

When you run:

```bash
npm run build
```

Turbo decides:

```
packages/ui → build
apps/web   → build
```

You did NOT configure this manually.
Turbo figures it out from `package.json` dependencies.

---

## 3.2 `inputs`

```json
"inputs": ["$TURBO_DEFAULT$", ".env*"]
```

### What are inputs?

Inputs = **things that affect the output**

Turbo hashes these to decide:

* “Do I need to rerun?”
* or “Can I reuse cache?”

---

### `$TURBO_DEFAULT$` includes:

* source files
* package.json
* tsconfig
* lockfile

### `.env*`

* `.env`
* `.env.local`
* `.env.production`

Meaning:

> If environment variables change → rebuild

---

## 3.3 `outputs`

```json
"outputs": [".next/**", "!.next/cache/**"]
```

### What are outputs?

Outputs = **proof that the task succeeded**

Turbo:

* Saves them in cache
* Restores them next time

---

### Why exclude `.next/cache`?

* It’s noisy
* Machine-specific
* Not useful to reuse

So:

* Build artifacts → cached
* Internal Next cache → ignored

---

## 3.4 What actually happens (real flow)

### First run

```
apps/web:build
  cache miss
  next build runs
  .next saved
```

### Second run (no code change)

```
apps/web:build
  cache hit
  .next restored
```

⚡ Almost instant.

---

# 4️⃣ `lint` task

```json
"lint": {
  "dependsOn": ["^lint"]
}
```

### Meaning

> “Lint dependencies before linting me.”

### Why this matters

If:

* `apps/web` uses `@repo/ui`
* UI has lint errors

Then:

* Turbo catches errors early
* Prevents downstream breakage

No cache config here → defaults apply.

---

# 5️⃣ `check-types` task

```json
"check-types": {
  "dependsOn": ["^check-types"]
}
```

### Meaning

> “Type-check dependencies first.”

### Real example

* `@repo/ui` exports wrong type
* `apps/web` uses it

Turbo ensures:

1. UI type check fails first
2. App never runs broken types

---

# 6️⃣ `dev` task (very special)

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

---

## 6.1 `cache: false`

Because:

* Dev servers never end
* Output constantly changes
* Caching makes no sense

So Turbo:

* Never caches `dev`

---

## 6.2 `persistent: true`

Meaning:

> “This task keeps running.”

Turbo:

* Starts dev servers
* Does NOT wait for completion
* Keeps them alive
* Shows logs continuously

---

### Real behavior

```bash
npm run dev
```

Turbo:

* Finds all packages with `dev`
* Runs them in parallel
* Keeps terminal open

Packages without `dev` → ignored.

---

# 7️⃣ How Turbo connects all of this

### When you run:

```bash
npm run build
```

Flow:

```
root package.json
 └─ turbo run build
     ├─ read turbo.json
     ├─ build dependency graph
     ├─ apply dependsOn rules
     ├─ check cache
     ├─ run or restore outputs
```

Same logic for `lint`, `check-types`, `dev`.

---

# 8️⃣ Why this matters in real life

Without Turbo:

* You write scripts manually
* Order breaks
* Builds are slow
* CI is painful

With Turbo:

* Automatic order
* Smart skipping
* Massive speedups
* Works at scale (100+ apps)

---

# 9️⃣ Final mental model (lock this in 🔐)

> `turbo.json` does NOT run code
> It decides **WHEN** code runs and **IF** it needs to run

---

## One-liner summary

* `dependsOn` → order
* `inputs` → when to rerun
* `outputs` → what to cache
* `dev` → long-running tasks