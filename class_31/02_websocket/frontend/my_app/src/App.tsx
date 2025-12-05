import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessege() {
    if (!socket) {
      return;
    }
    //@ts-ignore
    const messege =  inputRef.current.value;
    //@ts-ignore
    socket.send(messege)
  }
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    //@ts-ignore
    setSocket(ws)
    
    ws.onmessage = (ev) => {
      alert(ev.data);
    }
    
    // ws.onerror =()=>{}
    // ws.close =()=>{}
  }, [])
  return (
    <>
      <div>
        {/* @ts-ignore */}
        <input ref={inputRef} type="text" placeholder='Messege...' value={"ping"}/>
        <button onClick={sendMessege}>Send</button>
      </div>
    </>
  )
}

export default App

// if you dont understand this then read 05_code_explanation.md in 01_notes folder
