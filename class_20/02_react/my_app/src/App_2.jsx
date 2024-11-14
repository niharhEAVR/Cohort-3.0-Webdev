import { useEffect, useRef } from 'react';
import './App.css'

function App() {
    const inputRef = useRef()

    return (<>
        <span>Review: </span>
        <input ref={inputRef} type="text" />
        <br /><br />
        <button onClick={() => { inputRef.current.focus() }}>Focus on the review input</button>
    </>)
}

export default App