import { useEffect, useState, useRef } from "react"
import Frontend from "./components/Frontend"
function App() {
  const [messages, setMessages] = useState(["Chat Here..."]);
  const wsRef = useRef();
  
  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    
    wsRef.current = ws;


    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]) // this line of code actually doing is that if there is initial messages then add spread them on the array and add new messages also
      // if we only stores the current message then, previous message will goes away, which is not correct 
    }

    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }


    return () => {
      ws.close()
    }

  }, []);



  return (
    <>

      <Frontend messages={messages} ws={wsRef}/>

    </>
  )
}

export default App