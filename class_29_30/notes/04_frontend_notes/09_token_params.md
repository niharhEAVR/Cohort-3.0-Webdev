# Hoe to use `useParams()` in a React (React Router v6+) app and get route parameters.

---

# ✅ **Step 1: Define a route with a parameter**

Example: you want to capture a `token`:

```tsx
import { Routes, Route } from "react-router-dom";
import ResetPassPage from "./ResetPassPage";

function App() {
  return (
    <Routes>
      <Route path="/resetpass/:token" element={<ResetPassPage />} />
    </Routes>
  );
}

export default App;
```

Now the URL looks like:

```
http://localhost:5173/resetpass/7249ba86f7e084ba470f2f3dd22942...
```

OR if you want a query string instead:

```
http://localhost:5173/resetpass?token=abc123
```

(both examples will be shown below)

---

# ✅ **Step 2: Use `useParams()` inside your component**

```tsx
import { useParams } from "react-router-dom";

export function ResetPassPage() {
  const { token } = useParams();

  console.log("Token from URL:", token);

  return <div>Your token is: {token}</div>;
}
```

✔ `token` will be a string
✔ If no param exists → `undefined`

---

# ⭐ If your URL uses **query parameters** instead of route parameters

Example URL:

```
/resetpass?token=abc123
```

Then **use `useSearchParams()`**, not `useParams()`.

---

# 🔄 **Using search params**

```tsx
import { useSearchParams } from "react-router-dom";

export function ResetPassPage() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  console.log("Query token:", token);

  return <div>Your token is: {token}</div>;
}
```

---

# 📌 Summary

## ✔ Route params → `useParams()`

URL example:

```
/resetpass/abc123
```

```ts
const { token } = useParams();
```

---

## ✔ Query params → `useSearchParams()`

URL example:

```
/resetpass?token=abc123
```

```ts
const token = searchParams.get("token");
```

---
---
---

React Router **does NOT support query strings inside the route path**.
This is why your route:

```tsx
<Route path="/resetpass?token=" element={<ResetPassWrapper />} />
```

❌ **does NOT work**
❌ React Router will never match this
❌ `useSearchParams()` will not get the token unless the route exists

---

# ✅ **Correct Route (NO query string in path)**

```tsx
<Route path="/resetpass" element={<ResetPassWrapper />} />
```

✔ Query params are NOT part of the route
✔ React Router automatically keeps them
✔ `useSearchParams()` works perfectly

---

# 🔥 Example — Complete Setup

### **App.tsx**

```tsx
import { Routes, Route } from "react-router-dom";
import { ResetPassWrapper } from "./ResetPassWrapper";

export default function App() {
  return (
    <Routes>
      <Route path="/resetpass" element={<ResetPassWrapper />} />
    </Routes>
  );
}
```

### **URL**

```
http://localhost:5173/resetpass?token=1234567890abcdef
```

---

# 🔥 Inside ResetPassWrapper (or ResetPassPage)

```tsx
import { useSearchParams } from "react-router-dom";

export function ResetPassWrapper() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  console.log("Token:", token);

  return <ResetPassPage token={token} />;
}
```

---

# ⭐ Or directly inside ResetPassPage

```tsx
import { useSearchParams } from "react-router-dom";

export function ResetPassPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return <div>Token = {token}</div>;
}
```

---

# 📌 Summary

**Use this:**

```tsx
<Route path="/resetpass" element={<ResetPassWrapper />} />
```

**NOT this:**

```
/resetpass?token=
```

Query params belong **in the URL**, not in the route.
