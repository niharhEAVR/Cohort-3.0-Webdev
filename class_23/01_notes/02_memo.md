# ✅ **What is `React.memo`?**

`React.memo` is a **higher-order component** that **prevents unnecessary re-renders** of a component **if its props have not changed**.

Think of it like:

> **“If the input (props) didn’t change, then don't re-render this component again.”**

It’s similar to *pure components*.

---

# ✅ **Why do we need `React.memo`?**

React re-renders **every component inside a parent** when the parent re-renders.
Even if the child’s props didn't change — React still re-renders it by default.

This wastes performance in big apps.

### `React.memo` stops this waste by skipping re-renders.

---

# ⚠️ Without `React.memo` — wasteful re-renders

### Parent component re-renders ⬇

→ All child components re-render (even useless ones)

```jsx
function Parent({ count }) {
  return (
    <>
      <SlowChild />     // re-renders unnecessarily
      <FastChild />     // re-renders unnecessarily
    </>
  );
}
```

---

# ✅ With `React.memo` — only required components re-render

```jsx
const SlowChild = React.memo(function SlowChild() {
  console.log("SlowChild rendered");
  return <div>I render only when needed</div>;
});
```

Now:

* If **parent re-renders**
* But `SlowChild` **received the same props**
* React **skips re-render**
  → The DOM remains untouched
  → The component does not run again

---

# 🧠 Example to visualize it

### 🔻 Parent component

```jsx
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Counter value={count} />
      <HeavyComponent /> // this should NOT re-render
    </>
  );
}
```

### 🔻 HeavyComponent WITHOUT memo

```jsx
function HeavyComponent() {
  console.log("HeavyComponent rendered again!");
  return <div>Very expensive UI...</div>;
}
```

Whenever we click the button:

✔ `Counter` should re-render
✘ `HeavyComponent` **still re-renders unnecessarily**

---

# 🔻 Using `React.memo` to fix it

```jsx
const HeavyComponent = React.memo(function HeavyComponent() {
  console.log("HeavyComponent rendered again!");
  return <div>Very expensive UI...</div>;
});
```

Now only:

* `Counter` re-renders
* `HeavyComponent` stays untouched unless its **props change**

---

# 🎯 When should you use `React.memo`?

Use it when:

### ✔ Component re-renders too often

### ✔ Props rarely change

### ✔ Component is heavy (expensive UI, large lists, charts, maps)

### ✔ You want to stop child from re-rendering on parent render

Examples:

* Product cards
* User profile widgets
* Dashboard charts
* Comments list
* Expensive components with large DOM

---

# ⚠️ When NOT to use `React.memo`?

Don’t use Memo when:

### ❌ Component is small and cheap

### ❌ Props always change

### ❌ You are adding `memo` everywhere blindly (can create overhead)

---

# 📌 Short Summary

| Feature                | Meaning                             |
| ---------------------- | ----------------------------------- |
| **What**               | A performance optimization wrapper  |
| **Purpose**            | Prevent useless re-renders          |
| **Triggers re-render** | Only when props change              |
| **Good for**           | Heavy or rarely changing components |
| **Not useful for**     | Always-changing components          |

---

# 🧠 Final Easy Definition

> **React.memo is a tool to stop a component from re-rendering unless its props change. It boosts performance by avoiding useless work.**
