import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    return <div>
        <Counter count={count} count2={count2} />
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>increase</button>
        <button onClick={() => setCount2((prevCount) => prevCount - 1)}>decrease</button><br /><br />
    </div>
}

function Counter(props) {
    console.log("Counter rendered")

    useEffect(() => {
        console.log("mount normal");
        return ()=>{
            console.log("Unmount normal");
        }
    }, []) // no depemdemcy means that it will stick with our app untill the whole server is re run again


    useEffect(() => {
        console.log("mount for count2");
        return ()=>{
            console.log("Unmount for count2");
        }
    }, [props.count2]) // giving dependency means for every change of count2 the useeffect disconnects and connects

    return (
        <>
            <h1>Increaser {props.count}</h1>
            <h1>Decreaser {props.count2}</h1>
        </>
    )
}

export default App


// Read the 07_final_notes.md for visualization understanding