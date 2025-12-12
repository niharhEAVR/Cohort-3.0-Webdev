# 🚀 **Data Fetching in Next.js — The Three Modes**

Next.js handles data fetching **automatically** based on your `fetch()` options or your exported config (`revalidate`).
These modes decide:

* When your data is fetched
* Whether it is cached
* When it gets re-validated
* How often your server is hit

Let’s break them down one by one.

---

# ⭐ **1. SSR (Server-Side Rendering) — Fresh Data on Every Request**

### ✔ You use this when you want **ALWAYS fresh data**

(next time user loads the page → fetch runs again)

```ts
await fetch(url, { cache: "no-store" });
```

### 🔥 What happens:

* **No caching at all**
* Next.js fetches from the API **on every request**
* This means your API/database gets hits every time
* Good for:

  * dashboards
  * admin panels
  * real-time data
  * user-specific data (requires cookies/session)

### 🧠 Example (a dashboard page):

```tsx
// app/dashboard/page.tsx (SERVER COMPONENT)
export default async function Dashboard() {
  const data = await fetch("https://api.example.com/stats", {
    cache: "no-store",
  }).then(r => r.json());

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

🟢 **Result:** Every time the user refreshes `/dashboard`, new API call is made.

---

# ⭐ **2. SSG (Static Site Generation) — Cached at Build Time**

### ✔ This gives **maximum speed**

The fetch runs **once during build**, and the page becomes static.

```ts
await fetch(url, { cache: "force-cache" });
```

Or simply:

```ts
await fetch(url); // default = cached
```

### 🔥 What happens:

* The data is fetched **only at build time**
* HTML is generated and saved as a static file
* Zero server load afterward
* Good for:

  * blogs
  * marketing pages
  * product listing pages that rarely change

### 🧠 Example:

```tsx
// app/blog/page.tsx
export default async function Blog() {
  const data = await fetch("https://api.example.com/posts", {
    cache: "force-cache",
  }).then(r => r.json());

  return <BlogList posts={data} />;
}
```

🟢 **Result:** Page loads instantly, no backend hit.

---

# ⭐ **3. ISR (Incremental Static Regeneration)**

### ✔ **Static**, but refreshes after X seconds

This gives the best of both SSR + SSG.

You use:

```ts
export const revalidate = 10; // revalidate every 10 sec

await fetch(url);
```

### 🔥 What happens:

* Page is built like SSG (static)
* After the time expires:

  * First visitor triggers a background rebuild
  * New static page replaces old one

### Perfect for:

* News websites
* Ecommerce product data
* Profiles updated occasionally
* Any dynamic content that doesn’t need real-time updates

### 🧠 Example:

```tsx
// app/news/page.tsx
export const revalidate = 10;

export default async function News() {
  const data = await fetch("https://api.example.com/latest-news")
    .then(res => res.json());

  return <NewsList news={data} />;
}
```

🟢 **Result:**

* Users always get fast static pages
* Data updates every 10 seconds

---

# 📌 Summary Table

| Mode    | Fetch option                      | Cached? | When rebuilt?     | Usage                 |
| ------- | --------------------------------- | ------- | ----------------- | --------------------- |
| **SSR** | `cache: "no-store"`               | ❌ No    | Every request     | dashboards, real-time |
| **SSG** | `cache: "force-cache"` OR default | ✔ Yes   | Only during build | blogs, static pages   |
| **ISR** | `revalidate = X`                  | ✔ Yes   | Every X seconds   | ecommerce, news       |

---

# 🔥 How Next.js Figures Out the Rendering Mode?

➡️ **SSR**

* If any `fetch` is `no-store`
* Or you use dynamic data (cookies, headers)

➡️ **SSG**

* If all fetches are cached
* And no dynamic data is used

➡️ **ISR**

* If you set `export const revalidate = X`

---

# 🌟 Real-World Example (all three modes in one project)

### 1. **Profile Page (SSR)**

User-specific, must be fresh:

```tsx
const res = await fetch("/api/profile", { cache: "no-store" });
```

### 2. **Home Page (SSG)**

Static hero section, static features:

```tsx
const res = await fetch("/api/features");
```

### 3. **Products page (ISR)**

Products update every hour:

```tsx
export const revalidate = 3600;
```

---

# 🎯 Final Simplified Explanation

### ✔ **SSR**

Fetch **every time** → live data.

### ✔ **SSG**

Fetch **once** → static forever.

### ✔ **ISR**

Fetch **periodically** → static but auto-updating.

---
---
---
---
---

# ⭐ **10. Deploy Your Next.js App**

The easiest place:

### 👉 **Vercel (by the creators of Next.js)**

Just login → import GitHub repo → deploy.

You don’t configure anything — everything SSR/SSG/ISR is automatic.

---

# 🔹 **1. Why Vercel is so easy**

* You **don’t need to configure a server** — Vercel automatically runs your app in the right environment.
* **SSR, SSG, ISR** just work — Vercel detects your `next.config.js` and `app/` folder, and deploys appropriately.
* You don’t need to manually build `.next` or set up Node.js — Vercel handles all that for you.
* You can deploy directly from **GitHub, GitLab, or Bitbucket** — just connect your repo.

---

# 🔹 **2. How it works under the hood**

When you push your Next.js app:

1. **Vercel installs dependencies**

   * Runs `npm install` (or `pnpm` / `yarn`)
   * Installs only what’s needed for production

2. **Build step**

   * Runs `next build`
   * Creates `.next/` folder with optimized server & static output

3. **Deployment**

   * Serverless functions are created for **API routes** or **SSR pages**
   * Static pages (SSG) are served via **CDN**
   * ISR pages are cached and updated automatically

4. **Automatic URL**

   * Your app gets a live URL instantly, e.g., `https://my-app.vercel.app`

---

# 🔹 **3. The user experience**

* Click **“Import Project”** → select GitHub repo → hit **Deploy**
* Vercel detects it’s a Next.js app
* It sets up the build & runtime automatically
* Boom — your app is live with SSR, SSG, ISR, API routes, fonts, layouts — all working

No extra server configuration needed — unlike deploying a traditional Node.js app on VPS.

---

# 🔹 **4. When is it not fully automatic?**

Vercel handles most things automatically, but sometimes you may need to:

* Set environment variables (`.env` files)
* Configure custom domains
* Adjust revalidation time (`revalidate`) for ISR
* Handle edge functions or advanced caching

Even then, it’s mostly a **click + minimal config** process.

---

# 🔹 ✅ **5. TL;DR**

* Yes, it’s **easy and beginner-friendly**
* Designed for **Next.js first-class support**
* No need to manually build `.next` or configure Node.js server
* Deploys SSR, SSG, ISR, layouts, API routes automatically
* Perfect for small projects or production apps
