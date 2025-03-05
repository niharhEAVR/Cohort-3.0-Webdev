### **Understanding the Code: WebSocket Chat System in React**

The provided code consists of **two parts**:
1. `ChatRoomClient.tsx` → A **React component** that manages the chat interface.
2. `useSocket.ts` → A **custom React hook** that establishes a WebSocket connection.

Both of these work together to enable real-time chat functionality using WebSockets.

---

## **📌 Breakdown of `useSocket.ts` (WebSocket Hook)**

### **What this does?**
- This **custom hook** (`useSocket`) establishes a WebSocket connection when the component mounts.
- It stores the WebSocket instance in the `socket` state.
- It sets `loading` to `false` once the WebSocket connection is established.

### **Code Walkthrough**
```tsx
import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
```
- `useEffect` and `useState` from React are used to **manage state and side effects**.
- `WS_URL` contains the **WebSocket server URL**.

```tsx
export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
```
- `loading` indicates if the **WebSocket connection** is still in progress.
- `socket` stores the WebSocket instance.

```tsx
useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDMzOTdjMy01OTNkLTQwMjctYjExNC0yOTAyNGJhYjAyMTgiLCJpYXQiOjE3MzY2OTczMzB9.BxDMP3FqBsM6TrZcAGYFRA2FlmazFwQJ78mOHskatiM`);
```
- Creates a WebSocket connection to **WS_URL**.
- **Attaches a JWT token in the URL** (`?token=...`) for authentication.

```tsx
    ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
    }
}, []);
```
- When the WebSocket **opens** (`onopen` event), it updates `loading` and stores the WebSocket instance in `socket`.

### **Return Statement**
```tsx
return {
    socket,
    loading
}
```
- The function **returns the WebSocket instance (`socket`)** and **loading status (`loading`)** so other components can use it.

---

## **📌 Breakdown of `ChatRoomClient.tsx` (Chat Component)**

### **What this does?**
- This is the **React UI component** for the chat room.
- It **displays messages** and **sends messages** through WebSocket.

### **Code Walkthrough**
```tsx
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
```
- Imports `useSocket`, which provides WebSocket connection.

```tsx
export function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[];
    id: string
}) 
```
- Accepts two **props**:
  - `messages` → Initial chat messages.
  - `id` → Chat room ID.

```tsx
const [chats, setChats] = useState(messages);
const [currentMessage, setCurrentMessage] = useState("");
const {socket, loading} = useSocket();
```
- `chats` → Stores chat messages.
- `currentMessage` → Stores the **input text**.
- `socket` and `loading` come from `useSocket()`.

---

### **1️⃣ Handling WebSocket Connection**
```tsx
useEffect(() => {
    if (socket && !loading) {
        socket.send(JSON.stringify({
            type: "join_room",
            roomId: id
        }));
```
- **Sends a message** to the WebSocket server to **join the chat room**.

---

### **2️⃣ Handling Incoming Messages**
```tsx
        socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.type === "chat") {
                setChats(c => [...c, {message: parsedData.message}])
            }
        }
```
- When the WebSocket **receives a message** (`onmessage` event):
  - It checks if the **message type is "chat"**.
  - **Adds the new message** to `chats`.

---

### **3️⃣ Rendering Messages**
```tsx
return <div>
    {chats.map(m => <div>{m.message}</div>)}
```
- **Displays the list of messages** in the chat room.

---

### **4️⃣ Handling Message Input**
```tsx
<input type="text" value={currentMessage} onChange={e => {
    setCurrentMessage(e.target.value);
}}></input>
```
- **Updates `currentMessage`** when the user types.

---

### **5️⃣ Sending Messages**
```tsx
<button onClick={() => {
    socket?.send(JSON.stringify({
        type: "chat",
        roomId: id,
        message: currentMessage
    }))

    setCurrentMessage("");
}}>Send message</button>
```
- When the **Send button** is clicked:
  - Sends a **WebSocket message** (`type: "chat"`, `roomId`, `message`).
  - **Clears the input field** after sending.

---

## **🎯 Example Flow**
### **Scenario: Alice and Bob in a Chat Room**
1. **Alice Opens Chat**  
   - The `ChatRoomClient` component mounts.
   - `useSocket` creates a WebSocket connection.
   - It sends `join_room` to the WebSocket server.

2. **Alice Sends "Hello!"**  
   - She types "Hello!" and clicks **Send**.
   - The **message is sent via WebSocket**.
   - The **WebSocket server stores the message in the database**.

3. **Bob Joins the Chat Room**  
   - His browser loads `ChatRoomClient`.
   - `useSocket` connects to WebSocket.
   - He receives all **previous messages from the server** (e.g., "Hello!").

4. **Bob Sends "Hi Alice!"**  
   - The **message is broadcasted** to all users in the chat room.
   - Alice sees **"Hi Alice!"** on her screen.

---

## **🛠 Relations Between Components**
| **Component** | **Function** |
|--------------|-------------|
| **`useSocket.ts`** | Establishes WebSocket connection and returns `socket` |
| **`ChatRoomClient.tsx`** | Uses `useSocket` to send and receive messages |
| **WebSocket Server (Backend)** | Handles real-time message broadcasting |

---

## **🔹 Summary**
- `useSocket.ts` → Manages WebSocket connection.
- `ChatRoomClient.tsx` → Manages chat UI and interacts with WebSocket.
- **React State (`useState`)** is used to store and update messages dynamically.
- **WebSockets** enable real-time communication.

---

### **🔥 Why Use WebSockets Instead of HTTP?**
| **Feature** | **WebSocket** | **HTTP** |
|------------|--------------|----------|
| Real-time Communication | ✅ Yes | ❌ No |
| Persistent Connection | ✅ Yes | ❌ No |
| Low Latency | ✅ Yes | ❌ No |
| Server-to-Client Push | ✅ Yes | ❌ No |

👉 **WebSockets are ideal for chat apps because they maintain an open connection for real-time message exchange.** 🚀