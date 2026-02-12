We’ll create 2 small pages:

1. ✅ Pure SSG
2. 🔁 ISR (updates every 5 seconds)

You can literally refresh and see the difference.

---

# 🧪 Step 0: Create a New Next App (if needed)

```bash
npx create-next-app@latest ssg-demo
cd ssg-demo
npm run dev
```

Using App Router.

---

# ✅ 1️⃣ Pure SSG Example (Never Updates)

Create:

```
app/ssg/page.tsx
```

```ts
export default async function Page() {
  const time = new Date().toLocaleTimeString()

  return (
    <div>
      <h1>Pure SSG Page</h1>
      <p>Generated at: {time}</p>
    </div>
  )
}
```

Now run:

```bash
npm run build
npm start
```

Visit:

```
http://localhost:3000/ssg
```

### 🧠 What You’ll See:

The time will NEVER change.
Even if you refresh 100 times.

Because:

* It was generated at build time.
* It’s static HTML.

---

# 🔁 2️⃣ ISR Example (Updates Every 5 Seconds)

Now create:

```
app/isr/page.tsx
```

```ts
export const revalidate = 5

export default async function Page() {
  const time = new Date().toLocaleTimeString()

  return (
    <div>
      <h1>ISR Page</h1>
      <p>Generated at: {time}</p>
    </div>
  )
}
```

Again run:

```bash
npm run build
npm start
```

Visit:

```
http://localhost:3000/isr
```

---

## 🧠 What Happens Now?

* Refresh within 5 seconds → Same time
* Wait 5+ seconds → Refresh → Time changes

🔥 That is ISR working.

It regenerates after 5 seconds when requested.

---

# 📊 What You’ll See In Build Output

During `next build` you’ll see:

```
○ /ssg  (Static)
● /isr  (ISR)
```

---

# 🔥 Now Let’s Make It More Real (API Example)

Replace ISR page with this:

```ts
export const revalidate = 5

export default async function Page() {
  const res = await fetch(
    "https://sum-server.100xdevs.com/todos"
  )

  const data = await res.json()

  return (
    <div>
      <h1>ISR with API</h1>
      <p>Time: {new Date().toLocaleTimeString()}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

Now:

* Data is cached
* After 5 seconds → refetch happens
* Page regenerates

---

# 🎯 Important: Don’t Test in `npm run dev`

In development mode:

* Everything behaves like dynamic
* Caching is ignored

Always test with:

```bash
npm run build
npm start
```

---

# 🧠 Visual Mental Model

### Pure SSG

```
BUILD → HTML saved → Always same
```

### ISR

```
BUILD → HTML saved
   ↓
User after 5 sec → Old page served
   ↓
Background rebuild
   ↓
New page saved
```

---

# 💡 Why This Is Powerful

For your **Second Brain share page**:

* You can statically generate public pages.
* Revalidate every 60 seconds.
* Zero DB load for most requests.
* Still stays updated.
