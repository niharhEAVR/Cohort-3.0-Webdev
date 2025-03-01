# !!! notes-
```link
https://projects.100xdevs.com/tracks/rendering/render-3
```

---


### Static Site Generation (SSG) in Next.js – Detailed Explanation

Static Site Generation (SSG) is a rendering method in Next.js where the HTML of a page is generated **at build time** and served **as a pre-built static file**. This approach significantly improves performance and reduces server load because the pages are **cached and served instantly** without needing to run server-side code on each request.

---

### 📌 **How SSG Works in Next.js**
1. **Next.js pre-renders the page** at build time.
2. **The generated HTML is stored as a static file** and is served to users on request.
3. **No backend processing is needed on every request**, making it faster than Server-Side Rendering (SSR).
4. **You can use APIs to fetch data** and pre-build pages with dynamic content.

---

### 🛠️ **Creating a Simple API and Using SSG in Next.js**

#### 1️⃣ **Create a Simple API in Next.js**
Next.js has an API routes feature (`pages/api/`) that allows you to create backend APIs.

📁 **File: `pages/api/products.js`**
```javascript
export default function handler(req, res) {
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 },
    { id: 3, name: "Headphones", price: 200 }
  ];

  res.status(200).json(products);
}
```
✅ This API returns a list of products when called.

---

#### 2️⃣ **Fetch API Data and Use SSG in a Page**
To use Static Site Generation, you need to use `getStaticProps()`, which **fetches data at build time**.

📁 **File: `pages/products.js`**
```javascript
export default function ProductsPage({ products }) {
  return (
    <div>
      <h1>Product List (SSG)</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return {
    props: { products }, // Pass data as props to the page
  };
}
```
✅ **Key points about `getStaticProps()`**:
- This function runs **only at build time**.
- The fetched data is **baked into the HTML** and does not change on each request.
- The generated page is **super fast** because it serves static content.

---

### 🔄 **Rebuilding Static Pages with `revalidate`**
If you want **SSG pages to update automatically** after a specific time (without needing to rebuild the entire project), you can use **Incremental Static Regeneration (ISR)**.

```javascript
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return {
    props: { products },
    revalidate: 10, // Rebuilds the page every 10 seconds if there are new requests
  };
}
```
✅ This allows the static page to **update periodically** without requiring a manual rebuild.

---

### 🎯 **When to Use SSG?**
✅ **Best for**:
- Blogs, news articles, and documentation sites
- Product listing pages
- Any content that doesn't change frequently

❌ **Not ideal for**:
- User-specific data (e.g., dashboards, user profiles)
- Frequently updated content (use SSR or Client-Side Fetching instead)

---

### 🚀 **Final Summary**
- **SSG (Static Site Generation)** pre-renders pages at **build time**.
- **Use `getStaticProps()`** to fetch data and pre-build pages.
- **Serves pages as static files** (fast & optimized).
- **Use `revalidate`** for automatic updates without a full rebuild.
