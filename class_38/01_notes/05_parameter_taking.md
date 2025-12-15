## 1️⃣ Start from the URL (the real source)

Assume your folder structure is:

```
app/blog/[postId]/page.tsx
```

Now the user opens:

```
/blog/123
```

This URL is the **starting point** of everything.

---

## 2️⃣ How Next.js reads the URL

When a request comes in:

1. Next.js parses the URL path

   ```
   /blog/123
   ```

2. It matches the path against your folder structure:

   ```
   blog      → static folder
   [postId]  → dynamic segment
   ```

3. It extracts the value:

   ```
   postId = "123"
   ```

At this point, Next.js has **raw routing data**.

---

## 3️⃣ Why Next.js creates a `params` object

Instead of passing a single value, Next.js always creates an **object**:

```ts
params = {
  postId: "123"
}
```

Why an object?

Because:

* A route can have **multiple dynamic segments**
* Example:

  ```
  /blog/[category]/[postId]
  ```
* That would produce:

  ```ts
  { category: "tech", postId: "123" }
  ```

So `params` is a **container** for all route values.

---

## 4️⃣ How `params` reaches your page function

Your page function:

```ts
export default async function Blogpage({ params })
```

This means:

> “Next.js, call this function and inject the route parameters into `params`.”

Internally, Next.js does something conceptually like:

```ts
Blogpage({ params: { postId: "123" } })
```

You never call this function yourself — **the framework does**.

---

## 5️⃣ Why your function is `async`

Next.js pages can be `async` because:

* They run on the **server**
* Server code can wait
* Data fetching, routing, layouts, streaming all happen asynchronously

So Next.js allows:

```ts
async function Page() { ... }
```

This gives you freedom to:

* Fetch data
* Read params
* Access databases

---

## 6️⃣ Why `params` can behave like a Promise

In the App Router, Next.js treats request-related inputs (`params`, `searchParams`, headers, cookies) as **async-compatible values**.

This allows Next.js to:

* Resolve routing lazily
* Support streaming
* Coordinate layouts and nested routes

So conceptually:

```ts
params → resolved during request lifecycle
```

Because of that, `params` can be **awaited safely**.

---

## 7️⃣ What `(await params)` actually does

When you write:

```ts
const postId = (await params).postId
```

Step by step:

1. `await params`
   → waits until routing information is fully resolved

2. The result is a plain object:

   ```ts
   { postId: "123" }
   ```

3. `.postId` extracts the value

So `postId` becomes:

```ts
"123"
```


---
---
---
---
---

# 🧠 First: Forget Next.js for 2 minutes

Let’s start with **plain JavaScript**.

## 1️⃣ What is a Promise (visual)

A Promise means:

> “I will give you a value **later**, not now.”

Example:

```js
const value = new Promise(resolve => {
  setTimeout(() => resolve(123), 1000)
})
```

Right now:

* `value` ❌ is NOT `123`
* `value` ✅ is a **box that will contain 123 later**

To open the box:

```js
const result = await value
```

Now `result === 123`

📦 Promise = closed box
🔓 await = open the box

---

# 🧠 Now imagine Next.js request flow (VERY important)

When a user hits:

```
/blog/123
```

Next.js does **many things at once**:

* match route
* resolve layouts
* resolve nested routes
* stream HTML
* prepare server components

⚠️ These things do **NOT happen line-by-line** like normal JS.

They happen in a **pipeline**.

---

# 🧠 Visualization: Next.js rendering pipeline

Think of Next.js like a **factory belt** 🏭

```
Request enters
   ↓
Route matching starts
   ↓
Layouts resolving
   ↓
Page rendering
   ↓
HTML streamed
```

Now here is the KEY idea:

> At the moment your `Page()` function starts running,
> **route params might not be fully finalized yet.**

So Next.js does this:

### Instead of giving you params directly:

```js
params = { postId: "123" }
```

### It gives you:

```js
params = Promise<{ postId: "123" }>
```

Meaning:

> “I promise I’ll give you the params once routing is fully settled.”

📦 params is a **box**, not the value.

---

# 🧠 Why does Next.js do this?

Because Next.js supports:

* Streaming
* Suspense
* Parallel routes
* Nested layouts

Example:

```
app/
 ├ layout.tsx
 ├ blog/
 │   ├ layout.tsx
 │   └ [postId]/
 │       └ page.tsx
```

All these layers may need params.

So Next.js says:

> “I’ll finalize params once **everyone is ready**.”

Hence: **Promise**

---

# 🧠 Visualizing your exact code

Your code:

```ts
export default async function Blogpage({
  params
}: {
  params: Promise<{ postId: string }>
}) {
  const postId = (await params).postId
}
```

### Step-by-step reality

1️⃣ Function starts

```js
params = Promise (still resolving)
```

2️⃣ You write:

```js
await params
```

This means:

> “Pause THIS function until the routing system finishes.”

3️⃣ Next.js finishes route resolution

4️⃣ Promise resolves:

```js
{ postId: "123" }
```

5️⃣ You extract:

```js
postId = "123"
```

---

# 🧠 Why not just give params directly?

Because then Next.js would have to:

❌ block streaming
❌ block layouts
❌ block parallel rendering

Promises allow **lazy resolution**.

---

# 🧠 Very important comparison (THIS clicks it)

## Normal React (client)

```js
function Page() {
  const params = { postId: "123" } // already known
}
```

Client already knows the URL.

---

## Next.js Server (App Router)

```js
async function Page({ params }) {
  // params may still be resolving
}
```

Server is still **building the page**.

---

# 🧠 Real-world analogy (best one)

Imagine ordering food 🍔

* You place order
* Kitchen starts cooking
* Meanwhile waiter sets table

Now:

```js
const food = kitchen.promise()
```

You **can’t eat yet**.

```js
await food
```

Now food arrives.

👉 `params` is the **order**, not the food.

---

# 🧠 Why you MUST await it

If you don’t:

```js
console.log(params.postId)
```

You’re doing:

> “Try to read food inside a closed box.”

Boom 💥 error.

---

# 🧠 Why this feels confusing

Because:

* In older Next.js / Pages Router
* In client React

`params` was **sync**

But App Router is:

* async-first
* streaming-first
* server-first

---

# 🧠 One-line visualization (lock this)

> **In App Router, `params` is a Promise because routing is part of an async server pipeline, and `await params` means “wait until Next.js finishes figuring out the route.”**

---
---
---
---
---
---

## 8️⃣ Why `postId` is always a string

URLs are text.

Even if you visit:

```
/blog/42
```

The value comes from the URL path, so it’s always:

```ts
typeof postId === "string"
```

If you need a number, you convert it yourself.