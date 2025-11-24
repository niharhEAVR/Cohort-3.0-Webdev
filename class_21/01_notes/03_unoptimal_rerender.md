# **unoptimal (unnecessary) re-renders**

---

# 💡 First: One-Line Meaning

### **Unoptimal re-renders = React re-renders components even when they didn’t need to.**

---

# 🎯 Why does this happen?

Because when state lives in a **parent component**,
**every time that state changes → the parent re-renders → ALL children re-render.**

Even children that don’t use the state.

This is the key part.

---

# 🔥 Simple Real-Life Analogy

Think of your house:

Your father (parent) changes the Wi-Fi password (state change).

Even though only *your device* needed the update:

* Your mom gets disturbed
* Your brother gets disturbed
* Everyone in the house gets disturbed
  (because the father controls the router)

This is **unnecessary disturbance** → in React, this means **unnecessary re-renders**.

---

# 🧩 Visual Diagram

### State lifted up to parent:

```
Parent (has state)
 ├── ChildA (uses state)
 └── ChildB (does NOT use state)
```

### When state updates:

```
Parent re-renders
  ├── ChildA re-renders (needed)  ✔️
  └── ChildB re-renders (NOT needed) ❌
```

This extra re-render of ChildB is **unoptimal**.

---

# 🔥 Actual React Example

### Parent holds counter state

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildA count={count} />
      <ChildB />
    </>
  );
}
```

### ChildA uses the state:

```jsx
function ChildA({ count }) {
  return <div>A Count: {count}</div>;
}
```

### ChildB does NOT use the state:

```jsx
function ChildB() {
  return <div>B I don’t use the count</div>;
}
```

---

# ⚠️ What happens when you run `setCount(count + 1)`?

* **Parent re-renders**
* **ChildA re-renders** → ✔️ (it uses count)
* **ChildB also re-renders** → ❌ (wasteful & unnecessary)

ChildB shouldn't re-render, but it does because:

> React re-renders the whole subtree when a parent re-renders.

---

# 🧠 Why is this bad?

* Slows the app
* Wastes CPU
* Causes lag in large UIs
* Every button click re-renders too many components

It's like calling a family meeting when only *you* needed a password update.

---

# 🎉 The Simplest Summary

### ❗ Lifting state up is good but causes a side-effect:

### 👉 **more components re-render than necessary**

because the state sits at a higher level.

This is called:

* **unoptimal re-renders**
* **unnecessary renders**
* **wasted renders**
