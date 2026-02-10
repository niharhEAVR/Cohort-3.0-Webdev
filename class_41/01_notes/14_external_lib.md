## What you are seeing

> “I installed a library for my backend app,
> but I don’t see `node_modules` inside that backend folder.
> Still, the code works. How?”

This is **normal and correct behavior** in a workspace monorepo.

---

## The short answer (then details)

> The library **IS installed**,
> but it is stored **at the workspace root**,
> and your backend app is **linked to it automatically**.

Nothing is missing.

---

## What actually happens step by step

Let’s say your structure is:

```
repo/
├─ node_modules/
├─ apps/
│  └─ api/
│     └─ package.json
├─ packages/
└─ package.json
```

You run:

```bash
apps/api> npm install express
```

(or add it to `apps/api/package.json` and run install)

---

## Step 1️⃣ npm reads workspace config

From root `package.json`:

```json
"workspaces": ["apps/*", "packages/*"]
```

This tells npm:

> “This repo is ONE workspace, not separate projects.”

---

## Step 2️⃣ npm installs the dependency (but smartly)

Instead of doing this ❌:

```
apps/api/node_modules/express
```

npm does this ✅:

```
repo/node_modules/express
```

Why?

Because:

* Only **one copy** is needed
* Saves disk space
* Faster installs
* Prevents version conflicts

---

## Step 3️⃣ npm creates a hidden link

Your backend app now has an **invisible connection**:

```
apps/api
   │
   └───► repo/node_modules/express
```

You don’t see it, but Node.js knows how to find it.

---

## Step 4️⃣ How Node.js finds the package (important)

When your backend code does:

```js
import express from "express";
```

Node.js searches like this:

1. `apps/api/node_modules/express` ❌ (not found)
2. `apps/node_modules/express` ❌
3. `repo/node_modules/express` ✅ FOUND

This is **normal Node.js module resolution**, not Turborepo magic.

---

## So where is the library ACTUALLY installed?

👉 **At the root**:

```
repo/node_modules/
├─ express
├─ dotenv
├─ zod
└─ ...
```

Your backend app just **uses it**.

---

## Why this is GOOD (not a bug)

### ✅ Advantages

* One install for whole repo
* Faster installs
* Less disk usage
* No duplicate libraries
* Cleaner app folders

### ❌ Without this

Each app would have:

```
apps/api/node_modules
apps/web/node_modules
apps/admin/node_modules
```

Which is slow and messy.

---

## Why you still add dependency to backend `package.json`

Even though the library is at root, you MUST still do:

```json
// apps/api/package.json
"dependencies": {
  "express": "^4.19.0"
}
```

Because:

* Turbo builds dependency graph from this
* CI knows what the app needs
* Future installs stay correct

> **package.json declares ownership**
> **node_modules stores implementation**

---

## Important rule (remember this)

> **Where it is declared ≠ where it is stored**

This is the key mental shift.

---

## One-line explanation (perfect for interviews)

> In a workspace monorepo, dependencies are installed once at the root and shared, while individual projects declare what they need in their own `package.json`.
