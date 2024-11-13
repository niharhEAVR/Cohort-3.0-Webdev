```jsx
function App() {
  const [first, setfirst] = useState(true)
  const toggle = useEffect(()=>{
    setInterval(()=>{
      setfirst(first => !first)
    },5000)
  },[])
  return (
    <>
      {first && <Clock/>}
      <FetchData/>
    </>
  )
}

function Clock() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    const notification = setInterval(()=>{
      setCount(count => count + 1)
    },1000)
    return () => clearInterval(notification)
  },[])

  useEffect(() => {
    console.log(count)
  }, [count]) 
  return (
    <>
      <p>{count}</p>
      <img src="https://www.iconpacks.net/icons/2/free-bell-icon-2031-thumb.png" style={{width: 40}}/> <br /><br />
    </>
  )
}
```

### Q> whats the use of cleanup in useEffect?

The **cleanup** function in `useEffect` is used to perform any necessary cleanup or teardown when a component is unmounted or when the dependencies of the effect change. The cleanup function helps to prevent memory leaks and unintended behavior, such as clearing timers or removing event listeners when they are no longer needed.

### How does cleanup work?

In your example, you're using `setInterval` inside `useEffect` to increment the `count` every second. If you don't clean up the interval, the interval could continue running even after the component is unmounted, which leads to memory leaks or unexpected behavior.

### Example Breakdown

```javascript
useEffect(() => {
  // This sets an interval to update the count every second
  const notification = setInterval(() => {
    setCount(count => count + 1);
  }, 1000);

  // Cleanup function that runs when the component is unmounted or before the effect runs again
  return () => {
    clearInterval(notification); // This clears the interval when the component is unmounted or effect runs again
  };
}, []);  // Empty dependency array ensures this effect runs only once when the component mounts
```

### Why Cleanup is Important:

1. **Avoiding Memory Leaks**: Without cleanup, `setInterval` would continue running even after the component is removed from the DOM. This can lead to memory leaks because the intervals are still active and holding references to the state.

2. **Stopping Side Effects**: In some cases, you may want to stop certain side effects (like network requests, subscriptions, or intervals) when a component unmounts to prevent errors or inconsistent behavior.

### In your example:

- **`setInterval`** starts when the `Clock` component mounts, and it runs every second to update the `count` state.
- When the `Clock` component unmounts (for example, when `first` changes to `false` and the `Clock` component is removed), the cleanup function is called, and it **clears the interval**, ensuring the interval doesn't continue running in the background.

### Cleanup in Action

When you use `useEffect` with a cleanup function, React will automatically run the cleanup function in these cases:

- When the component unmounts.
- When the dependencies of the effect change, React will run the cleanup before re-running the effect.

In your case, if `first` is toggled and `Clock` unmounts, `clearInterval` is triggered, stopping the timer.

### Example of Cleanup Without Intervals:

```javascript
useEffect(() => {
  // Adding an event listener
  const handleResize = () => console.log('Window resized!');
  window.addEventListener('resize', handleResize);

  // Cleanup function to remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty array ensures this effect only runs once on mount
```

Here, the event listener is added when the component mounts and removed when it unmounts.

### Summary:

- **Cleanup in `useEffect`** is important to stop side effects, such as timers, subscriptions, and event listeners, when they are no longer needed.
- It helps in **preventing memory leaks** and keeping your app performance optimized.
- The cleanup function is automatically called when the component is unmounted or before the effect runs again when the dependencies change.