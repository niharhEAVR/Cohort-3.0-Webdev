# Now let’s learn with REAL LIFE EXAMPLES 🔥

---

# 🟦 Example 1: **Focusing an input (Most common use)**

### Real-life analogy:

You go to a website → cursor auto-focuses in the input.

### Code:

```jsx
import { useRef, useEffect } from "react";

export default function Example() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // <- focus the input
  }, []);

  return <input ref={inputRef} placeholder="Type here" />;
}
```

### What happened?

* `inputRef.current` = the actual `<input>` DOM element
* You can now do:

  * focus()
  * scrollIntoView()
  * click()

This is the **main real-world use of useRef** → DOM access.

---

# 🟦 Example 2: **useRef does NOT cause re-render**

### Example: Tracking how many times the component re-rendered

```jsx
import { useState, useRef, useEffect } from "react";

export default function Example() {
  const renders = useRef(0); // like a hidden counter
  const [text, setText] = useState("");

  useEffect(() => {
    renders.current += 1; // update the counter
  });

  return (
    <>
      <input onChange={(e) => setText(e.target.value)} />
      <p>Renders: {renders.current}</p>
    </>
  );
}
```

### Important:

Updating `renders.current`
❌ does NOT cause re-render
✔️ but it still updates the variable

`renders.current` is like a hidden counter the UI doesn't care about.

---

# 🟦 Example 3: **Storing timer IDs**

Without useRef:

```jsx
let timer = null; // ❌ problem: resets on every render
```

With useRef:

```jsx
const timer = useRef(null);
```

### Real code:

```jsx
const timerRef = useRef(null);

function start() {
  timerRef.current = setInterval(() => {
    console.log("Running...");
  }, 1000);
}

function stop() {
  clearInterval(timerRef.current);
}
```

Timer stays the same even after many re-renders.

---

# 🟦 Example 4: **Storing previous state value**

```jsx
const [count, setCount] = useState(0);
const prevCount = useRef(0);

useEffect(() => {
  prevCount.current = count;
}, [count]);
```

This lets you compare:

* Current value
* Previous value

Useful in animations, form validation, etc.

---

# 🟦 Example 5: **Scroll to a section**

```jsx
const sectionRef = useRef(null);

function scrollToSection() {
  sectionRef.current.scrollIntoView({ behavior: "smooth" });
}
```

---

# 🟦 USE REF IN SIMPLE ENGLISH 🗣️

### ✔️ `useRef` is like a **sticky note** you attach to your component.

Even if the component reloads (re-renders), the sticky note stays.

### ✔️ `useState` updates the UI

### ✔️ `useRef` updates the value silently (no UI update)

---

# 🧩 `useRef` vs `useState` (SUPER SIMPLE)

| Topic                       | useState | useRef                   |
| --------------------------- | -------- | ------------------------ |
| Causes re-render?           | ✅ Yes    | ❌ No                     |
| Stores values?              | ✅ Yes    | ✅ Yes                    |
| Persistent between renders? | ❌ No     | ✅ Yes                    |
| Best for                    | UI/state | DOM, timers, prev values |

---

# 🧠 FINAL SIMPLE DEFINITON

**useRef = A permanent, hidden storage that React never re-renders, used to:**

✔️ Access DOM elements
✔️ Store values that shouldn’t trigger re-renders
✔️ Store timers/interval IDs
✔️ Store previous state
✔️ Store any data across renders