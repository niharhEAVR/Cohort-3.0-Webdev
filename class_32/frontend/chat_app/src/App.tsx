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
    const messege = inputRef.current.value;
    //@ts-ignore
    socket.send(messege)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    //@ts-ignore
    setSocket(ws)

  }, [])
  return (
    <>
      <div>
        {/* @ts-ignore */}
        <input ref={inputRef} type="text" placeholder='Messege...' />
        <button onClick={sendMessege}>Send</button>
      </div>
    </>
  )
}

export default App