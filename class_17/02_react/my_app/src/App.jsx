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
  // to understand whta is going on here read 01_notes.md on 02_react folder
}

export default App