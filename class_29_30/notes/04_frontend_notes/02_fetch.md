If you learn **Fetch deeply**, Axios becomes super easy because Axios is basically:

> “Fetch + convenience features”

So let’s build your Fetch knowledge **from 0 → real-world → advanced → enterprise-level**.

---

# 🎯 **FETCH — FULL IN-DEPTH GUIDE**

*(Clean explanations + real world examples)*

---

# 1️⃣ **What is Fetch?**

Fetch is a **built-in browser API** to make HTTP requests.

Basic example:

```ts
const res = await fetch("https://api.example.com/users");
const data = await res.json();
console.log(data);
```

---

# 2️⃣ **Fetch Request Options**

Fetch has only **one function**, but with a big options object:

```ts
fetch(url, {
  method: "POST",
  headers: {...},
  body: JSON.stringify(...),
  credentials: "include",
  signal: controller.signal,
});
```

---

# 3️⃣ **Response Handling**

Fetch returns a `Response` object.

Important properties:

| Property         | Meaning          |
| ---------------- | ---------------- |
| `res.ok`         | true for 200–299 |
| `res.status`     | status code      |
| `res.headers`    | headers          |
| `res.json()`     | parse JSON       |
| `res.text()`     | plain text       |
| `res.blob()`     | files            |
| `res.formData()` | forms            |

---

# 4️⃣ **Fetch DOES NOT throw errors on 400/500**

This is a common trap.

```ts
const res = await fetch(...);

if (!res.ok) {
  throw new Error("API failed: " + res.status);
}
```

---

# 5️⃣ **Sending JSON**

```ts
await fetch("/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
});
```

---

# 6️⃣ **Sending Cookies / JWT tokens**

This you will need in real apps.

### Include cookies:

```ts
fetch("/api/profile", {
  credentials: "include",
});
```

### Include token:

```ts
fetch("/api/user", {
  headers: {
    Authorization: "Bearer " + token,
  },
});
```

---

# 7️⃣ **AbortController — Cancel Request / Timeout**

Huge real-world feature.

```ts
const controller = new AbortController();

setTimeout(() => controller.abort(), 5000);

const res = await fetch(url, { signal: controller.signal });
```

---

# 8️⃣ **File Upload with Fetch**

```ts
const fd = new FormData();
fd.append("image", file);

await fetch("/api/upload", {
  method: "POST",
  body: fd,
});
```

No need for headers — browser sets multipart boundaries.

---

# 9️⃣ **Handling Errors Properly**

Proper pattern:

```ts
async function api(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw { status: res.status, ...err };
    }

    return res.json();
  } catch (e) {
    console.error("Network error:", e);
    throw e;
  }
}
```

---

# 🔟 **Creating a Fetch Wrapper (like Axios Instance)**

Every real project uses this.

```ts
const BASE_URL = "http://localhost:3000/api/v1";

async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!res.ok) throw await res.json();

  return res.json();
}
```

Usage:

```ts
api("/notes");
api("/signin", {
  method: "POST",
  body: JSON.stringify({ username, password })
});
```

This wrapper = **Axios instance**.

---

# 1️⃣1️⃣ **Interceptors in Fetch (Yes, Possible)**

You can mimic interceptors:

### Request interceptor:

```ts
function requestInterceptor(options) {
  const token = localStorage.getItem("token");
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}
```

### Response interceptor / auto-refresh token:

```ts
async function api(url, options = {}) {
  const modifiedOptions = requestInterceptor(options);

  let res = await fetch(url, modifiedOptions);

  // Auto refresh token
  if (res.status === 401) {
    await refreshToken();
    res = await fetch(url, requestInterceptor(options));
  }

  return res.json();
}
```

---

# 1️⃣2️⃣ **Retry Logic**

In real-world APIs, this is necessary:

```ts
async function fetchWithRetry(url, options, retries = 3) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (retries === 0) throw err;
    return fetchWithRetry(url, options, retries - 1);
  }
}
```

---

# 1️⃣3️⃣ **Fetch in Node.js (backend)**

Node 18+ supports fetch natively, but not all features (like AbortController nuances).

```ts
const res = await fetch("https://example.com");
```

---

# 1️⃣4️⃣ **Fetch Streaming (Advanced)**

For big downloads:

```ts
const res = await fetch(url);
const reader = res.body.getReader();
```

For chat apps or real-time server streaming.

---

# 1️⃣5️⃣ **Fetch CORS Behavior**

Huge topic → especially you are facing CORS errors recently.

Important rules:

* With `credentials: "include"` → server **cannot** return `*`
* Must set `Access-Control-Allow-Origin: http://localhost:5173`
* Must set `Access-Control-Allow-Credentials: true`

---

# 🎯 At This Point

If you learn everything above, **you have mastered real-world Fetch**.

Next step → Axios will feel like cheating 😄
Because Axios just automates the wrapper you built.

---
---
---


