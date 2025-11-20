# ⭐ What is `useRef` in React?

`useRef` is a hook used to store a **mutable value** that:

* **does not cause re-render** when updated
* **persists between renders**
* can hold **DOM elements** or **any value**

Think of `useRef` as a **box** that React does not watch.
Whatever you put inside stays safe — and changing it doesn’t re-render the component.

---

# 🎯 `useRef` is used for 2 main purposes

## **1️⃣ To access DOM elements**

(like focusing an input)

## **2️⃣ To store data that shouldn’t trigger re-render**

(like counters, previous values, timers, API references)


---

# 🧠 **Think of `useRef` like a small box that React never touches**

* You can **store anything** inside this box.
* When the value inside the box changes → **React does NOT re-render the UI**.
* The value inside the box stays safe even if the component re-renders many times.

This "box" is:

```jsx
const box = useRef(initialValue);
```

Whatever is inside the box is:

```jsx
box.current
```

That’s all.