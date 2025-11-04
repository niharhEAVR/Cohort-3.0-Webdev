`useRef` is a hook in React that provides a way to persist values across renders without causing a re-render when the value changes. It can be used for several purposes, including accessing and interacting with DOM elements directly, storing mutable values, and maintaining state that doesn't require re-rendering.

### Key Use Cases for `useRef`

1. **Accessing DOM Elements**:
   - `useRef` can be used to get a reference to a DOM element, so you can directly interact with it (e.g., focus an input, measure element size).
   
2. **Storing Mutable Values**:
   - Unlike `useState`, which triggers a re-render when its value changes, `useRef` can be used to store values that don’t need to trigger a re-render when changed (e.g., storing previous values, or intervals).
   
3. **Persisting State Across Renders**:
   - You can use `useRef` to keep track of values across renders without causing re-renders when the value is updated.

### Syntax

```javascript
const myRef = useRef(initialValue);
```

- `initialValue`: The initial value of the ref. It could be `null`, an object, or any other value.
- `myRef.current`: Accesses the actual value held by the ref, which can be updated or used directly.

### Example 1: Accessing a DOM Element (e.g., focusing an input)

```javascript
import React, { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Using the ref to focus the input element
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default App;
```

In this example:
- The `inputRef` is created using `useRef` and attached to the `<input>` element via the `ref` attribute.
- When the button is clicked, the `focusInput` function uses `inputRef.current.focus()` to focus the input element.

### Example 2: Storing Mutable Values (without causing re-renders)

```javascript
import React, { useRef, useState } from "react";

function App() {
  const renderCount = useRef(0); // This will not trigger re-renders
  const [count, setCount] = useState(0);

  renderCount.current++;

  return (
    <div>
      <p>Render Count: {renderCount.current}</p>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}

export default App;
```

In this example:
- `renderCount` is a mutable value that tracks how many times the component has rendered. 
- `useRef` persists the `renderCount` across re-renders without causing the component to re-render when it changes.

### Example 3: Keeping Track of Previous Values

```javascript
import React, { useState, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  // Update ref with the previous count value after every render
  React.useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}

export default App;
```

In this example:
- `prevCountRef` is used to keep track of the previous count value without triggering a re-render.
- After each render, `useEffect` updates the `prevCountRef` to store the previous value of `count`.

### Key Differences Between `useRef` and `useState`:

- **Re-renders**: 
  - When you update a value using `useState`, the component re-renders. 
  - Updating a `useRef` value does **not** cause a re-render, which is why it’s used to store non-visual, mutable state.

- **Persistence**:
  - Both `useState` and `useRef` persist values across renders, but `useRef` does not trigger re-renders when the value changes. `useState` is for managing UI state that should cause re-renders when it changes.

### Summary of Use Cases for `useRef`:

- **Accessing and interacting with DOM elements**: Useful when you need to focus an input, measure the size of an element, or trigger an animation.
- **Storing mutable values**: For tracking values that don't need to cause a re-render when they change (e.g., previous values, timers, or intervals).
- **Keeping values across renders**: To store state that should persist between renders without triggering re-renders.

`useRef` is a powerful and flexible hook that enables managing references to DOM elements and mutable data efficiently, without unnecessarily causing re-renders in your React components.