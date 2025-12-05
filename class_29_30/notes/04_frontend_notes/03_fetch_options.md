# Fetch options — quick list (what you’ll see)

* `method` — HTTP verb (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`)
* `headers` — request headers (Content-Type, Authorization, custom headers)
* `body` — payload (string, `FormData`, `Blob`, `URLSearchParams`, etc.)
* `mode` — `cors` | `no-cors` | `same-origin`
* `credentials` — `omit` | `same-origin` | `include` (cookies)
* `cache` — `default` | `no-store` | `reload` | `no-cache` | `force-cache` | `only-if-cached`
* `redirect` — `follow` | `error` | `manual`
* `referrer` and `referrerPolicy`
* `integrity` — subresource integrity (SRI) string
* `keepalive` — allow request to outlive page (used for analytics/beacons)
* `signal` — `AbortController().signal` (cancel/timeout)
* `duplex` — for streaming request bodies (fetch streaming proposals; rarely used)
* `window` — not user-settable in browsers (ignored)

---

# Important concepts & when they matter

### 1) `method` + `body`

* `GET` and `HEAD` must not have a body (some browsers ignore it). Put params in query string.
* `POST`, `PUT`, `PATCH`, `DELETE` may include `body`. For JSON API: `body = JSON.stringify(payload)` and `headers["Content-Type"]="application/json"`.

Example (POST JSON):

```js
await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "buy milk" })
});
```

Example (GET with query params):

```js
const params = new URLSearchParams({ q: "fetch", page: 1 });
await fetch(`/api/search?${params.toString()}`, { method: "GET" });
```

### 2) `headers`

* Always set `Content-Type` appropriately for body type.
* Custom headers (e.g. `X-Client-Version`) trigger preflight (CORS) if not simple.
* `Authorization: Bearer <token>` for token-based auth.

### 3) `credentials`

Controls cookies sent with request:

* `omit` — never send cookies
* `same-origin` — send cookies for same origin
* `include` — always include cookies (even cross-origin)

If you use `credentials: "include"`, server must respond with:

```
Access-Control-Allow-Origin: http://your.app.origin
Access-Control-Allow-Credentials: true
```

**You cannot use `*` for `Access-Control-Allow-Origin` when sending credentials.**

Example (send cookies):

```js
fetch("/api/profile", { credentials: "include" })
```

### 4) `mode`

* `cors` — default cross-origin behavior (use for API on other origin)
* `no-cors` — severely restricted; response is opaque; avoid for real API work
* `same-origin` — only same-origin requests allowed

Don't use `no-cors` to "avoid CORS errors" — it hides the response.

### 5) `signal` (AbortController) — cancel & timeouts

Use `AbortController` to cancel or implement timeouts:

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch("/api/long", { signal: controller.signal });
  const data = await res.json();
} catch (err) {
  if (err.name === "AbortError") console.log("request timed out");
  else throw err;
} finally {
  clearTimeout(timeout);
}
```

### 6) `cache` and `redirect`

* `cache` helpful when you want to bypass browser cache for GET
* `redirect` choose how to handle 3xx responses

### 7) `keepalive`

Small requests when unloading page (analytics). Not for large bodies.

### 8) Preflight CORS basics (when browser sends OPTIONS)

A preflight is sent if request uses:

* Method other than `GET`, `HEAD`, `POST` **or**
* Custom headers (anything not a “simple header”) **or**
* `Content-Type` not one of `text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`

If preflight occurs, server must respond to `OPTIONS` with:

* `Access-Control-Allow-Origin`
* `Access-Control-Allow-Methods`
* `Access-Control-Allow-Headers`
* `Access-Control-Allow-Credentials` (if credentials used)

---

# Real-world examples & patterns

### 1) Simple GET (no cookies)

```js
const res = await fetch("/api/posts");
if (!res.ok) throw new Error(res.statusText);
const posts = await res.json();
```

### 2) GET with cookies (auth by cookie)

```js
const res = await fetch("https://api.example.com/me", {
  method: "GET",
  credentials: "include"
});
```

Server must allow origin + credentials.

### 3) POST JSON with Authorization header (token)

```js
const token = localStorage.getItem("token");
const res = await fetch("/api/notes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ title: "note" })
});
```

### 4) File upload (FormData)

```js
const fd = new FormData();
fd.append("avatar", fileInput.files[0]);
fd.append("name", "Nihar");

// Important: do NOT set Content-Type — browser sets multipart boundary
const res = await fetch("/api/upload", {
  method: "POST",
  body: fd,
  credentials: "include"
});
```

### 5) `application/x-www-form-urlencoded` (legacy forms)

```js
const body = new URLSearchParams({ username, password }).toString();
fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body
});
```

### 6) Streaming response (download chunked data)

```js
const res = await fetch("/api/large-file");
if (!res.body) throw new Error("Streaming not supported");
const reader = res.body.getReader();
let done = false;
while (!done) {
  const { value, done: streamDone } = await reader.read();
  if (value) { /* process chunk */ }
  done = streamDone;
}
```

### 7) Long-polling / keepalive for background tasks

* Use `fetch` with `keepalive: true` on small send-before-unload analytics.

---

# Advanced: robust fetch wrapper (TypeScript)

This includes defaults, JSON handling, timeout, retry and token refresh on 401.

```ts
// api.ts
type Options = RequestInit & { retry?: number };

const BASE = "https://api.example.com";

async function jsonOrText(res: Response) {
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

async function fetchWithTimeout(url: string, opts: Options = {}, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function api(endpoint: string, opts: Options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE}${endpoint}`;
  const defaults: RequestInit = {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // choose based on your auth method
  };

  const merged: RequestInit = {
    ...defaults,
    ...opts,
    headers: { ...(defaults.headers as Record<string,string>), ...(opts.headers as Record<string,string>|undefined) }
  };

  let attempts = opts.retry ?? 0;

  while (true) {
    let res: Response;
    try {
      res = await fetchWithTimeout(url, merged, 10000);
    } catch (err) {
      if (err.name === "AbortError") {
        if (attempts-- > 0) continue;
        throw new Error("Request timeout");
      }
      if (attempts-- > 0) continue;
      throw err;
    }

    if (res.status === 401) {
      // try refresh token once (implement refreshToken())
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        // update Authorization header and retry once
        const token = localStorage.getItem("token");
        merged.headers = { ...(merged.headers as Record<string,string>), Authorization: `Bearer ${token}` };
        res = await fetchWithTimeout(url, merged, 10000);
      } else {
        throw { code: 401, message: "Unauthorized" };
      }
    }

    if (!res.ok) {
      const data = await jsonOrText(res).catch(() => ({}));
      throw { status: res.status, body: data };
    }

    return jsonOrText(res);
  }
}

// Dummy token refresh
async function tryRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;
  try {
    const r = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include"
    });
    if (!r.ok) return false;
    const data = await r.json();
    localStorage.setItem("token", data.token);
    return true;
  } catch { return false; }
}
```

Use:

```ts
await api("/notes", { method: "GET" });
await api("/notes", { method: "POST", body: JSON.stringify({ title: "x" }) });
```

---

# Exponential backoff (retry) pattern

```js
async function retryFetch(url, opts, retries = 3, delay = 300) {
  try { return await fetch(url, opts); }
  catch (err) {
    if (retries === 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return retryFetch(url, opts, retries - 1, delay * 2);
  }
}
```

Use backoff for network errors or 5xx, but **not** for 4xx client errors.

---

# Preflight gotchas & tips

* Custom headers (e.g., `X-My-Header`) cause preflight; keep headers minimal.
* `Content-Type` of `application/json` causes preflight — unavoidable for JSON APIs.
* For cookies with cross-origin, server must set `Access-Control-Allow-Credentials: true` and return specific `Access-Control-Allow-Origin`.

---

# Common mistakes & how to avoid them

* Forgetting to `await res.json()` — leads to unresolved promise.
* Assuming fetch throws on 4xx/5xx — it doesn’t. Check `res.ok`.
* Setting `Content-Type` with `FormData` — don’t set it manually.
* Using `no-cors` to avoid CORS — response will be opaque and unusable.
* Not handling AbortController (memory leaks/timeouts).

---

# Best-practice checklist (copy this)

* Use a base wrapper (`api()`), centralize `BASE_URL`, `credentials`, auth header injection.
* Always check `res.ok` before parsing body.
* Use `AbortController` for timeouts & ability to cancel.
* Retry network failures with exponential backoff (not for auth errors).
* Implement refresh-token logic (server must support it).
* Log or surface server error body (res.json()) for debugging.
* Keep CORS minimal but correct on server (allow origin + credentials if cookies used).
* Use `FormData` for file uploads; don’t set `Content-Type` manually.
* Prefer `URLSearchParams` for `application/x-www-form-urlencoded` if required.
