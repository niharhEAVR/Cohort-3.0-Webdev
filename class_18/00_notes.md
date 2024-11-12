In React, **mounting**, **re-rendering**, and **unmounting** refer to the different phases of the lifecycle of a component, from when it is created to when it is removed from the DOM. Let’s break each of these down:

### 1. **Mounting**:
Mounting refers to the phase when a component is being created and added to the DOM for the first time.

- **When does it occur?** Mounting happens when a component is rendered for the first time, i.e., when the component is created and displayed on the screen for the first time.
- **What happens during mounting?**
  - React creates the component.
  - The constructor (if using class components) or the `useState`, `useEffect` hooks (if using functional components) are executed.
  - The initial render occurs.
  - This is where you can set up data or side effects that only need to happen once, like setting up event listeners, making API calls, etc.
  
In functional components, **`useEffect`** with an empty dependency array (`[]`) will run after the component is mounted (on the initial render).

#### Example of mounting:
```javascript
useEffect(() => {
  console.log("Component mounted");
}, []);  // Runs only once after the initial render (mount)
```

### 2. **Re-rendering**:
Re-rendering refers to when a component re-renders in response to changes in its state or props.

- **When does it occur?** Re-rendering happens when:
  - The state of the component changes (via `useState` in functional components or `this.setState` in class components).
  - The props passed to the component change.
  - A parent component re-renders, causing its child components to re-render as well (unless optimizations like `React.memo` or `shouldComponentUpdate` are used).
  
  Every time state or props change, React will re-render the component to reflect the new values in the UI.

- **What happens during re-rendering?**
  - React compares the new JSX (virtual DOM) with the previous one (using a process called "reconciliation").
  - If there are changes, React updates the actual DOM to reflect those changes.
  - Re-rendering is generally fast in React due to the Virtual DOM, which only updates parts of the real DOM that have changed.

#### Example of re-rendering:
```javascript
const [count, setCount] = useState(0);

return (
  <div>
    <h1>{count}</h1>
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </div>
);
```
Every time the button is clicked, `setCount` updates the `count` state, causing the component to **re-render** to reflect the updated state.

### 3. **Unmounting**:
Unmounting refers to the phase when a component is removed from the DOM.

- **When does it occur?** Unmounting happens when:
  - A component is removed from the screen (for example, if the user navigates away or if the component conditionally renders and is no longer needed).
  - React cleans up resources (like event listeners, timers, or network requests) associated with the component when it is removed.
  
- **What happens during unmounting?**
  - React will **clean up** any side effects from the component (e.g., clearing intervals or timeouts, canceling network requests, or removing event listeners).
  - This is where you would use the **cleanup function** in `useEffect` to avoid memory leaks (such as clearing a timer with `clearInterval`).

#### Example of unmounting:
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer running...");
  }, 1000);

  // Cleanup function is called when the component unmounts
  return () => clearInterval(timer);  // Clears the timer when component unmounts
}, []);
```
The timer will be cleaned up (cleared) when the component is unmounted, preventing memory leaks.

### Summary of Lifecycle Phases:
- **Mounting**: The component is being created and added to the DOM for the first time.
  - Example: The `useEffect` hook with an empty dependency array (`[]`) will run once after the initial mount.
- **Re-rendering**: The component re-renders due to changes in its state or props.
  - Example: Calling `setState` or `setCount` triggers a re-render.
- **Unmounting**: The component is removed from the DOM.
  - Example: The cleanup function inside `useEffect` is used to clear side effects when the component unmounts.

In functional components, `useEffect` allows you to manage the mounting, re-rendering, and unmounting lifecycle behavior. When you pass an empty dependency array (`[]`), the effect runs only once after the initial render (mount). If you provide dependencies, the effect will re-run whenever those dependencies change. When the component unmounts, the cleanup function inside `useEffect` will run, allowing you to clear side effects.