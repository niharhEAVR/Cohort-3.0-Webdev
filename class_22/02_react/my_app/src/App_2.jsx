import { useState } from 'react'
import './App.css'
import { usePrev } from './custom_hooks/usePrev'

function App() {
  const [count, setCount] = useState(0)

  const previousValue = usePrev(count)

  return (
    <>
      <h3>Current Value: {count}</h3>
      <br />
      <button onClick={() => { setCount(c => c + 1) }}>click</button>
      <br />
      <h3>The Previous value type is: <i>{typeof previousValue}</i></h3>
      <h3>The Previous value is: {previousValue}</h3>
    </>
  )
}

export default App
