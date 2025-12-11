import { useEffect, useState, useRef } from "react";
import Frontend from "./components/Frontend";

interface Msg {
  text: string;
  self: boolean;
}


function App() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const wsRef = useRef<WebSocket>(null as any);

  // Create WebSocket connection only once
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws; // stroing the ws connection for the future use.

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, { text: event.data, self: false }]);
    };


    return () => ws.close();
  }, []);

  // Join room handler
  const joinRoom = (roomId: string) => {
    setMessages([]);        // clear old room messages
    setCurrentRoom(roomId); // store current room name

    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: { roomId },
      })
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">

      {/* Room Selection Buttons */}
      {currentRoom === null && (
        <div className="flex gap-6">
          <button
            className="px-6 py-3 bg-gray-800 rounded-lg text-lg"
            onClick={() => joinRoom("black")}
          >
            Enter Black Room
          </button>

          <button
            className="px-6 py-3 bg-red-600 rounded-lg text-lg"
            onClick={() => joinRoom("red")}
          >
            Enter Red Room
          </button>
        </div>
      )}

      {/* Chat UI */}
      {currentRoom !== null && (
        <Frontend
          messages={messages}
          ws={wsRef}
          setSrc={setCurrentRoom}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

export default App;
