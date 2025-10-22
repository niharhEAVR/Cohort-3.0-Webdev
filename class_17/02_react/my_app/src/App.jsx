import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0) // hook

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </>
  )
  // to understand what is going on here read 03_code_explanation.md on 02_react folder
}

export default App