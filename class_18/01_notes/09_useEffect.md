## 🔥 What is `useEffect` in React?

`useEffect` is a **side-effect handler** — it lets you run **any code that is OUTSIDE of the normal UI rendering**, like:

✅ API calls (fetching data)
✅ `setInterval`, `setTimeout`
✅ Listening to keyboard/mouse events
✅ Updating `localStorage`, document title, analytics, etc.
✅ Cleanup when component disappears (unmounts)

> Think of it like:
> **“Run some code AFTER React updates the screen.”**

---

## 🔧 Basic Syntax

```js
useEffect(() => {
  // side-effect code here (runs after render)

  return () => {
    // cleanup code here (optional)
  }
}, [dependencies])
```

---

## 🧠 The 3 Modes of useEffect

| Dependency  | Runs When?                     | Use Case                   |
| ----------- | ------------------------------ | -------------------------- |
| `[]`        | Only **once** (on mount)       | API call, setInterval once |
| `[count]`   | **Every time `count` changes** | Sync UI with data change   |
| *(nothing)* | **On every re-render**         | Rarely used, like logs     |

---

## ✅ Real-Life Examples

### 1. Run **only once** (API call, timer, etc.)

```js
useEffect(() => {
  console.log("Runs only once on mount!");
}, [])
```

---

### 2. React to **specific state change**

```js
useEffect(() => {
  console.log("Runs when count changes");
}, [count])
```

---

### 3. Cleanup Something (MOST IMPORTANT FEATURE!)

```js
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running...");
  }, 1000)

  return () => clearInterval(interval)  // cleanup before re-run or unmount
}, [])
```

---

## 🤔 So WHY Do We Actually Need useEffect?

Because **React re-rendering should be 100% PURE.**
Meaning **NO API calls, NO timers, NO browser event listeners DIRECTLY in render()**.

So React gives us `useEffect` to safely do **side effects**, AFTER UI updates.

---

### 🏁 Final One-Liner Definition

> `useEffect` = **“Run extra useful code after React renders — and clean it up when necessary.”**
