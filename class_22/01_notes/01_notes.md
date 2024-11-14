
The `usePrev` function is a custom React Hook that allows you to access the previous value of a given state or prop on each render. Here’s how it works:

### How `usePrev` Works

1. **Initialization with `useRef`:** 
   ```javascript
   const ref = useRef();
   ```
   `useRef` is used to create a persistent reference object (`ref`) that holds a `current` property. The value of `ref.current` remains stable across re-renders of the component, which allows it to hold onto previous values.

2. **Updating the Ref in `useEffect`:**
   ```javascript
   useEffect(() => {
       ref.current = value;
   }, [value]);
   ```
   The `useEffect` hook runs whenever `value` changes. Inside this hook, `ref.current` is set to the latest `value`. This means that after each render, `ref.current` will hold the previous `value` once the `useEffect` completes.

3. **Returning the Previous Value:**
   ```javascript
   return ref.current;
   ```
   By returning `ref.current`, `usePrev` provides access to the previous `value` before it was updated in the `useEffect`. So, on each render, the hook returns the `value` from the previous render.

### Key Point - Execution Order

In React, rendering occurs first, and then `useEffect` runs after the render phase. This means:
- When `usePrev` returns `ref.current`, it’s returning the value from the last render (the previous value).
- Only after this does the `useEffect` update `ref.current` to the current value.

This execution order allows `usePrev` to provide the previous value on every render, making it useful for scenarios where you need to compare the previous and current values in functional components, like detecting changes or performing side effects based on previous state.