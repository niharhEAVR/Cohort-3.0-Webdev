import { useEffect, useState, useRef } from 'react';
import './App.css'

function App() {
    const inputRef = useRef()

    return (<>
        <div style={{ border: "2px solid white", margin: "10px", padding: "10px" }}>
            <span>Review: </span>
            <input ref={inputRef} type="text" />
            <br /><br />
            <button onClick={() => { inputRef.current.focus() }}>Focus on the review input</button>
        </div>
        <RenderCount />
    </>)
}

function RenderCount() {
    const renderCount = useRef(0);
    const [count, setCount] = useState(0);

    renderCount.current++;

    return (
        <div style={{ border: "2px solid white", margin: "10px", padding: "10px" }}>
            This is a very good example of useState rerenders & useRef works.
            <p>Render Count: {renderCount.current}</p>
            <p>Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
    );
}

export default App