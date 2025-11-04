### 🧠 What were **Class-Based Components** in React?

Before React introduced **Hooks** (in version **16.8**, released in 2019), components were typically written as **classes** rather than functions.

So earlier, a React component looked like this:

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // Local component state
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 }); // Update state
  };

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
```

---

### ⚙️ How It Worked

* **Class components** had:

  * `state`: to store internal data.
  * `setState()`: to update that data.
  * **Lifecycle methods** for side effects (like fetching data, subscribing, etc.)

Example of lifecycle methods:

```jsx
class Example extends Component {
  componentDidMount() {
    console.log("Component mounted!");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated!");
  }

  componentWillUnmount() {
    console.log("Component will unmount!");
  }

  render() {
    return <div>Hello, Class Component!</div>;
  }
}
```

---

### 💡 What Changed with **Function Components + Hooks**

Before 2019, function components could **not** hold state or use lifecycle methods.

But with **Hooks**, React gave function components the same powers:

```jsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted or updated");
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

So the **functional version** is shorter, easier to read, and doesn’t require the `this` keyword.

---

### 🧩 Summary

| Feature           | Class Component                                   | Function Component (with Hooks) |
| ----------------- | ------------------------------------------------- | ------------------------------- |
| State             | `this.state`                                      | `useState()`                    |
| Update state      | `this.setState()`                                 | `setState` from `useState`      |
| Lifecycle methods | `componentDidMount`, `componentWillUnmount`, etc. | `useEffect()`                   |
| `this` keyword    | Required                                          | Not needed                      |
| Syntax            | ES6 Class                                         | Plain function                  |
