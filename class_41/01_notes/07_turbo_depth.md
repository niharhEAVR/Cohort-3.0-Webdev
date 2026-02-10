## 1️⃣ Why `npm install` at **root** installs everything

When you run:

```bash
npm install
```

at the **root**, npm looks at this:

```json
"workspaces": [
  "apps/*",
  "packages/*"
]
```

This tells npm:

> “This repo contains MANY projects. Manage them **together**.”

So npm does this:

1. Reads root `package.json`
2. Finds all workspace packages (`apps/*`, `packages/*`)
3. Reads **every `package.json` inside them**
4. Installs **all dependencies for all projects**
5. Links shared packages (`@repo/ui`, configs, etc.)

That’s why:

* One install → whole repo ready
* No need to install separately in each app

This is **expected monorepo behavior**.

---

## 2️⃣ Why this is actually a GOOD thing

Because:

* Faster CI (one install step)
* No version mismatch
* Everything stays in sync
* Shared deps are deduped

In real companies, **root install is the default**.

---

## 3️⃣ Why `npm run dev` starts dev servers inside apps

Your root script:

```json
"dev": "turbo run dev"
```

This does **not** run one app.

It tells Turbo:

> “Find all projects that have a `dev` script and run them.”

---

### What Turbo does step-by-step

1. Scans all workspaces
2. Looks for `"scripts": { "dev": ... }`
3. Runs them **in parallel**
4. Keeps them alive (`persistent: true`)

So:

* App has `dev` → it runs
* App has NO `dev` → it’s ignored

That’s why you said:

> “unless that project has the dev command inside package.json, it will not run”

✔️ Exactly right.

---

## 4️⃣ Why packages usually don’t have `dev`

Folders inside `packages/` are:

* UI libraries
* Configs
* Utils

They usually:

* Don’t run servers
* Don’t listen on ports
* Don’t need `dev`

So Turbo:

* Skips them during `dev`
* But still builds them when needed

---

## 5️⃣ Mental model (this will make everything click)

### `npm install` at root

> “Prepare **the entire workspace**.”

### `turbo run dev`

> “Run **dev scripts wherever they exist**.”

---

## 6️⃣ Is this better than installing per project?

### For learning → either is okay

### For real projects → **root install is preferred**

Most teams:

* Run `npm install` only at root
* Never install per app
* Let workspaces handle linking

---

## 7️⃣ Simple rule you can follow

* 🧠 **During development**
  Run `npm install` at root

* 📦 **When adding a dependency**
  Add it to the correct app/package `package.json`

* 🚀 **When running apps**
  Use `npm run dev` at root
  or
  `npm run dev` inside a specific app

---

## One-line summary

> Root install sets up everything
> Turbo decides what actually runs

You’re observing **real monorepo behavior**, not a bug.
