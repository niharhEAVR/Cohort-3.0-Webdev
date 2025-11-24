Custom Hooks in React are **reusable functions** that let you extract and share logic between components **without repeating code**.
They start with the name **`useSomething`** and internally use React hooks like `useState`, `useEffect`, `useRef`, etc.

---

# ✅ **Why do we need Custom Hooks? (Simple & Clear)**

### ### ❌ Before Custom Hooks

When multiple components need the same logic (e.g., fetching data, authentication status, online/offline check, timers…), you end up **copy–pasting** the same `useEffect`, `useState`, etc., into each component.

This leads to:

* Repetitive code
* Hard-to-maintain code
* Bugs when you forget to update logic everywhere

---

### ### ✔ With Custom Hooks

You can **move the logic into a single reusable hook**, and use it anywhere.

This gives:

* Clean & readable components
* No repeated code
* Easy debugging
* Shared logic across the app

---

# 🧠 Real-World Example: Why Custom Hooks?

Let’s say three components need to fetch user data:

* Navbar
* Dashboard
* Settings

Without custom hooks → **all 3 components need same API call logic**.

With custom hooks → write code **once** inside `useUser()`, and reuse it.

---

# 📌 **Example Without Custom Hook (BAD – Repeated code)**

```jsx
function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return <div>Hello, {user?.name}</div>;
}

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return <div>Dashboard for {user?.name}</div>;
}
```

🚨 Both components have **duplicated logic**.

---

# 📌 **Example WITH Custom Hook (GOOD – Reusable logic)**

### Step 1: Create the hook

```jsx
// useUser.js
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return user;
}
```

### Step 2: Use it anywhere

```jsx
function Navbar() {
  const user = useUser();
  return <div>Hello, {user?.name}</div>;
}

function Dashboard() {
  const user = useUser();
  return <div>Dashboard for {user?.name}</div>;
}
```

🎉 **No repeated code**
🎉 **Logic is shared perfectly**

---

# 🔥 When Should You Create a Custom Hook?

Whenever you notice:

### ✔ Repeated useState + useEffect logic

### ✔ Repeated local storage operations

### ✔ Repeated API call logic

### ✔ Repeated event listeners (scroll, resize, online/offline)

### ✔ Complex logic hurting readability of your components

---

# ⭐ Popular Real-World Custom Hooks You Will See Everywhere

| Hook Name         | Purpose                    |
| ----------------- | -------------------------- |
| `useFetch`        | Fetching API data          |
| `useLocalStorage` | Store data in localStorage |
| `useDebounce`     | Delay typing (search bars) |
| `usePrevious`     | Get previous value         |
| `useToggle`       | Boolean toggle             |
| `useAuth`         | Check login status         |
| `useDarkMode`     | Detect/enable dark theme   |

---

# 🧩 Summary in One Line

**Custom Hooks help you extract, reuse, and organize logic so your components stay clean and maintainable.**
