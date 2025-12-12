# 🔹 **1. What is an API Route in Next.js?**

Normally, in web apps you have:

* **Frontend** → React/Next.js pages
* **Backend** → Node.js, Express, Python, Java, etc.

Next.js lets you **write backend code inside your frontend project** using API Routes.
You can think of them as **serverless functions**:

* They run **on the server**
* Can handle HTTP requests (`GET`, `POST`, etc.)
* Can access DB or external APIs
* Don’t get sent to the browser

---

# 🔹 **2. Folder & File Structure**

Example:

```
app/
  api/
    users/
      route.ts
```

* `app/api/` → All API routes
* `users/route.ts` → handles `/api/users` requests

---

# 🔹 **3. Basic API Route Example**

```ts
// app/api/users/route.ts
export async function GET() {
  return Response.json({ message: "hello" });
}
```

### How it works:

* Browser or frontend makes a GET request to `/api/users`
* Next.js executes the function on the **server**
* Returns a JSON response:

```json
{
  "message": "hello"
}
```

---

# 🔹 **4. Features of Next.js API Routes**

| Feature                        | Explanation                       |
| ------------------------------ | --------------------------------- |
| Runs on server                 | Code never goes to the browser    |
| Can use server-side modules    | `fs`, database clients, etc.      |
| Supports multiple HTTP methods | `GET`, `POST`, `PUT`, `DELETE`    |
| Optional                       | You can also use external backend |

---

# 🔹 **5. Example with POST request**

```ts
// app/api/users/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  return Response.json({ message: `Hello ${data.name}` });
}
```

Now, from frontend:

```ts
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify({ name: "Nihar" })
});
```

Response:

```json
{ "message": "Hello Nihar" }
```

---

# 🔹 **6. Why this is useful**

* No need for a separate backend if you just need small APIs
* Ideal for SSR pages that fetch server-side data
* Can quickly create CRUD operations
* Fully integrated with Next.js routing

---

# 🔹 **7. Optional**

You **don’t have to use API Routes**.
You can still use:

* Python backend
* Express/Node.js server
* Any external API

Next.js API routes are **just a convenient serverless backend** bundled with your app.

---

# ✅ **Summary**

* **API Route** = backend endpoint inside your Next.js app
* **Folder** = `app/api/<route>/route.ts`
* **Function** = `GET`, `POST`, etc.
* Runs on **server**, not browser
* Useful for small backend tasks, but optional