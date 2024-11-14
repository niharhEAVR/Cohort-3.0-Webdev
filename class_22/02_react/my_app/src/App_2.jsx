import { useState, useEffect } from 'react'
import './App.css'
import { usePrev } from './custom_hooks/usePrev'

function App() {
  const [count, setCount] = useState(0)
  
  const previousValue = usePrev(count)

  return (
    <>
    {count}
    <br />
    <button onClick={()=>{setCount(c=>c+1)}}>click</button>
    <br />
      <h3>The Previous value type is: {typeof previousValue}</h3>
      <h3>The Previous value is: {previousValue}</h3>
    </>
  )
}

export default App
