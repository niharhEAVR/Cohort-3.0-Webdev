In React, the **dependency array** in the `useEffect` hook is used to control when the `useEffect` function runs. It tells React to only execute the effect (the code inside `useEffect`) when certain variables or states change.

The dependency array can help **optimize performance** by limiting the number of times an effect runs and **preventing unnecessary re-renders**.

### How the dependency array works:

1. **No dependency array (`useEffect(() => {...})`)**:
   - If you **don’t provide a dependency array**, the effect will run **every time the component renders**, regardless of state or props changes.
   
   ```js
   useEffect(() => {
     console.log('Component rendered!');
   });  // Runs after every render.
   ```

2. **Empty dependency array (`useEffect(() => {...}, [])`)**:
   - If you provide an **empty dependency array (`[]`)**, the effect will **run only once**, when the component is first mounted (i.e., when it’s added to the DOM). This is similar to `componentDidMount` in class components.
   
   ```js
   useEffect(() => {
     console.log('Component mounted!');
   }, []);  // Runs only once, after the first render.
   ```

3. **With dependencies (`useEffect(() => {...}, [dep1, dep2])`)**:
   - If you provide a **dependency array with specific variables**, the effect will **run when one of the dependencies changes**. The effect will only re-run if the value of one of the specified dependencies changes.
   
   ```js
   useEffect(() => {
     console.log('Count has changed:', count);
   }, [count]);  // Runs only when 'count' changes.
   ```

   In the example above, the effect will run whenever the value of `count` changes, but not when other state variables or props change.

### Why use dependencies?

- **Control re-renders**: The dependency array allows you to **control when side effects** should run. You can avoid unnecessary side effects from running on every render, improving performance.
  
- **Avoid infinite loops**: If a side effect causes state changes (like updating state inside `useEffect`), it might trigger a re-render. Without dependencies, this could lead to **infinite loops** of re-renders. By specifying dependencies, you can control the flow and prevent this issue.

### Example 1: Effect with no dependencies (runs after every render)

```js
useEffect(() => {
  console.log('Component rendered!');
});
```

This will log a message to the console after every render, regardless of what changed.

### Example 2: Effect with an empty dependency array (runs only once)

```js
useEffect(() => {
  console.log('Component mounted!');
}, []);
```

This will log the message **once**, when the component first mounts.

### Example 3: Effect with dependencies (runs when the dependency changes)

```js
const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Count has changed:', count);
}, [count]); // Runs whenever 'count' changes.
```

This will log the message every time `count` changes, but not for other state changes.

### Key Takeaways:
- **No dependency array**: Runs on every render.
- **Empty dependency array (`[]`)**: Runs only once, after the first render (like `componentDidMount`).
- **With dependencies (`[dep1, dep2]`)**: Runs when any of the dependencies change.

Let me know if you'd like more examples or have more questions on this!