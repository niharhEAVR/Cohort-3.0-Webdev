import { useState, useEffect } from 'react'
import './App.css'

function App() {
  return <div>
    <Counter />
  </div>
}

function Counter() {
  const [count, setCount] = useState(0)

  console.log("Counter rendered")

  // read 04_notes.md for useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)

    // make use to off the strictmode to see this
    console.log("Onetime this mount get printed")
    // Cleanup function to clear the interval when component unmounts
    return () => {
      console.log("unmount");
      clearInterval(interval)
    } // read 03_notes.md
  }, []) // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>increase</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>decrease</button><br /><br />
      <button onClick={() => setCount(0)}>reset</button>
    </>
  )
}

export default App
