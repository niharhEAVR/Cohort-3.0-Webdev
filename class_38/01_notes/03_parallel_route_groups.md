# Parallel Routes (core concept)

Parallel routes allow **multiple UI trees at the same URL**.

They use `@slot` syntax.

---

## 🔹 Basic Example

```txt
app/
 ├─ layout.tsx
 ├─ @sidebar/
 │   └─ page.tsx
 ├─ @main/
 │   └─ page.tsx
```

### layout.tsx

```tsx
export default function Layout({ sidebar, main }) {
  return (
    <div className="flex">
      <aside>{sidebar}</aside>
      <main>{main}</main>
    </div>
  )
}
```

### URL

```
/
```

👉 Sidebar + Main render **in parallel**

---

## 🧠 Mental Model

> Parallel routes = **named slots**
> Each slot renders its own route tree

---

## 🔹 Why Parallel Routes Exist

They solve problems like:

* Dashboards
* Persistent sidebars
* Modals
* Tabs

Without reloading the whole page.

---

# 3️⃣ Parallel Route Groups (🔥 advanced but powerful)

Now the **combination** you asked for.

Yes — **Route Groups + Parallel Routes CAN be used together**.

---

## 🔹 Example: Dashboard with Sidebar + Content

```txt
app/
 ├─ (dashboard)/
 │   ├─ layout.tsx
 │   ├─ @sidebar/
 │   │   └─ page.tsx
 │   └─ @content/
 │       ├─ page.tsx
 │       └─ users/page.tsx
```

### layout.tsx

```tsx
export default function DashboardLayout({ sidebar, content }) {
  return (
    <div className="flex">
      <aside>{sidebar}</aside>
      <section>{content}</section>
    </div>
  )
}
```

### URLs

```
/
/users
```

Even though:

* `(dashboard)` → hidden
* `@sidebar`, `@content` → hidden

---

## 🔥 Real-World Use Case: Modals

```txt
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ @modal/
 │   └─ login/page.tsx
```

Now:

* `/` → page
* `/login` → page + modal overlay

This is how **Next.js modal routing** works.

---

## 🔹 Route Groups + Parallel Routes + Auth

```txt
app/
 ├─ (protected)/
 │   ├─ layout.tsx
 │   ├─ @sidebar/
 │   │   └─ page.tsx
 │   └─ @content/
 │       └─ dashboard/page.tsx
```

* `(protected)` → auth guard
* `@sidebar` → persistent
* `@content` → changes per route

🔥 Clean, scalable, professional architecture.

---

# 4️⃣ Common Mistakes with Parallel Routes ❌

---

### ❌ Thinking `@slot` affects URL

No — slots are **UI only**

---

### ❌ Forgetting slot prop in layout

```tsx
// WRONG
export default function Layout() {
  return <div />
}
```

You **must accept slot props**:

```tsx
export default function Layout({ sidebar, content }) {}
```

---

### ❌ Mixing slots with pages randomly

Parallel routes **must be rendered by a layout**

---

# 5️⃣ Final Cheat Sheet 🧠

```txt
(folder)     → Route Group (organization)
folder/      → URL segment
@slot        → Parallel Route (UI region)
layout.tsx   → Controls composition
```

---

## ✅ Final One-Line Summary

> **Route Groups organize routes without changing URLs**
> **Nested layouts define URL hierarchy**
> **Parallel routes split the UI into multiple renderable regions**

---
---
---
---


Example of a **Dashboard with a persistent Sidebar and changing Content**
(this is the **most common real-world use case**).

---

# ✅ Goal

* Sidebar **never reloads**
* Main content **changes with route**
* Clean URLs
* Scalable structure

---

# 📁 Folder Structure (Parallel Route Group)

```txt
app/
 ├─ (dashboard)/
 │   ├─ layout.tsx
 │   ├─ @sidebar/
 │   │   └─ page.tsx
 │   └─ @content/
 │       ├─ page.tsx
 │       ├─ users/page.tsx
 │       └─ settings/page.tsx
 └─ layout.tsx
```

---

# 🧠 How URLs Map

| URL         | Sidebar | Content        |
| ----------- | ------- | -------------- |
| `/`         | Sidebar | Dashboard Home |
| `/users`    | Sidebar | Users Page     |
| `/settings` | Sidebar | Settings Page  |

---

# 🧩 Root Layout (`app/layout.tsx`)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

---

# 🧩 Dashboard Layout (Parallel Route Group)

```tsx
// app/(dashboard)/layout.tsx

export default function DashboardLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode
  content: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 240, borderRight: '1px solid #ddd' }}>
        {sidebar}
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        {content}
      </main>
    </div>
  )
}
```

---

# 📌 Sidebar Slot (`@sidebar/page.tsx`)

```tsx
// app/(dashboard)/@sidebar/page.tsx
import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav>
      <h3>Dashboard</h3>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/users">Users</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </nav>
  )
}
```

---

# 📄 Content Slot Pages

### Dashboard Home

```tsx
// app/(dashboard)/@content/page.tsx
export default function DashboardHome() {
  return <h1>Welcome to Dashboard</h1>
}
```

### Users Page

```tsx
// app/(dashboard)/@content/users/page.tsx
export default function UsersPage() {
  return <h1>Users List</h1>
}
```

### Settings Page

```tsx
// app/(dashboard)/@content/settings/page.tsx
export default function SettingsPage() {
  return <h1>Settings</h1>
}
```

---

# 🎯 What This Gives You (Why This Is Powerful)

✅ Sidebar renders **once**
✅ Content swaps without touching sidebar
✅ Clean URLs (`/users`, not `/dashboard/users`)
✅ Perfect for:

* Dashboards
* Admin panels
* SaaS apps

---

# 🔥 What Makes This a *Parallel Route Group*

| Feature                               | Used |
| ------------------------------------- | ---- |
| Route Group `(dashboard)`             | ✅    |
| Parallel slots `@sidebar`, `@content` | ✅    |
| Layout composing slots                | ✅    |
| Real app usage                        | ✅    |

---

# ❗ Common Mistakes (Avoid These)

### ❌ Forgetting slot props

```tsx
// WRONG
export default function Layout() {}
```

### ✅ Correct

```tsx
export default function Layout({ sidebar, content }) {}
```

---

### ❌ Expecting `/dashboard/users`

URL will be:

```
/users
```

Because `(dashboard)` is hidden.

---

# 🧠 Mental Model (Remember This)

> **Route Group = architecture**
> **Parallel Routes = UI regions**
> **Layout = glue**

---
---
---
---

> wow this is soo good, its like permanent side bar for all of the pages inside the dashboard
> so it works like only for that specific route if we wants to load different pages inside that route but not rerendering the whole page, only just the side part
> so if i do @sidebar @contents @videos @random
> all will work as a parallel routes, one parallel route will does not effect the other parallel routes
> and inside the parallel route, we can make out own pages



YES 👏👏
You’ve understood it **almost perfectly** — let me **confirm, correct one tiny nuance**, and then **lock this concept in your brain forever**.

---

## ✅ Your understanding — VERIFIED

> **“It’s like a permanent sidebar for all pages inside the dashboard”**

✅ **100% correct**

* Sidebar **does not re-render**
* Only the **content slot changes**
* Layout stays mounted

This is exactly why parallel routes exist.

---

> **“Works only for that specific route”**

✅ Correct again

Parallel routes are **scoped to the layout they belong to**.

```txt
app/(dashboard)/layout.tsx
```

⬆️ Parallel routes only exist **under this layout**
Outside of it → they don’t apply.

---

> **“Load different pages inside that route without re-rendering the whole page”**

✅ YES (important detail)

* Layout stays mounted
* Slots are swapped independently
* React state in sidebar is preserved

This is **better than classic SPA routing**.

---

## 🔥 Now let’s clarify the BIG idea

> **“If I do @sidebar @content @videos @random — all will work as parallel routes”**

### ✅ YES — ABSOLUTELY

You can have **ANY number of parallel routes**.

### Example

```txt
app/
 ├─ (dashboard)/
 │   ├─ layout.tsx
 │   ├─ @sidebar/
 │   │   └─ page.tsx
 │   ├─ @content/
 │   │   └─ page.tsx
 │   ├─ @videos/
 │   │   └─ page.tsx
 │   └─ @random/
 │       └─ page.tsx
```

### layout.tsx

```tsx
export default function Layout({
  sidebar,
  content,
  videos,
  random,
}: {
  sidebar: React.ReactNode
  content: React.ReactNode
  videos: React.ReactNode
  random: React.ReactNode
}) {
  return (
    <>
      {sidebar}
      {content}
      {videos}
      {random}
    </>
  )
}
```

🎯 **Each slot is fully independent**

---

## 🧠 VERY IMPORTANT RULE (small correction)

> **“One parallel route will not affect the other”**

### ✅ Mostly true — with ONE nuance

* **UI rendering** → independent ✅
* **Navigation** → depends on which slot the route belongs to

### Example

```txt
@content/users/page.tsx
@videos/cat/page.tsx
```

* Navigating to `/users` → changes **content slot only**
* Navigating to `/cat` → changes **videos slot only**

But:

* If a route **doesn’t exist in a slot**, that slot renders `null` or `default.tsx`

---

## 🔹 `default.tsx` (VERY IMPORTANT)

If a slot doesn’t match the route, you should define a fallback.

```txt
@videos/
 ├─ default.tsx
 └─ page.tsx
```

```tsx
export default function DefaultVideos() {
  return null
}
```

Without this → you may get layout errors.

---

## 🔥 “Inside the parallel route, we can make our own pages”

### ✅ YES — 100%

Each parallel route is its **own mini app**.

### Example

```txt
@content/
 ├─ page.tsx
 ├─ users/page.tsx
 ├─ users/[id]/page.tsx
 └─ settings/page.tsx
```

All valid. All scoped.

---

## 🔥 Real-World Mental Model (remember this)

> **Parallel routes are NOT routes**
> They are **named view ports**

Think:

* Sidebar = viewport
* Main content = viewport
* Modal = viewport
* Chat panel = viewport

Each viewport has **its own routing tree**.

---

## ⚠️ Common Gotchas (read this once)

### ❌ Slots are NOT nested

```txt
@sidebar/@content ❌
```

### ❌ Slots don’t appear in URL

```txt
/@sidebar ❌
```

### ✅ Slots MUST be rendered by layout

If layout doesn’t accept a prop → slot is ignored.

---

## 🧠 One-Sentence Summary (golden line)

> **Parallel routes let multiple independent route trees render at the same URL without re-mounting the layout.**
