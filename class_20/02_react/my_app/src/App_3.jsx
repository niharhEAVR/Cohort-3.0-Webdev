import { useState, useRef } from 'react';
import './App.css'

function App() {
    const [first, setfirst] = useState(0)
    const intervalRef = useRef(null)

    function startTimer() {
        if(intervalRef.current !== null) return;
        intervalRef.current = setInterval (()=>{
            setfirst(c => c+1)
        },1000)
    }
    function stopTimer() {
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }


    return (<>
        {first}
        <br /><br />
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
    </>)
}
 
export default App