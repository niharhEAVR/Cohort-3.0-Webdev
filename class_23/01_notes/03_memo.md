### 1st code snippit

```jsx
import { useEffect, useState, memo } from "react";
import './App.css'

function App() {

  return (
      <Counter />
  )
}

function Counter() {
    const [count, setCount] = useState(0)

    useEffect(() => {
      setInterval(()=>{
        setCount(c=>c+1)
      },1000)
    
    }, [])
    

  return <div>
    <CurrentCount count={count}/>
    <Increase />
    <Decrease />
  </div>
}

function CurrentCount(props) {
  return <div>
    {props.count}
  </div>
}

function Decrease() {

  return <div>
    <button onClick={()=>{}}>Decrease</button>
  </div>
}


function Increase() {
  return <div>
    <button onClick={()=>{}}>Increase</button>
  </div>
}

export default App
```

---

### 2nd code snippit

```jsx
import { useEffect, useState, memo } from "react";
import './App.css'

function App() {

  return (
      <Counter />
  )
}

function Counter() {
    const [count, setCount] = useState(0)

    useEffect(() => {
      setInterval(()=>{
        setCount(c=>c+1)
      },1000)
    
    }, [])
    

  return <div>
    <CurrentCount />
    <Increase />
    <Decrease />
  </div>
}

const CurrentCount = memo(function CurrentCount(props) {
  return <div>
    {props.count}
  </div>
})

const Decrease = memo(function Decrease() {

  return <div>
    <button onClick={()=>{}}>Decrease</button>
  </div>
})


const Increase = memo(function Increase() {
  return <div>
    <button onClick={()=>{}}>Increase</button>
  </div>
})

export default App
```

---
---
---



### Q. what is the difference between this two code in re-rendering and how memo is used?

In these two code snippets, the main difference lies in the use of `memo`, which optimizes re-renders by preventing unnecessary re-renders of certain components when their props or state haven't changed.

### Key Differences in Re-rendering:

1. **Without `memo` (First Code)**:
   - In the first code snippet, `CurrentCount`, `Increase`, and `Decrease` are regular components. Since they are inside the `Counter` component, they will re-render every time `Counter` re-renders.
   - `Counter` re-renders every 3 seconds because the `count` state changes in the `useEffect` with `setInterval`, even though `CurrentCount`, `Increase`, and `Decrease` don’t use or display this `count` state.
   - As a result, `CurrentCount`, `Increase`, and `Decrease` re-render every 3 seconds even though they don’t depend on `count`, which is inefficient.

2. **With `memo` (Second Code)**:
   - In the second code snippet, `memo` is applied to `CurrentCount`, `Increase`, and `Decrease`. This optimizes these components to avoid unnecessary re-renders.
   - `memo` is a higher-order component (HOC) that "memoizes" the component, meaning it only re-renders if its props or state change.
   - Since none of these components depend on the `count` state directly, they do not need to re-render every 3 seconds.
   - With `memo`, `CurrentCount`, `Increase`, and `Decrease` will only re-render if their own props change (they have none in this example), making the code more efficient.

### How `memo` Works:

- `memo` is used to wrap components to optimize performance by "remembering" the last rendered output.
- When `memo` wraps a component, it performs a shallow comparison of the component's props. If the props haven’t changed, React skips rendering and reuses the previous output of the component.
- In this example, `memo` helps avoid the redundant re-renders in `CurrentCount`, `Increase`, and `Decrease`, as they don't depend on `count` and thus don’t need to update when `count` changes.

### Summary:

- **Without `memo`**: `CurrentCount`, `Increase`, and `Decrease` re-render every 3 seconds along with `Counter`.
- **With `memo`**: `CurrentCount`, `Increase`, and `Decrease` render only once and are not re-rendered every 3 seconds, improving performance.