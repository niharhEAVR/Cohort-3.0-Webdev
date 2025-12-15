In **Next.js (App Router)**, **Route Groups** are a **folder-organization feature** that lets you group routes **without affecting the URL path**.

They are mainly used to **structure large apps cleanly**.

---

## 🔹 What is a Route Group?

A **route group** is a folder wrapped in **parentheses**:

```txt
(app)
(auth)
(dashboard)
```

➡️ **Folders inside `( )` do NOT appear in the URL**

---

## 🔹 Why Route Groups Exist

Route Groups solve **three big problems**:

1. **Organize large apps**
2. **Apply layouts selectively**
3. **Separate concerns (auth, marketing, admin, etc.)**

Without route groups, your URLs would become messy.

---

## 🔹 Basic Example

### Folder structure

```txt
app/
 ├─ (auth)/
 │   ├─ login/
 │   │   └─ page.tsx
 │   └─ register/
 │       └─ page.tsx
 ├─ (marketing)/
 │   └─ page.tsx
```

### Actual URLs

```txt
/login
/register
/
```

🚫 URLs do **NOT** include `(auth)` or `(marketing)`

---

## 🔹 Route Groups vs Normal Folders

| Folder Type    | Appears in URL? | Purpose           |
| -------------- | --------------- | ----------------- |
| `dashboard/`   | ✅ Yes           | URL segment       |
| `(dashboard)/` | ❌ No            | Organization only |

---

## 🔹 Route Groups with Layouts (VERY Important)

You can apply **different layouts** to different groups.

### Example

```txt
app/
 ├─ (auth)/
 │   ├─ layout.tsx   ← Auth layout
 │   └─ login/
 │       └─ page.tsx
 ├─ (dashboard)/
 │   ├─ layout.tsx   ← Dashboard layout
 │   └─ page.tsx
```

### Result

* `/login` → uses **Auth layout**
* `/` → uses **Dashboard layout**

Same URL level, **different UI structure**

---

## 🔹 Multiple Route Groups at Same Level

You can have **multiple route groups side-by-side**:

```txt
app/
 ├─ (public)/
 │   └─ page.tsx
 ├─ (admin)/
 │   └─ page.tsx
```

⚠️ **Not allowed**: two `page.tsx` that resolve to the same URL

❌ This would break:

```txt
(public)/page.tsx
(admin)/page.tsx
```

Because both map to `/`

---

## 🔹 Route Groups + Middleware / Auth

Common pattern:

```txt
app/
 ├─ (auth)/
 │   └─ login/page.tsx
 ├─ (protected)/
 │   └─ dashboard/page.tsx
```

Then in `middleware.ts`:

```ts
if (pathname.startsWith('/dashboard')) {
  // protect route
}
```

Even though `(protected)` isn’t in the URL, **middleware still works normally**.

---

## 🔹 When Should You Use Route Groups?

✅ Use them when:

* App is getting large
* You want **different layouts**
* You want **clean URLs**
* You want **logical separation** (auth, admin, marketing)

❌ Don’t use them just for fun in small apps

---

## 🔹 Real-World Example (Production)

```txt
app/
 ├─ (marketing)/
 │   ├─ page.tsx
 │   └─ pricing/page.tsx
 ├─ (auth)/
 │   ├─ login/page.tsx
 │   └─ signup/page.tsx
 ├─ (app)/
 │   ├─ layout.tsx
 │   ├─ dashboard/page.tsx
 │   └─ settings/page.tsx
```

URLs:

```txt
/
 /pricing
 /login
 /signup
 /dashboard
 /settings
```

---

## 🧠 One-Line Summary

> **Route Groups let you organize Next.js routes and layouts without changing the URL structure.**



---
---
---

# 1️⃣ Route Groups vs Parallel Routes (❗ very important difference)

These two are often confused, but they solve **different problems**.

---

## 🔹 Route Groups `(group)`

**Purpose:**
👉 **Organize folders & apply layouts**
👉 **DO NOT affect the URL**

### Example

```txt
app/
 ├─ (auth)/
 │   └─ login/page.tsx
 ├─ (dashboard)/
 │   └─ page.tsx
```

URLs:

```txt
/login
/
```

✅ Used for:

* Clean URLs
* Separate layouts
* Better folder structure

---

## 🔹 Parallel Routes `@slot`

**Purpose:**
👉 Render **multiple UI sections at the same time**
👉 Often used for **modals, sidebars, tabs**

### Example

```txt
app/
 ├─ layout.tsx
 ├─ @sidebar/
 │   └─ page.tsx
 ├─ @content/
 │   └─ page.tsx
```

```tsx
// layout.tsx
export default function Layout({ sidebar, content }) {
  return (
    <div className="flex">
      {sidebar}
      {content}
    </div>
  )
}
```

---

## 🆚 Comparison Table

| Feature           | Route Groups             | Parallel Routes     |
| ----------------- | ------------------------ | ------------------- |
| Syntax            | `(group)`                | `@slot`             |
| Affects URL       | ❌ No                     | ❌ No                |
| Purpose           | Organization & layouts   | Multiple UI regions |
| Beginner-friendly | ✅ Yes                    | ⚠️ Advanced         |
| Common use        | Auth / Admin / Marketing | Modals, dashboards  |

👉 **Rule of thumb**

> If you’re organizing folders → **Route Groups**
> If you’re splitting UI → **Parallel Routes**

---

# 2️⃣ Route Groups + `loading.tsx`

Each **route group can have its own loading state**.

---

## Example

```txt
app/
 ├─ (auth)/
 │   ├─ loading.tsx
 │   └─ login/page.tsx
 ├─ (dashboard)/
 │   ├─ loading.tsx
 │   └─ page.tsx
```

### What happens?

* `/login` → shows **auth loading UI**
* `/` → shows **dashboard loading UI**

### `loading.tsx`

```tsx
export default function Loading() {
  return <p>Loading...</p>
}
```

✅ Even though `(auth)` is not in the URL,
**Next.js still uses it for loading boundaries**

---

## Why this is powerful

You can show:

* Skeleton screens for dashboards
* Simple spinners for auth pages
* Marketing-style loaders for landing pages

---

# 3️⃣ Auth Patterns Using Route Groups (Real World)

This is **the MOST common real use** of route groups.

---

## 🔹 Pattern 1: Public vs Protected Routes

```txt
app/
 ├─ (public)/
 │   ├─ page.tsx
 │   └─ login/page.tsx
 ├─ (protected)/
 │   ├─ layout.tsx
 │   └─ dashboard/page.tsx
```

### Protected layout

```tsx
// (protected)/layout.tsx
import { redirect } from 'next/navigation'

export default function ProtectedLayout({ children }) {
  const isLoggedIn = false // check auth

  if (!isLoggedIn) {
    redirect('/login')
  }

  return children
}
```

✅ All protected pages automatically guarded
❌ No repeated auth checks

---

## 🔹 Pattern 2: Different Layouts for Auth

```txt
app/
 ├─ (auth)/
 │   ├─ layout.tsx
 │   ├─ login/page.tsx
 │   └─ signup/page.tsx
 ├─ (app)/
 │   ├─ layout.tsx
 │   └─ page.tsx
```

* Auth pages → minimal layout
* App pages → sidebar + navbar

---

## 🔹 Pattern 3: Middleware + Route Groups

```txt
app/
 ├─ (auth)/login/page.tsx
 ├─ (dashboard)/dashboard/page.tsx
middleware.ts
```

```ts
export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // check token
  }
}
```

⚠️ Route group names **don’t matter in middleware**
Only actual URLs matter

---

# 4️⃣ Common Beginner Mistakes ❌

Learn these early — they save **hours of debugging**.

---

## ❌ Mistake 1: Expecting Route Group in URL

```txt
(auth)/login/page.tsx
```

❌ Expecting: `/auth/login`
✅ Actual: `/login`

> Route groups NEVER appear in URLs

---

## ❌ Mistake 2: Duplicate Routes

```txt
(public)/page.tsx
(admin)/page.tsx
```

Both map to `/` → ❌ crash

✅ Fix:

```txt
(public)/home/page.tsx
(admin)/dashboard/page.tsx
```

---

## ❌ Mistake 3: Overusing Route Groups

Bad:

```txt
(app)
(ui)
(pages)
(routes)
```

✅ Good:

```txt
(auth)
(marketing)
(dashboard)
```

---

## ❌ Mistake 4: Putting shared components in route groups

❌ Wrong:

```txt
(auth)/Navbar.tsx
```

✅ Correct:

```txt
components/Navbar.tsx
```

Route groups are **ONLY for routing**

---

## ❌ Mistake 5: Confusing Route Groups with Parallel Routes

* `(auth)` ≠ `@auth`
* Organization ≠ UI splitting

---

# 🧠 Final Mental Model

> **Route Groups = Folder organization + layout control**
> **Parallel Routes = Multiple UI areas**
> **Neither changes the URL**
