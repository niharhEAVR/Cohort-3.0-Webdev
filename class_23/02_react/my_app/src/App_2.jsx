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
      },3000)
    
    }, [])
    

  return <div>
    <CurrentCount />
    <Increase />
    <Decrease />
  </div>
}

const CurrentCount = memo(function CurrentCount() {
  return <div>
    hi
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

// read 02_memo.md