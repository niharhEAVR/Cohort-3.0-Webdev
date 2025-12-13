# 1️⃣ Why Next.js replaces native HTML tags

Next.js **does not replace HTML**.
It **wraps certain HTML tags with smarter components**.

Example:

| HTML       | Next.js                                             |
| ---------- | --------------------------------------------------- |
| `<img>`    | `<Image />`                                         |
| `<a>`      | `<Link />`                                          |
| `<script>` | `<Script />`                                        |
| `<head>`   | `<Head />` (Pages Router) / `metadata` (App Router) |

Why?

> Because **HTML tags are dumb** — they don’t know about performance, routing, or hydration.

Next.js **adds intelligence at framework level**.

---

# 2️⃣ `<Image />` vs `<img>`

### ❌ Native `<img>`

```html
<img src="/photo.png" />
```

Problems:

* No lazy loading control
* No size optimization
* No responsive images
* Layout shift (CLS)
* Always loads full image

Browser just downloads and displays.

---

### ✅ Next.js `<Image />`

```tsx
import Image from "next/image";

<Image
  src="/photo.png"
  alt="photo"
  width={300}
  height={300}
/>
```

What Next.js adds:

| Feature            | What happens                 |
| ------------------ | ---------------------------- |
| Automatic resizing | Serves right size per device |
| Lazy loading       | Loads only when in viewport  |
| WebP/AVIF          | Converts automatically       |
| Prevents CLS       | Needs width & height         |
| CDN optimization   | Cached globally              |

👉 Same image, **massively faster**.

---

# 3️⃣ `<Link />` vs `<a>`

### ❌ Native `<a>`

```html
<a href="/dashboard">Dashboard</a>
```

What happens:

* Full page reload
* HTML re-requested
* JS reloaded
* State lost

This is **MPA behavior**.

---

### ✅ Next.js `<Link />`

```tsx
import Link from "next/link";

<Link href="/dashboard">Dashboard</Link>
```

What Next.js adds:

| Feature                | Result                   |
| ---------------------- | ------------------------ |
| Client-side navigation | No full reload           |
| Prefetching            | Page loaded before click |
| Preserves layout       | Navbar stays             |
| Faster UX              | SPA-like                 |

Internally still renders:

```html
<a href="/dashboard">Dashboard</a>
```

But behavior is enhanced.

---

# 4️⃣ `<Script />` vs `<script>`

### ❌ Native `<script>`

```html
<script src="analytics.js"></script>
```

Problems:

* Blocks rendering
* Hard to control order
* Bad for performance

---

### ✅ Next.js `<Script />`

```tsx
import Script from "next/script";

<Script
  src="analytics.js"
  strategy="afterInteractive"
/>
```

Strategies:

| Strategy            | When script loads |
| ------------------- | ----------------- |
| `beforeInteractive` | Before hydration  |
| `afterInteractive`  | After page ready  |
| `lazyOnload`        | When browser idle |

This gives **fine-grained performance control**.

---

# 5️⃣ `<Head />` / Metadata

### Old (Pages Router)

```tsx
import Head from "next/head";

<Head>
  <title>My App</title>
</Head>
```

### New (App Router)

```ts
export const metadata = {
  title: "My App",
  description: "SEO friendly"
};
```

Next.js:

* Deduplicates tags
* Streams head content
* Prevents conflicts

---

# 6️⃣ Why Next.js cannot auto-fix HTML tags

You might ask:

> Why not auto-optimize `<img>` or `<a>`?

Because:

* Browser doesn’t expose hooks
* Framework must control behavior
* Explicit is safer than implicit

So Next.js gives **opt-in smart components**.

---

# 7️⃣ More Next.js-specific components

Here are the important ones you should know:

---

## 🔹 `<Image />`

Smart images (performance)

---

## 🔹 `<Link />`

Smart routing

---

## 🔹 `<Script />`

Smart script loading

---

## 🔹 `<Suspense />`

Smart async rendering (React, but heavily used in Next)

---

## 🔹 `<ErrorBoundary />`

Used internally by Next for error handling

---

## 🔹 `notFound()`, `redirect()`

Framework-level navigation helpers

```ts
redirect("/login");
notFound();
```

---

## 🔹 `next/font`

Font optimization (no layout shift)

```ts
import { Inter } from "next/font/google";
```

---

## 🔹 `Metadata API`

SEO without `<head>`

---

# 8️⃣ Important rule (VERY IMPORTANT)

> **Use native HTML unless Next.js gives you a reason not to.**

| Case                           | Use         |
| ------------------------------ | ----------- |
| Image                          | `<Image />` |
| Internal link                  | `<Link />`  |
| External link                  | `<a>`       |
| Simple div/span                | native HTML |
| External image CDN (sometimes) | `<img>`     |

---

# 9️⃣ Final mental model (save this)

> **Next.js components are HTML + framework intelligence**

They exist to:

* Improve performance
* Improve UX
* Improve SEO
* Reduce footguns

---

## 🔚 Final takeaway

Next.js doesn’t reinvent HTML —
it **augments the parts that matter most**.

You’re asking the **right architectural questions** now.

---
---
---
---

