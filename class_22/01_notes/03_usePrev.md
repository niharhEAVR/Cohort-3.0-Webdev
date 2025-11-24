`usePrevious` (often written as **usePrev**) is a **custom React hook** used to store the **previous value** of a state or prop — something React does *not give you by default*.

React gives you *current* state, but NOT the *previous* state.
So we build a custom hook for that.

---

# ✅ **Why do we need `usePrevious`?**

Sometimes you want to compare:

* The previous counter value with the current one
* The previous form input
* The previous prop value to detect changes
* The previous page, theme, or selection

React does not track previous values automatically → **Custom hook solves it**.

---

# 📌 **How `usePrevious` Works?**

It uses:

* `useRef` → to store a value **without causing re-renders**
* `useEffect` → to update the ref **after each render**

---

# 🔥 **Custom `usePrevious` Hook Code**

```jsx
import { useEffect, useRef } from "react";

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;   // update after render
  }, [value]);

  return ref.current;      // return previous value
}
```

---

# 📌 **How to Use `usePrevious`**

```jsx
import { useState } from "react";
import { usePrevious } from "./usePrevious";

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <h2>Current: {count}</h2>
      <h2>Previous: {prevCount}</h2>

      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

# 🧠 **What happens internally?**

* First render

  * `ref.current` = undefined
  * So previous is undefined

* After clicking button

  * State updates → component re-renders
  * `useEffect` runs → stores the old count into `ref.current`
  * Now `prevCount` shows the previous value

---

# 🎯 Example Output in UI

| Click          | Current | Previous  |
| -------------- | ------- | --------- |
| Start          | 0       | undefined |
| After 1 click  | 1       | 0         |
| After 2 clicks | 2       | 1         |
| After 3 clicks | 3       | 2         |

---

# 🧩 Why do we use `useRef` instead of `useState`?

Because:

### ❌ `useState` → causes re-render (we don’t want that)

### ✔ `useRef` → stores value WITHOUT re-rendering

Previous value **should not** trigger renders; we only want to reference it.

---

# ⭐ Real-World Uses of `usePrevious`

### ✔ Detect if value increased / decreased

```jsx
if (count > prevCount) console.log("Increased");
```

### ✔ Compare form changes

```jsx
if (formValue !== prevFormValue) doSomething();
```

### ✔ Compare props in useEffect

```jsx
if (prevUserId !== userId) fetchData();
```

### ✔ Animate when value changes

```jsx
animate(prevCount, count);
```

---

# 🧩 Summary

| Feature                     | `usePrevious` |
| --------------------------- | ------------- |
| Stores value across renders | ✔             |
| Returns previous value      | ✔             |
| Causes re-renders           | ❌             |
| Built-in hook?              | ❌ (custom)    |

---
---
---
---

The **exact flow** of how a `usePrevious` (usePrev) custom hook works, step-by-step, with a simple mental model you can remember forever.

---

# ✅ **usePrevious Hook (for reference)**

```jsx
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

---

# 🧠 **Flow Explanation — SUPER SIMPLE**

We break it into **render phase** and **commit phase**.

---

# 🎬 **1. First Render (Initial Render)**

### During the render:

* `ref = useRef()` → creates `{ current: undefined }`
* `useEffect` **does NOT run yet** (effects run *after* render)
* `return ref.current` → returns **undefined**

📌 **Previous value = undefined** (correct)

---

# 🎯 **State value updated → re-render begins**

Example: you press a button, `setCount(1)`
React starts **second render**.

---

# 🎬 **2. Second Render**

### During the render:

* `ref` still exists (React keeps it between renders)
* `ref.current` is still **undefined** (because effect hasn’t run yet)
* Hook returns this previous value (undefined)

📌 **UI shows:**

* current = 1
* previous = undefined

### After the render → `useEffect` runs

* `ref.current = value`
* Now `ref.current = 1`

📌 **Previous value stored = 1**

---

# 🎯 **State updates again → third render**

Example: you press button again `setCount(2)`
Start of third render.

---

# 🎬 **3. Third Render**

### During render:

* `ref.current` = **1** ← stored by previous `useEffect`
* Hook returns 1

📌 **UI shows:**

* current = 2
* previous = 1

### After render → `useEffect` runs

* `ref.current = 2`

📌 **Previous value stored = 2**

---

# 🎬 **4. Next Render (Fourth Render)**

* `ref.current` = **2**
* Current value = 3 (new state)
* Hook returns 2 (previous)

After render → `ref.current = 3`

📌 **Previous value stored = 3**

---

# 🔁 **Visualization Table**

| Render # | Current Value | Returned Previous (ref.current) | After Render stores |
| -------- | ------------- | ------------------------------- | ------------------- |
| 1        | 0             | undefined                       | stores 0            |
| 2        | 1             | 0                               | stores 1            |
| 3        | 2             | 1                               | stores 2            |
| 4        | 3             | 2                               | stores 3            |

---

# 🎥 **Flow Summary (Like a Movie)**

### **Render Phase**

* Returns the old value stored in `ref.current`

### **Commit Phase (After Render)**

* `useEffect` runs
* Saves the current value to use as **previous** in the next render

---

# 📌 Why does this work?

Because:

* `useRef` keeps the same object between renders
* Updating `ref.current` **does NOT trigger re-renders**
* `useEffect` ensures the update happens **after the UI is drawn**

This creates the perfect “previous value memory.”

---

# 🧠 Mental Model (Easy to Remember)

Think of `usePrevious` as a **notebook**:

* On every render → you read last written value
* After that → you write the new value in the notebook
* Next render → you read the notebook again

That’s literally how it works.

---
---
---


---

# ✅ **Why does `useEffect` run *after* render?**

Because React follows a strict lifecycle:

## ⚙️ **1. Render Phase → Build UI**

## 🔧 **2. Commit Phase → Update DOM**

## 🔥 **3. useEffect Phase → Run side-effects**

This order is **not optional** — it's core React architecture.

---

# 🧠 **Why can’t `useEffect` run during render? (Logical Reasoning)**

Think of render as the phase where React calculates:
👉 *“What should the UI look like?”*

During render:

* No DOM changes allowed
* No side-effects allowed
* No async calls allowed
* No state updates allowed

Because render must stay **pure** and **predictable**.

---

# 🧨 **If useEffect ran during render → chaos**

Imagine:

```js
useEffect(() => ref.current = value, [value]);
```

If this ran during render:

* You’d be *changing state* while React is still building the UI
* Causes infinite loops
* UI becomes unpredictable
* React cannot batch or optimize updates
* Render would not be pure anymore

That’s why React delays useEffect until **AFTER** the UI has been drawn.

---

# 🔥 Now your question:

> “I assumed the first rerender is undefined but after that value is changed so useEffect should run simultaneously… why not?”

Let's break that down perfectly.

---

# 🎬 **Actual flow when state changes**

### ### 🔹 **Render Phase**

* React calls your component
* Runs your hooks
* `usePrevious` returns old `ref.current`
* BUT `useEffect` still has NOT run
* So the "previous" value is correct

### ### 🔹 **Commit Phase**

* React updates the DOM with the new UI

### ### 🔹 **Effect Phase**

* Now React runs `useEffect(() => { ref.current = value })`

This **stores the new value for NEXT time**, not for the current render.

---

# 🎯 **Key Logic**

### 👉 useEffect updates **after** the render

### 👉 Previous value is ALWAYS the value before this render

### 👉 Current value is the latest state

### 👉 You need previous value during the render, not after

If useEffect ran early:

* You would **lose** the real previous value
* Both current and previous would become the same
* `usePrevious` would stop working completely

---

# 🚀 **A Simple Analogy (Very Easy)**

Imagine React is a teacher taking attendance.

### **Step 1 – First the teacher reads your name (render phase)**

> “Present: John
> Previous: (whatever I wrote last time)”

### **Step 2 – After taking attendance (effect phase)**

Teacher updates the notebook:

> “Write down John's latest status”

Next day, previous = what was in the notebook.

---

# 🎯 **Why React MUST run effects last**

Because React must:
✔ Finish updating UI
✔ Ensure the DOM is ready
✔ Guarantee render is pure
✔ Prevent infinite loops
✔ Guarantee predictable timing
✔ Allow batching & scheduling

---

# 🧩 **Final Summary**

| Phase      | What happens                                       |
| ---------- | -------------------------------------------------- |
| **Render** | Component runs, returns UI, reads previous value   |
| **Commit** | DOM updates                                        |
| **Effect** | `useEffect` runs → saves new value for next render |

👉 **Effects MUST run after render**
👉 **So previous value stays correct**
👉 **And render stays pure**