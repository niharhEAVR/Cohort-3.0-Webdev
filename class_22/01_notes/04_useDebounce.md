`useDebounce` is a **custom React hook** that delays updating a value until the user has stopped changing it for a certain amount of time.

It’s basically a **“wait until the user pauses”** hook.

---

# 🎯 **Why do we need useDebounce? (Simple Example)**

Imagine a search bar:

* The user types: **p → py → pyt → pyth → python**
* Without debounce → you call API **5 times**
* With debounce → you call API **only once**, after typing stops

So `useDebounce` helps to:
✔ Reduce API calls
✔ Improve performance
✔ Prevent spam events
✔ Smoothen UI experience

---

# 🔥 Real-World Uses of `useDebounce`

| Use Case                 | Why debounce?                        |
| ------------------------ | ------------------------------------ |
| Search bar               | Avoid calling API on every keystroke |
| Window resizing          | Avoid recalculations every pixel     |
| Form validation          | Don’t validate every key press       |
| Scroll / mouse movements | Avoid spam updates                   |
| Auto-save features       | Save only when user stops typing     |

---

# 🧠 **How Debouncing works (simple explanation)**

Debounce =
**“Wait X milliseconds before updating. If the value changes again, restart the timer.”**

Example: Wait 500ms

* If user types continuously → never update
* If user stops typing → update value once

---

# 📌 `useDebounce` Custom Hook Code

```jsx
import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup if value changes before the delay finishes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

# 📌 How it works (Flow)

1️⃣ value changes
2️⃣ `useEffect` runs and starts a timer
3️⃣ If the user changes value again before delay → **timer resets**
4️⃣ If user stops changing → after delay → set debounced value
5️⃣ Component receives the final stable value

---

# 🔥 Example Usage — Search Bar with Debounce

```jsx
function Search() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedText) {
      console.log("Searching for:", debouncedText);
      // API call here
    }
  }, [debouncedText]);

  return (
    <input 
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

# 🧩 Flow in UI

User types “react”:

| Input | Timer Reset?      | API Call?             |
| ----- | ----------------- | --------------------- |
| r     | yes               | no                    |
| re    | yes               | no                    |
| rea   | yes               | no                    |
| reac  | yes               | no                    |
| react | no (user stopped) | **YES (after 500ms)** |

That’s debounce.

---

# ⭐ Summary

### `useDebounce` is used to:

* **Delay actions**
* **Reduce unnecessary work**
* **Improve performance**
* **Avoid firing logic on every small change**

### Best for:

* Search bars
* API calls
* Expensive computations
* Resize/scroll events