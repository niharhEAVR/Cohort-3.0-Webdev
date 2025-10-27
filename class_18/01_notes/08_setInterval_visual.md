### ✅ The Concept (Crystal Clear Explanation)

```js
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1)
  }, 1000)

  console.log("Onetime this useEffect get printed")

  return () => clearInterval(interval)
}, [])
```

---

### 🔥 What’s Happening Here?

| Step                                                                               | Explanation                                                                            |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1️⃣ `useEffect(..., [])`                                                           | Runs **only once** when `<Component />` mounts (because `[]` means “no dependencies”). |
| 2️⃣ `setInterval(...)`                                                             | Starts a **timer** that increases count **every 1 second**.                            |
| 3️⃣ React re-renders UI every second (because `setCount` triggers re-render)       |                                                                                        |
| 4️⃣ But **useEffect does NOT run again**, so **NO EXTRA setInterval is created** ✅ |                                                                                        |
| 5️⃣ When component UNMOUNTS                                                        | React **runs cleanup** → `clearInterval(interval)` → stops the timer ✅                 |

---

### 💡 Why this avoids multiple `setInterval`s?

Because `useEffect` with `[]` **runs only once**, React **does NOT create a new interval on every re-render**, so:

✅ Only **ONE interval runs**
✅ No **multiple timers accidentally stack up**
✅ React still re-renders UI via `setCount`, but effect isn’t re-created

---

### 🧠 Golden Rule You Should Remember

> **React re-renders the UI always — but re-renders ≠ re-run of useEffect.**
> `useEffect(() => {}, [])` = **run only ONCE** no matter how many re-renders happen.
