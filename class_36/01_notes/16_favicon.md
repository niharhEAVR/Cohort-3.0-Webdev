# 🔥 **React (CRA)**

In React:

* `public/favicon.ico`
* `<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />` inside **public/index.html**

So the HTML *manually* includes your favicon.

---

# 🔥 **Next.js (App Router)**

There is **no `index.html`** and you NEVER manually write:

```html
<link rel="icon" ... >
```

Then how does it work?

---

# ⭐ **In Next.js → `favicon.ico` is automatically detected from the `app/` or `public/` folder**

## ✔ Option 1: If `favicon.ico` is inside `/public`

```
public/
   favicon.ico
   robots.txt
   sitemap.xml
```

👉 Next.js **automatically adds**:

```html
<link rel="icon" href="/favicon.ico" />
```

to the `<head>` of every page.

You don’t need to configure anything.

---

# ⭐ **Option 2: If favicon is inside the `app/` folder**

You can create:

```
app/
   favicon.ico
   icon.png
   apple-icon.png
```

Next.js handles them automatically.

---

# ⭐ How does Next.js know which icon to use?

Next.js has **automatic metadata rules**:

### If `app/favicon.ico` exists

→ It becomes the default site favicon

### If `public/favicon.ico` exists

→ That becomes the default favicon

### If both exist

→ One in `app/` takes priority.

---

# ⭐ Example: the simplest favicon setup

```
public/
   favicon.ico

app/
   layout.tsx
   page.tsx
```

You don’t need to import it anywhere.
You don’t write `<head>` tags.

Next.js injects:

```html
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
```

automatically.

---

# ⭐ Want custom favicons?

You can place:

```
app/
   icon.png        // for browsers
   apple-icon.png  // for iOS screens
   manifest.json   // for PWA
```

All of these will automatically be added to `<head>`.

---

# ⭐ Want full manual control?

You can define favicons using **metadata API**:

```ts
export const metadata = {
  icons: {
    icon: "/my-icon.png",
    apple: "/apple-icon.png",
  },
};
```

Next.js generates the proper `<link>` tags for you.

---

# 🎯 Final Summary (simple)

| React SPA                                           | Next.js                                                |
| --------------------------------------------------- | ------------------------------------------------------ |
| Must manually reference favicon inside `index.html` | Automatically detected from `public/` or `app/`        |
| Browser loads it via `<link rel="icon">`            | Next.js injects the `<link>` automatically in `<head>` |
| You control HTML manually                           | Next.js controls `<head>` through metadata API         |