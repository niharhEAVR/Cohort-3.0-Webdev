`useEffect` is a **React hook** that allows you to perform side effects in your functional components. Side effects include things like:

- Fetching data from an API
- Setting up a subscription
- Updating the DOM directly (though React generally manages the DOM for you)
- Handling timers or intervals (like `setInterval` or `setTimeout`)

### Why `useEffect` is Needed:
React components re-render when their state or props change, and with class components, lifecycle methods like `componentDidMount` and `componentWillUnmount` were used to handle side effects. In functional components, **before hooks were introduced**, there was no built-in way to manage side effects in a simple way.

`useEffect` allows functional components to handle side effects while still maintaining the simplicity and power of React’s declarative approach to UI.

### Syntax:

```javascript
useEffect(() => {
  // Code that runs when the component mounts or updates

  return () => {
    // Cleanup code, runs when the component unmounts or before re-running the effect
  }
}, [dependencies]); // Optional dependency array
```

- **The First Argument**: A function containing the side effect logic. This function will be executed after the component renders.
- **The Cleanup Function**: (Optional) The return function inside `useEffect` is used for cleanup. It is executed when the component unmounts or before the effect runs again (like clearing timers or removing event listeners).
- **The Second Argument**: An optional dependency array. If provided, it tells React to only run the effect if the dependencies have changed. If the array is empty (`[]`), the effect runs **only once** after the initial render (like `componentDidMount` in class components).

### Examples:

#### 1. **Basic useEffect (Running Once)**

```javascript
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // This runs once after the initial render (like componentDidMount)
    console.log('Component mounted');
  }, []); // Empty array ensures it runs only once

  return <h1>Hello, world!</h1>;
}
```

- In this example, `console.log('Component mounted')` will be logged once after the first render.

#### 2. **Running on State or Prop Change**

```javascript
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This runs every time 'count' changes
    console.log(`Count changed: ${count}`);
  }, [count]); // Effect depends on 'count' state

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

- Here, the effect will run every time the `count` state changes.

#### 3. **Cleanup (Timer Example)**

```javascript
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up an interval when the component mounts
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Cleanup function (clears interval) when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty array to ensure effect runs only once

  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  );
}
```

- In this example, the `setInterval` sets up a timer to update the `count` every second.
- The **cleanup function** (`clearInterval`) ensures that when the component unmounts or when the effect is about to run again, the timer is cleared, preventing potential memory leaks.

#### 4. **Running on Multiple Dependencies**

```javascript
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  useEffect(() => {
    // Runs when either 'count' or 'name' changes
    console.log(`Count or name changed: ${count}, ${name}`);
  }, [count, name]); // Effect depends on 'count' and 'name'

  return (
    <div>
      <h1>{count}</h1>
      <h2>{name}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setName(name === 'John' ? 'Doe' : 'John')}>Toggle Name</button>
    </div>
  );
}
```

- The effect in this example will run whenever either `count` or `name` changes.

### When Does `useEffect` Run?

1. **After Initial Render**: When the component is mounted, `useEffect` will run after the first render, unless an empty dependency array (`[]`) is provided.
2. **After Every Update**: If a dependency is provided (e.g., `[count]`), it will run after the component is rendered and the specified dependency has changed.
3. **Cleanup**: When the component is about to unmount, or before the effect runs again, React runs the cleanup function to clear up any side effects like timers or event listeners.

### In Summary:
- **`useEffect`** allows you to run side effects like data fetching, DOM updates, and timers.
- You can use it to manage effects that depend on component state or props.
- It helps avoid issues like memory leaks by cleaning up resources when the component unmounts or re-renders.

By using `useEffect`, you make sure that side effects are handled in a more declarative and efficient way in React functional components.