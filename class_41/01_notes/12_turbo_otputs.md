## 1️⃣ Why your current `turbo.json` looks “Next-only”

You currently have this:

```json
"outputs": [".next/**", "!.next/cache/**"]
```

That’s because:

* Your repo was bootstrapped with Next.js in mind
* Next.js outputs to `.next/`

Turbo itself **does not know or care** what framework you use.

It only knows:

> “After `build`, which folders prove the build is done?”

---

## 2️⃣ What happens when you add more servers/apps

Let’s say your repo now looks like this:

```
apps/
├─ web-next/        → Next.js (.next)
├─ web-react/       → React (dist)
├─ api-http/        → Express / Fastify (dist)
├─ api-ws/          → WebSocket server (dist)
```

Each one builds differently, but **Turbo doesn’t care how**.

You just tell Turbo **what files come out**.

---

## 3️⃣ The correct way: make outputs GENERIC

### ❌ Not recommended (too specific)

```json
"outputs": [".next/**"]
```

### ✅ Recommended (real-world)

```json
"outputs": [
  ".next/**",
  "dist/**",
  "build/**"
]
```

Now Turbo understands:

* Next.js → `.next`
* React → `dist`
* HTTP server → `dist`
* WS server → `dist`

---

## 4️⃣ What actually happens now (real flow)

### First build

```bash
npm run build
```

Turbo:

* runs build scripts
* sees:

  * `.next/`
  * `dist/`
* stores them in cache

---

### You DELETE all build folders

```bash
rm -rf .next dist build
```

### Run build again (no code change)

```bash
npm run build
```

Turbo:

* hashes inputs
* sees no change
* restores:

  * `.next`
  * `dist`
  * `build`

⚡ Instant rebuild for **ALL apps**, not just Next.

---

## 5️⃣ How Turbo knows WHICH app uses WHICH output

Important point 👇
Turbo caches **per package**, not globally.

So:

| App              | Output     |
| ---------------- | ---------- |
| `apps/web-next`  | `.next/**` |
| `apps/web-react` | `dist/**`  |
| `apps/api-http`  | `dist/**`  |
| `apps/api-ws`    | `dist/**`  |

Turbo stores outputs **package-by-package**, not mixed.

So no conflict.

---

## 6️⃣ Better pattern: per-task, not per-framework

You don’t need separate tasks like:

* `build-next`
* `build-react`
* `build-api`

You just keep:

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": ["$TURBO_DEFAULT$", ".env*"],
  "outputs": [
    ".next/**",
    "dist/**",
    "build/**"
  ]
}
```

Each app:

* runs its own `build` script
* produces its own output folder
* Turbo caches correctly

---

## 7️⃣ What about HTTP / WS servers during `dev`?

You already solved this (without realizing 😄):

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

So:

* HTTP server runs
* WS server runs
* React dev server runs
* No caching
* All stay alive

Exactly correct.

---

## 8️⃣ Common mistake (VERY IMPORTANT ⚠️)

### ❌ Forgetting to list an output

Example:

* React builds to `dist/`
* You forget to add `dist/**` in outputs

Result:

* Turbo rebuilds every time
* No cache hit
* You think “Turbo is slow”

So rule:

> **If the build creates a folder → it must be in `outputs`**

---

## 9️⃣ Realistic production `turbo.json` (mixed stack)

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": [
        "$TURBO_DEFAULT$",
        ".env*",
        "vite.config.*",
        "next.config.*"
      ],
      "outputs": [
        ".next/**",
        "dist/**",
        "build/**"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

This works for:

* Next.js
* React (Vite)
* Express
* Fastify
* WS servers
* Workers

---

## 🔑 Final mental model (lock this in)

> Turbo does not care WHAT you build
> Turbo only cares:
>
> * what goes IN (inputs)
> * what comes OUT (outputs)

Tell it those two correctly — it will cache **anything**.

---

## One-line summary

> Add every build folder (`.next`, `dist`, `build`) to `outputs`
> Turbo will cache **all servers and apps**, not just Next.js
