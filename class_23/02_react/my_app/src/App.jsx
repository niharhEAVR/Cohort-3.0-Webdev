import { useEffect, useState, memo } from "react";
import './App.css'

// Read the 02_memo.md & 03_memo.md to understand this example

function App() {

  return (
    <Counter />
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

  }, [])


  return <div>
    <CurrentCount count={count} />
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
    <button onClick={() => { }}>Decrease</button>
  </div>
})


const Increase = memo(function Increase() {
  return <div>
    <button onClick={() => { }}>Increase</button>
  </div>
})

export default App