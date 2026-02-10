# Real Example: Turborepo Cache in Action

Assume this monorepo (like the one you just created):

```
repo/
 ├─ apps/
 │   └─ web
 ├─ packages/
 │   └─ ui
 ├─ turbo.json
 └─ package.json
```

* `packages/ui` → shared UI components
* `apps/web` → website using `ui`

---

## Step 1️⃣ First build (NO cache yet)

Run this at repo root:

```bash
npm run build
```

### What Turborepo does internally

1. Sees `ui` is used by `web`
2. Builds `ui` first
3. Builds `web`
4. Saves outputs to cache

### Terminal output (simplified)

```
• Packages in scope: ui, web
• Running build in 2 packages

ui:build    running...
ui:build    completed in 4.2s

web:build   running...
web:build   completed in 6.8s

✔ Build finished in 11.0s
✔ Outputs cached
```

👉 **Total time: ~11 seconds**

---

## Step 2️⃣ Second build (nothing changed)

Run the SAME command again:

```bash
npm run build
```

### What Turborepo checks

* Source files unchanged
* Dependencies unchanged
* Config unchanged

So Turborepo says:

> “Why rebuild? I already have this.”

### Terminal output (important part)

```
• Packages in scope: ui, web

ui:build    cache hit
web:build   cache hit

✔ Build finished in 0.4s
```

👉 **Total time: < 1 second**

🔥 **THIS is caching**

No `tsc`, no `vite`, no heavy work ran.

---

## Step 3️⃣ Change ONLY the UI package

Edit a file:

```
packages/ui/Button.tsx
```

Now run:

```bash
npm run build
```

### What Turborepo does now

* `ui` changed → rebuild
* `web` depends on `ui` → rebuild
* Anything else → skipped

### Output

```
ui:build    running...
ui:build    completed in 4.1s

web:build   running...
web:build   completed in 6.7s

✔ Build finished in 10.9s
```

Correct + efficient.

---

## Step 4️⃣ Change ONLY web app code

Edit:

```
apps/web/pages/index.tsx
```

Run build again:

```bash
npm run build
```

### Turborepo logic

* `ui` unchanged → cache hit
* `web` changed → rebuild

### Output

```
ui:build    cache hit
web:build   running...
web:build   completed in 6.6s

✔ Build finished in 6.8s
```

👉 **ui skipped, web rebuilt**

---

## Where is the cache stored?

On your machine, here:

```
node_modules/.cache/turbo
```

This folder is why builds are fast.

---

## Why this is HUGE in real life (CI example)

Without Turborepo:

* Every PR → full rebuild
* 10–15 minutes CI time 😵

With Turborepo:

* Only changed packages build
* Cached results reused
* CI runs in **seconds or 1–2 minutes**

💸 Saves time + money.

---

## One-line explanation you should remember

> Turborepo cache works by saving the outputs of tasks and reusing them when the inputs haven’t changed, allowing repeated builds to finish almost instantly.

---

## Mental picture (lock it in)

* First run → **work + save**
* Second run → **reuse**
* Change small thing → **rebuild only what depends on it**

That’s it. You now **fully understand Turborepo caching** ✅
