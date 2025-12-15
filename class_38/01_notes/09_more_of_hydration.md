# 0️⃣ One-line intuition (remember this)

> **Hydration = React “waking up” static HTML and attaching interactivity to it.**

Before hydration: HTML is **dead**
After hydration: HTML is **alive**

---

# 1️⃣ How React normally works (no hydration yet)

In a normal React SPA (Vite / CRA):

### What the server sends

```html
<div id="root"></div>
<script src="index.js"></script>
```

There is **no UI in HTML**.

### What the browser does

1. Download JS
2. React runs
3. React creates DOM nodes
4. UI appears
5. Event handlers attach

➡️ **There is nothing to hydrate**
React is creating everything from scratch.

---

# 2️⃣ Why hydration exists at all

Hydration exists because of **Server Rendering (SSR / SSG)**.

In Next.js, the server already sends this:

```html
<button>Click me</button>
```

The UI already exists **before JS loads**.

But that HTML:

* Has no React state
* Has no event handlers
* Has no component tree in memory

So React must:

> “Adopt this HTML and attach logic to it”

That process is called **hydration**.

---

# 3️⃣ What hydration actually means (precise)

Hydration is the process where React:

1. Reads existing HTML
2. Builds the same virtual DOM in memory
3. Matches nodes
4. Attaches:

   * event listeners
   * state
   * effects

**Without recreating DOM**

That last line is critical.

---

# 4️⃣ Hydration timeline (important)

### Next.js page load sequence

```
1. Server renders HTML
2. Browser shows HTML instantly
3. JS bundle downloads
4. React runs hydration
5. Page becomes interactive
```

So you get:

* Fast first paint
* Then interactivity

---

# 5️⃣ Hydration vs Rendering (key difference)

| Action             | Rendering | Hydration |
| ------------------ | --------- | --------- |
| Creates DOM        | Yes       | No        |
| Uses existing HTML | No        | Yes       |
| Attaches events    | Yes       | Yes       |
| Happens in browser | Yes       | Yes       |

Hydration **reuses DOM**, rendering **creates DOM**.

---

# 6️⃣ Why hydration can fail (hydration mismatch)

React expects:

> “The HTML I see must match what I would render on the client.”

If server HTML ≠ client render → ❌ mismatch

### Example mismatch

```tsx
// Server
<p>{Date.now()}</p>

// Client
<p>{Date.now()}</p>
```

Times differ → HTML differs → hydration warning

---

# 7️⃣ Common causes of hydration errors

### ❌ Random values

```ts
Math.random()
Date.now()
```

### ❌ Browser-only APIs on server

```ts
window
localStorage
navigator
```

### ❌ Conditional rendering

```ts
if (typeof window !== "undefined")
```

---

# 8️⃣ How Next.js controls hydration (Server vs Client)

Next.js introduces:

### Server Components (default)

* Render on server
* Do NOT hydrate
* Send HTML only
* No JS shipped

### Client Components (`"use client"`)

* Hydrate in browser
* Can use:

  * `useState`
  * `useEffect`
  * events

Only **Client Components hydrate**.

---

# 9️⃣ Partial hydration (very important)

Next.js does **not hydrate everything**.

Example:

```tsx
<Page>
  <StaticHeader />   // Server component
  <Counter />        // Client component
</Page>
```

What happens:

* `<StaticHeader />` → HTML only
* `<Counter />` → HTML + hydration

This is called:

> **Selective / Partial Hydration**

It reduces JS size drastically.

---

# 🔟 What hydration looks like internally

Simplified view:

```
HTML nodes
↓
React Fiber tree
↓
Event listeners attached
↓
State initialized
```

DOM nodes are **claimed**, not replaced.

---

# 1️⃣1️⃣ Hydration in SSG vs SSR

| Mode | Hydration            |
| ---- | -------------------- |
| CSR  | No hydration         |
| SSG  | Hydration after load |
| SSR  | Hydration after load |
| ISR  | Hydration after load |

Hydration always happens **in browser**, regardless of how HTML was generated.

---

# 1️⃣2️⃣ Hydration and performance

### Pros

* Fast First Contentful Paint
* Better SEO
* Less blank screen

### Cons

* JS still needed
* Hydration cost on client

That’s why Next.js pushes **Server Components**.

---

# 1️⃣3️⃣ What happens if hydration is skipped?

* HTML shows
* Buttons don’t work
* No state updates
* Page feels “frozen”

This is why JS is still needed.

---

# 1️⃣4️⃣ Real-life analogy 🧠

Think of HTML as a **dead robot** 🤖

Hydration is:

> Plugging the brain + nervous system into it

Before hydration:

* Robot stands there

After hydration:

* Robot responds to clicks

---

# 1️⃣5️⃣ Advanced: Streaming + Suspense hydration

Next.js can:

* Stream HTML chunks
* Hydrate parts independently
* Prioritize visible UI

So hydration doesn’t block everything.

---

# 1️⃣6️⃣ One-sentence summary (lock this in)

> **Hydration is React attaching behavior to pre-rendered HTML without rebuilding the DOM.**