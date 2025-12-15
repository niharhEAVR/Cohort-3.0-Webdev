## 1️⃣ Why React components were not `async` before

In **traditional React (CRA / Vite / SPA)**:

* Components run **in the browser**
* Rendering must be **synchronous**
* JSX must be returned **immediately**

React’s render phase works like:

```ts
Component(props) → JSX → DOM
```

If a component were `async`, it would return:

```ts
Promise<JSX>
```

But React **did not know how to render a Promise**.

So this was **not allowed**:

```ts
async function Component() {
  const data = await fetch(...)
  return <div />
}
```

Instead, React forced this pattern:

```ts
useEffect(() => {
  fetch(...)
}, [])
```

Because:

* Fetching is async
* Rendering had to stay sync
* Side-effects were moved outside render

---

## 2️⃣ What problem did this cause?

This created several issues:

### 🔹 Over-fetching

* Data loads **after** first render
* Causes loading spinners everywhere

### 🔹 Waterfall requests

* Child components wait for parent effects

### 🔹 SEO problems

* HTML is mostly empty on first load

### 🔹 Complex state management

* `loading`, `error`, `success` everywhere

---

## 3️⃣ What changed with Next.js?

Next.js uses **Server Components** (App Router).

Key shift:

> **Rendering happens on the server, not the browser**

On the server:

* There is no DOM
* No blocking UI thread
* Waiting is cheap

So Next.js allows:

```ts
export default async function Page() {
  const data = await fetch(...)
  return <div />
}
```

Here:

* The server **waits**
* Then sends **ready HTML** to the browser

---

## 4️⃣ How is the “async component” problem solved?

### 🔑 The solution: React Server Components + Streaming

Instead of forcing render to be synchronous:

* React allows components to **pause**
* Promises are **handled by the renderer**
* HTML is streamed when ready

This is why Next.js pages can be async.

> The component doesn’t return a Promise to the browser —
> React resolves it **before** sending the result.

---

## 5️⃣ Why this is safe in Next.js but not old React?

| Old React (SPA)         | Next.js App Router  |
| ----------------------- | ------------------- |
| Runs in browser         | Runs on server      |
| Must render immediately | Can wait            |
| Promise breaks render   | Promise is resolved |
| Data after render       | Data before HTML    |

So the **environment** changed, not just syntax.

---

## 6️⃣ What problems does this solve?

### ✅ No `useEffect` for data fetching

```ts
const data = await db.user.findMany()
```

### ✅ Better SEO

* Fully rendered HTML sent to browser

### ✅ Faster first paint

* No loading skeleton for initial data

### ✅ Less client JS

* Server Components don’t ship JS

### ✅ Simpler code

* No `useState + useEffect` boilerplate

---

## 7️⃣ What are the main usages of async components in Next.js?

### 🔹 Database access

```ts
const users = await prisma.user.findMany()
```

### 🔹 Auth checks

```ts
const session = await auth()
```

### 🔹 API calls

```ts
const posts = await fetch(...)
```

### 🔹 File system access

```ts
const file = await fs.readFile(...)
```

### 🔹 Metadata generation

```ts
export async function generateMetadata() {}
```

---

## 8️⃣ Why this is *not* allowed in Client Components

Client Components still behave like old React:

```ts
"use client"
```

* Runs in browser
* No server waiting
* Cannot block rendering

So async components are **server-only by default**.

---

## 9️⃣ Mental model to remember 🧠

> **Old React:** render first, fetch later
> **Next.js:** fetch first, render once

Async components exist because **rendering moved to the server**.