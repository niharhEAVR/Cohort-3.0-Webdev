## 1️⃣ How Turborepo reads config (important)

Turborepo supports **config inheritance**.

Order of resolution:

1. Root `turbo.json` (base rules)
2. Package-level `turbo.json` (overrides / additions)
3. Final merged config is used for that package

So configs are **merged**, not replaced.

---

## 2️⃣ What should live in ROOT `turbo.json`

Root config should define **global rules** that apply to *most* projects.

### Example (root `turbo.json`)

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
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

This means:

* Most projects build to one of these folders
* Most projects follow the same dependency order
* Most projects share the same dev behavior

This is **the default contract**.

---

## 3️⃣ When per-project override makes sense

Now suppose you have:

* a **React app** → `dist/`
* a **Node HTTP server** → `dist/`
* a **WS server** → `dist/`
* a **special worker** → `out/`

You don’t want to pollute the global config for **one special case**.

That’s where per-project override is perfect.

---

## 4️⃣ Your override example (YES, this is correct)

Inside a specific project (for example `apps/api-http/turbo.json`):

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

### What this means (plain English)

* `"extends": ["//"]` → inherit root `turbo.json`
* Override ONLY:

  * the `build.outputs` for this package
* Everything else stays the same:

  * `dependsOn`
  * `inputs`
  * `dev` behavior

So Turbo merges it like this:

```txt
root build config
   +
this package's override
   =
final build config for this package
```

---

## 5️⃣ Does this override affect other projects?

❌ No.

This override applies **only** to:

```
apps/api-http
```

Other apps continue to use root config.

---

## 6️⃣ Should you do this for *every* project?

### ❌ NO (bad practice)

* Too much duplication
* Hard to maintain
* Easy to break consistency

### ✅ YES only when needed

Use overrides when:

* output folder is different
* inputs are special
* task behavior differs

---

## 7️⃣ Best-practice rule (remember this)

> **Root = common behavior**
> **Local = exceptions only**

If 80–90% of projects:

* build to `dist/`
* or `.next/`

→ keep it in root.

If 1–2 projects are special:
→ override locally.

---

## 8️⃣ Real-world pattern (what big repos do)

```
turbo.json            ← base rules
apps/
 ├─ web/
 │   └─ turbo.json    ← override (only if needed)
 ├─ api/
 │   └─ turbo.json
 └─ worker/
     └─ turbo.json
```

Each override is **small and intentional**.

---

## 9️⃣ Common mistake to avoid ⚠️

❌ Doing this everywhere:

```json
"outputs": ["dist/**"]
```

…in every project.

This defeats the purpose of a shared config.

---

## 🔑 Final takeaway (lock this in)

* ✅ Root `turbo.json` = default behavior
* ✅ Package `turbo.json` = override only when necessary
* ✅ `extends: ["//"]` is the **correct way**
* ❌ Don’t duplicate configs blindly

---

### One-line summary

> Put **common outputs** in root
> Override **special outputs** per project using `extends`