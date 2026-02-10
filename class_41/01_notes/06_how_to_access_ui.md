## What you are trying to do (in one line)

> “My Next.js app wants to **use a Button that lives in `packages/ui`**.”

That’s it.

---

## Step 1️⃣ You tell the app: “I need this UI package”

You do this by adding this in `apps/web/package.json`:

```json
"dependencies": {
  "@repo/ui": "*"
}
```

In **simple words**:

👉 You are telling Next.js app:

> “Hey, I depend on something called `@repo/ui`.”

You are **not copying code**.
You are **just declaring a connection**.

---

## Step 2️⃣ You run `npm install`

```bash
apps/web> npm install
```

Now the **magic happens** (still simple 👇)

### What npm does internally

1. npm looks at your workspace (`apps/*`, `packages/*`)
2. It finds a folder called `packages/ui`
3. It sees its name is `"@repo/ui"`
4. Instead of downloading anything,
   👉 npm **links** it

So effectively:

```
apps/web  ───────► packages/ui
```

This is a **direct wire**, not a copy.

---

## Step 3️⃣ Now importing works

When you write in `page.tsx`:

```tsx
import { Button } from "@repo/ui";
```

What happens:

* Next.js looks for `@repo/ui`
* Finds the linked folder
* Reads the Button code
* Uses it in the app

That’s all.

---

## Why 100 Next.js apps can use the same Button

Because:

* There is **only ONE `packages/ui`**
* All apps are **connected to it**
* No duplication

So it becomes:

```
packages/ui/Button.tsx
   ↑      ↑      ↑
   │      │      │
web   admin   dashboard   (100 apps)
```

Change Button once → **everyone gets the update**.

---

## One-line mental model (remember this)

> Adding `@repo/ui` does **not install**
>
> It **connects** the app to the shared UI folder

---

## That’s it. No more complexity.

* Change `package.json` → declare dependency
* Run `npm install` → create connection
* Import → use shared component


---
---
---
---
---


## Where should `npm install` be run?

### ✅ **BEST & CORRECT place**

👉 **Inside the project folder**

```bash
apps/web> npm install
```

This is the **right way** 👍

---

## Why this is correct (in simple words)

When you add this in **`apps/web/package.json`**:

```json
"dependencies": {
  "@repo/ui": "*"
}
```

You are saying:

> “ONLY `apps/web` needs `@repo/ui`.”

So you must install **from that folder**, because:

* npm reads **that package.json**
* npm creates the link **for that app only**
* dependency stays clean and correct

---

## What happens if you run it at the root?

```bash
npm install   # at turborepo root
```

### ⚠️ It *works*, but it’s NOT ideal

* npm installs **everything for the whole repo**
* Slower
* Less control
* Easy to accidentally add deps to root (bad practice)

Root should be for:

* turbo
* typescript
* prettier
* eslint

❌ Root should NOT depend on `@repo/ui`

---

## Rule you should remember (very important)

> **Change package.json → run install in the SAME folder**

So:

| You changed                | Run install in |
| -------------------------- | -------------- |
| `apps/web/package.json`    | `apps/web`     |
| `apps/admin/package.json`  | `apps/admin`   |
| `packages/ui/package.json` | `packages/ui`  |
| root `package.json`        | root           |

---

## Which is better?

✅ **Installing inside the app folder is BETTER**

* Clean dependencies
* Correct linking
* Scales well (10 apps, 100 apps)
* Professional monorepo practice

---

### One-line summary

> Always run `npm install` **where you added the dependency**
