## 🧩 What are Props in React?

**Props = “Properties” = Data passed from Parent Component → Child Component**

Think of props like **arguments to a function** or **parameters passed to a child**.

---

### Example in Real Life

You tell your friend:

```
Hey, go to shop and buy 5 apples.
```

Here:

* YOU are the **parent**
* friend is the **child**
* `5 apples` is the **data passed = props**

---

### Now same in React

```jsx
<Todo title="Learn React" description="Make todo app" />
```

Here:

* `<Todo />` is **Child Component**
* We send it two props 👉 `title` and `description`

---

### Inside the Child Component (Todo.jsx)

```jsx
function Todo(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
```

Whatever you pass as props, the **child receives it via `props`** and shows it.

---

### Why props are important? ✅

| Feature                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| **Reusable components** | You write `<Todo />` once → use it for unlimited todos     |
| **Data passing**        | Parent controls what data child should display             |
| **Read-only**           | Child cannot change props (they are **fixed data inputs**) |

---

### In One Line

> **Props allow React components to talk to each other — Parent sends data to Child.**
