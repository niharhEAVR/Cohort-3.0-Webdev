## 🧠 What Are **Lifecycle Methods** (or Lifecycle Events)?

Every React component (especially **class-based**) goes through a **lifecycle** —
meaning it gets **created (mounted)**, **updated**, and finally **destroyed (unmounted)**.

React gives you special built-in methods that run automatically at each stage.
These are called **Lifecycle Methods** (or lifecycle hooks/events).

---

## ⚙️ The Three Main Phases

### 1. **Mounting (when the component is first created and added to the DOM)**

This is the **beginning of the lifecycle**.

| Method                | When it runs                           | What it’s used for                |
| --------------------- | -------------------------------------- | --------------------------------- |
| `constructor()`       | When the component is initialized      | Set up state or bind methods      |
| `render()`            | Before it appears on screen            | Returns JSX to show               |
| `componentDidMount()` | After the component appears in the DOM | Fetch data, set timers, call APIs |

**Example:**

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    console.log("Mounted!");
    // fetch or initialize data here
  }

  render() {
    return <div>Hello World</div>;
  }
}
```

---

### 2. **Updating (when props or state changes)**

This is the **middle stage**, when React re-renders a component.

| Method                                        | When it runs           | Use case                                    |
| --------------------------------------------- | ---------------------- | ------------------------------------------- |
| `shouldComponentUpdate(nextProps, nextState)` | Before re-rendering    | Return `false` to skip unnecessary updates  |
| `render()`                                    | Renders the updated UI | (Same as before)                            |
| `componentDidUpdate(prevProps, prevState)`    | After re-rendering     | Work with updated DOM, fetch new data, etc. |

**Example:**

```jsx
componentDidUpdate(prevProps, prevState) {
  if (this.state.count !== prevState.count) {
    console.log("Count changed!");
  }
}
```

---

### 3. **Unmounting (when component is removed from the DOM)**

This is the **end of the lifecycle**.

| Method                   | When it runs                         | What it’s used for                                              |
| ------------------------ | ------------------------------------ | --------------------------------------------------------------- |
| `componentWillUnmount()` | Just before the component disappears | Cleanup — remove event listeners, stop timers, cancel API calls |

**Example:**

```jsx
componentWillUnmount() {
  console.log("Component will be removed!");
  clearInterval(this.timer);
}
```

---

## 💡 Modern Equivalent with Hooks (in Function Components)

All of these lifecycle phases can be handled with **`useEffect()`**.

Example:

```jsx
useEffect(() => {
  console.log("Mounted");
  return () => {
    console.log("Unmounted");
  };
}, []);
```

✅ Runs once when mounted
✅ Cleans up when unmounted

And if you include dependencies:

```jsx
useEffect(() => {
  console.log("Updated!");
}, [count]);
```

---

## 🧩 Summary

| Lifecycle Phase | Class Component Method   | Hook Equivalent                      |
| --------------- | ------------------------ | ------------------------------------ |
| Mounting        | `componentDidMount()`    | `useEffect(() => {}, [])`            |
| Updating        | `componentDidUpdate()`   | `useEffect(() => {}, [deps])`        |
| Unmounting      | `componentWillUnmount()` | `return () => {}` inside `useEffect` |
