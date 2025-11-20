import { useEffect, useState, useRef } from 'react';
import './App.css'

function App() {
    return (<>
        <Focuser />
        <RenderCount />
        <Chat />
    </>)
}

function Focuser() {
    const inputRef = useRef()

    return (<>
        <div style={{ border: "2px solid white", margin: "10px", padding: "10px" }}>
            <span>Review: </span>
            <input ref={inputRef} type="text" />
            <br /><br />
            <button onClick={() => { inputRef.current.focus() }}>Focus on the review input</button>
        </div>
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

function Chat() {
    const [messages, setMessages] = useState(["Hello!", "How are you?"]);
    const chatBoxRef = useRef(null);

    const addMessage = () => {
        setMessages((prevMessages) => [...prevMessages, "New message!"]);
    };

    // Scroll to the bottom whenever a new message is added
    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    return (
        <div>
            <div
                ref={chatBoxRef}
                style={{ height: "200px", overflowY: "scroll", border: "1px solid white", padding: "10px" }}
            >
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <button onClick={addMessage}>Add Message</button>
        </div>
    );
}

export default App