Let's go through this WebSocket server's code **line by line**, explaining every part in extreme detail.  

---

# **Overview of the Code**
This code creates a **WebSocket server** that allows users to:  
✅ Connect using a **JWT token** for authentication.  
✅ Join or leave **chat rooms** dynamically.  
✅ Send **messages** to other users in the same room.  
✅ Store **messages** in a database using Prisma.  

---

## **1️⃣ Importing Required Modules**
```ts
import { WebSocket, WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";
```

- **`ws`** → The WebSocket library to create a WebSocket server.  
- **`jsonwebtoken`** → Used to verify **JWT tokens**.  
- **`JWT_SECRET`** → The secret key used for **JWT verification**.  
- **`prismaClient`** → The Prisma database client for interacting with the database.  

---

## **2️⃣ Creating the WebSocket Server**
```ts
const wss = new WebSocketServer({ port: 8080 });
```
- Creates a **WebSocket server** that listens on port **8080**.  
- This server will handle **real-time communication** between clients.  

---

## **3️⃣ Defining the User Interface**
```ts
interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}
```
This defines the **structure** of a connected user:  
- `ws` → The WebSocket connection object.  
- `rooms` → A list of rooms the user has joined.  
- `userId` → The unique ID of the user.  

---

## **4️⃣ Storing Connected Users**
```ts
const users: User[] = [];
```
- An array to keep track of all **currently connected users**.  
- Each user is an object containing their **WebSocket connection, rooms, and user ID**.  

---

## **5️⃣ Function to Verify the User's JWT Token**
```ts
function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
```
- `checkUser(token: string)`:  
  - This function takes a **JWT token** and verifies if it's valid.  
  - If the token is valid, it returns the **user's ID**.  
  - If invalid, it returns `null`.  

### **JWT Verification Steps**
1. **`jwt.verify(token, JWT_SECRET)`**  
   - Verifies the token using `JWT_SECRET`.  
   - If the token is **tampered with**, it will throw an **error**.  
2. **Check if the decoded data is valid**  
```ts
    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }
```
- If `decoded` is a **string**, return `null` (JWT should be an object).  
- If `decoded` does not contain `userId`, return `null`.  

### **Return the User ID**
```ts
    return decoded.userId;
  } catch(e) {
    return null;
  }
}
```
- If everything is correct, return the `userId` from the token.  
- If **any error** occurs (invalid token, expired token, etc.), return `null`.  

---

## **6️⃣ Handling WebSocket Connections**
```ts
wss.on('connection', function connection(ws, request) {
```
- **Event Listener:**  
  - Runs **when a new client connects** to the WebSocket server.  
  - `ws` → The WebSocket **object** for this client.  
  - `request` → Contains details like the **URL** the client used to connect.  

---

## **7️⃣ Extracting the Token from the URL**
```ts
  const url = request.url; // Example: ws:localhost:8080?token=123123
  if (!url) {
    return;
  }
```
- **Extracts** the URL from the request.  
- If `url` is **empty**, return (do nothing).  

### **Splitting the URL to Get the Token**
```ts
  const queryParams = new URLSearchParams(url.split('?')[1]); // token=123123
  const token = queryParams.get('token') || "";
```
- **Splitting the URL:**  
  - `"ws:localhost:8080?token=123123".split('?')`  
  - Result: `["ws:localhost:8080", "token=123123"]`  
- **Extracting the token:**  
  - `queryParams.get('token')` retrieves `"123123"` from `"token=123123"`.  

---

## **8️⃣ Verifying the User**
```ts
  const userId = checkUser(token);
  if (userId == null) {
    ws.close();
    return null;
  }
```
- Calls `checkUser(token)` to verify the **JWT token**.  
- If `userId` is **null** (invalid token), **disconnect the user** (`ws.close()`).  

---

## **9️⃣ Storing the Connected User**
```ts
  users.push({
    userId,
    rooms: [],
    ws
  });
```
- Adds the user to the `users` array.  
- They are **not in any room yet** (`rooms: []`).  

---

## **🔟 Handling Incoming Messages**
```ts
  ws.on('message', async function message(data) {
```
- This listens for **messages** from the user.  
- Messages are received as **binary data or strings**.  

### **Parsing the Message**
```ts
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }
```
- If `data` is not a string, convert it to a string first.  
- Then **parse** it into a JSON object.  

---

## **1️⃣1️⃣ Handling Room Join Requests**
```ts
    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }
```
- **User joins a room** (`type: "join_room"`).  
- Finds the user in `users`.  
- Adds `roomId` to the user's `rooms` array.  

---

## **1️⃣2️⃣ Handling Room Leave Requests**
```ts
    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter(x => x === parsedData.room);
    }
```
- **User leaves a room** (`type: "leave_room"`).  
- Finds the user in `users`.  
- Removes the `roomId` from the user's `rooms` list.  

---

## **1️⃣3️⃣ Handling Chat Messages**
```ts
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
```
- If `type` is `"chat"`, extract `roomId` and `message`.  

### **Saving Message to Database**
```ts
      await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId
        }
      });
```
- Stores the **message** in the **Prisma database**.  
- `roomId` is converted to a number (`Number(roomId)`).  

### **Broadcasting the Message**
```ts
      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
```
- Sends the **message** to **all users** in the same `roomId`.  

---

## **Final Summary**
1️⃣ **User connects** using a WebSocket with a JWT token.  
2️⃣ The **token is verified**, and the user is stored in `users[]`.  
3️⃣ User can **join/leave rooms** dynamically.  
4️⃣ Messages are **saved in the database** using Prisma.  
5️⃣ Messages are **broadcasted** to all users in the same room.  

---
---
---

Great question! This WebSocket server is designed to provide **real-time chat functionality**. Now, let's break down **why** it does each of these steps and how they contribute to the overall system.  

---

# **🛠️ Purpose of the Code**
The goal is to create a **real-time chat system** where users can:  
✅ **Authenticate** themselves using a JWT token.  
✅ **Join and leave chat rooms** dynamically.  
✅ **Send and receive messages** in real-time.  
✅ **Store chat messages** in a database.  

Now, let’s go step by step and understand **why** each part is needed.

---

## **1️⃣ Why do we verify the JWT token?**
```ts
const userId = checkUser(token);
if (userId == null) {
  ws.close();
  return null;
}
```
### 🔹 **Why is authentication needed?**
- We **do not** want random users to connect and spam the chat.  
- Only **authorized users** should be allowed to join.  
- The **JWT token** ensures the user is valid and has a unique `userId`.  

🔹 **Without authentication, anyone can:**  
❌ Flood the chat with spam.  
❌ Impersonate other users.  
❌ Access private messages.

---

## **2️⃣ Why do we store connected users?**
```ts
const users: User[] = [];
```
### 🔹 **Why keep track of users?**
- We need to **know which users are connected** at any time.  
- We also need to **track which rooms each user has joined**.  
- This helps in **sending messages to the right users**.  

🔹 **Without storing users, we wouldn’t know:**  
❌ Who is online.  
❌ Which rooms they belong to.  
❌ Where to send messages.

---

## **3️⃣ Why do we allow users to join/leave rooms?**
```ts
if (parsedData.type === "join_room") {
  const user = users.find(x => x.ws === ws);
  user?.rooms.push(parsedData.roomId);
}
```
### 🔹 **Why do users join rooms?**
- A **chat room** is a separate conversation space.  
- Users should be able to **switch between rooms** dynamically.  
- We **track which users are in which rooms** to send messages only to **relevant users**.  

🔹 **Without rooms, the chat would be chaotic:**  
❌ Everyone would receive every message.  
❌ No way to have private/group chats.  

---

## **4️⃣ Why do we store chat messages in a database?**
```ts
await prismaClient.chat.create({
  data: {
    roomId: Number(roomId),
    message,
    userId
  }
});
```
### 🔹 **Why save messages?**
- Messages should be **saved permanently** for future reference.  
- Users should see **previous messages** when they rejoin a room.  
- If the server restarts, we don't want to **lose all chat history**.  

🔹 **Without saving messages, we’d face these issues:**  
❌ Messages disappear when a user disconnects.  
❌ No chat history when rejoining.  

---

## **5️⃣ Why do we broadcast messages to users in the same room?**
```ts
users.forEach(user => {
  if (user.rooms.includes(roomId)) {
    user.ws.send(JSON.stringify({
      type: "chat",
      message: message,
      roomId
    }));
  }
});
```
### 🔹 **Why send messages to only specific users?**
- Users **should only see messages** from the rooms they joined.  
- Prevents **unnecessary spam** to users in different rooms.  
- Ensures **efficient message delivery** to the correct recipients.  

🔹 **Without this filtering, we’d have these problems:**  
❌ Messages from **all rooms** go to **all users** (even if they’re not in that room).  
❌ Users **get overwhelmed** by messages they don’t care about.  

---

# **🔑 Final Answer: Why Does the Code Do All This?**
This WebSocket server is **carefully designed** to:  
1️⃣ **Authenticate users** with JWT tokens.  
2️⃣ **Track online users** and the rooms they join.  
3️⃣ **Allow users to join/leave chat rooms dynamically.**  
4️⃣ **Store messages in the database for persistence.**  
5️⃣ **Send messages only to users in the same room.**  

📌 **Without these steps, the chat system would be insecure, inefficient, and chaotic.**


---
---
---

Great question! The reason the code **stores connected users in an array (`users: User[] = [];`) instead of using something else** (like a database or a different data structure) comes down to **performance, efficiency, and real-time communication needs**.

---

## **🔹 Why Store Users in Memory Instead of a Database?**
A WebSocket server is designed for **real-time communication**, and **speed is critical**. If we stored connected users in a database every time they joined or left, it would:  

❌ **Increase database load** → Constant reads/writes would slow things down.  
❌ **Add latency** → Every chat message would require a database query to check online users.  
❌ **Be unnecessary** → The database already stores **persistent data**, but online users are temporary.  

✅ Instead, storing connected users in **memory (RAM)** allows:  
✔️ **Instant lookups** (no database queries needed).  
✔️ **Faster message delivery** (we don’t wait for database responses).  
✔️ **Efficient tracking** (WebSockets are all about real-time state).  

---

## **🔹 Why Use an Array Instead of a Map/Object?**
```ts
const users: User[] = []; // List of all connected users
```
The code uses an **array (`[]`)** to store users instead of an object (`{}`) or a `Map`. Here’s why:

### **1️⃣ Arrays are Simple and Easy to Iterate Over**
- When sending messages, the server **loops over all users** and sends messages to the correct ones:
  ```ts
  users.forEach(user => {
    if (user.rooms.includes(roomId)) {
      user.ws.send(JSON.stringify({ type: "chat", message, roomId }));
    }
  });
  ```
- If we used an object `{}` or a `Map`, we’d have to manually extract keys/values before iterating.

### **2️⃣ Objects or Maps Need Unique Keys**
- If we used an object, it would need `userId` as the key:
  ```ts
  const users = {
    "user1": { ws: ..., rooms: [...] },
    "user2": { ws: ..., rooms: [...] }
  };
  ```
- But WebSocket connections don’t always have a **stable unique identifier** until after authentication.

### **3️⃣ Small-Scale WebSocket Servers Don't Need a More Complex Data Structure**
- If handling **millions** of users, we might use a `Map` for **faster lookups** (O(1) instead of O(n)).
- But for most chat apps, an array is **good enough** since it’s easy to manage.

---

## **🔹 Why Do We Store a List of Rooms for Each User?**
```ts
const users: User[] = [{
  userId: "abc123",
  rooms: [1, 2],
  ws: WebSocket
}];
```
- Each user can **join multiple rooms**.
- Instead of storing **which users belong to which rooms** globally, we track **which rooms each user is in**.
- This makes **message filtering efficient** → We don’t need to check a separate data structure to know which users are in a room.

---

## **🔑 Summary: Why Did the Code Store Users This Way?**
1️⃣ **WebSockets are real-time** → Storing users in memory avoids slow database queries.  
2️⃣ **An array is easy to iterate** → Perfect for small/medium-scale chat apps.  
3️⃣ **Tracking rooms per user** makes it efficient to send messages to only the right people.  

✅ This design **keeps things simple, fast, and scalable** without unnecessary complexity! 🚀


---
---
---



Great question! Let's break it down in detail.  

---

# **🟢 State Management in the Backend**
State management in a backend refers to how a server **stores and manages data** between different client requests.  

There are two types:  
1. **Stateless HTTP Backends** (Most REST APIs)  
2. **Stateful WebSocket Backends** (Real-time connections)  

---

## **🔹 Stateless HTTP Backends (REST APIs)**
### **1️⃣ What Does Stateless Mean?**
- **Each request is independent** and does not rely on past requests.  
- The server does **not** store any client session data.  
- The client must send **all necessary information** (like authentication tokens) with each request.  

### **2️⃣ How Does It Work?**
- The client sends a request to the server → The server processes it → The server responds.  
- The server does **not** remember anything after sending the response.  

💡 **Example (REST API Call)**:
```http
GET /user/profile
Authorization: Bearer <JWT_TOKEN>
```
- The server **validates the token** and returns the user profile.  
- If the client makes another request later, they **must send the token again**.  

### **3️⃣ Why Are HTTP APIs Stateless?**
- **Scalability** → Since no session is stored, any server can handle a request.  
- **Reliability** → A crashed server won’t affect ongoing user sessions.  
- **Performance** → No extra memory is used to store session data.  

### **4️⃣ Where Is State Stored If the Server Is Stateless?**
- **On the Client:** The frontend stores data in local storage, cookies, or session storage.  
- **In a Database:** The server stores long-term data (like users, orders, etc.).  

---

## **🔹 Stateful WebSocket Backends**
### **1️⃣ What Does Stateful Mean?**
- **The server maintains a persistent connection** with the client.  
- The server **remembers information** about connected users (state).  
- Messages can be sent **at any time** without the client initiating a request.  

### **2️⃣ How Does It Work?**
- A WebSocket connection stays **open** between the client and server.  
- The server **remembers the client** (e.g., their rooms, online status).  
- The server can **push** messages to the client without waiting for a request.  

💡 **Example (WebSocket Chat App)**:
```ts
const ws = new WebSocket("ws://server.com?token=123");
ws.send(JSON.stringify({ type: "join_room", roomId: 1 }));
```
- The server **remembers** which user joined which room.  
- When a message is sent to the room, **only users in that room receive it**.  

### **3️⃣ Why Are WebSocket Servers Stateful?**
- **Real-time communication** → Users expect live updates.  
- **Efficient for messaging apps, live games, stock prices, etc.**  
- **Needs user session tracking** → The server needs to know which users are connected.  

### **4️⃣ Where Is State Stored?**
- **In Memory (RAM):** Active users, chat rooms, online status, etc.  
- **In a Database:** Messages and persistent data (e.g., chat history).  

---

## **🛠️ Comparing Stateless vs. Stateful Backends**

| Feature             | **Stateless (HTTP API)** | **Stateful (WebSockets)** |
|--------------------|------------------------|---------------------------|
| **Connection Type** | Short-lived (per request) | Persistent (always connected) |
| **Server Memory Usage** | Low | Higher (stores active users, rooms, etc.) |
| **Scalability** | Easier | Harder (sticky sessions needed) |
| **Client Initiates?** | Yes | No (server can send updates anytime) |
| **Best For?** | REST APIs, microservices | Chat apps, multiplayer games, live updates |

---

## **💡 Why Do Many Apps Use Both?**
- **Authentication (Stateless HTTP API)**
  - User logs in using a stateless API (sends a JWT token).  
- **Chat System (Stateful WebSocket Server)**
  - The frontend **opens a WebSocket connection** after login.  
  - The WebSocket server **remembers the user’s connection**.  
  - Messages are sent/received in real time.  

This **hybrid approach** is common in modern apps like WhatsApp, Discord, and Slack. 🚀

Yes! In your **WebSocket server**, the state is stored in the `users` array:  

```ts
const users: User[] = [];
```
This array **keeps track of active users** who have established a WebSocket connection.  

---

## **🔹 How Is State Managed in the `users` Array?**
1️⃣ **When a user connects** → They are added to `users`  
2️⃣ **When a user joins a room** → The room ID is added to their `rooms` list  
3️⃣ **When a user leaves a room** → The room ID is removed from their `rooms` list  
4️⃣ **When a user disconnects** → They are removed from `users`  

---

## **🔹 Where Exactly Is Each User's State Stored?**
Each user’s state is stored as an object inside the `users` array:
```ts
interface User {
  ws: WebSocket,  // Their WebSocket connection
  rooms: string[],  // Rooms they have joined
  userId: string   // Their unique ID
}
```

### **🔸 When a User Connects:**
When a user establishes a WebSocket connection, we add them to the array:
```ts
users.push({
  userId,    // Store their user ID
  rooms: [],  // Initially, they are not in any rooms
  ws         // Store their WebSocket connection
});
```
**➡ This means the server now remembers that the user is online.**  

---

### **🔸 When a User Joins a Room:**
If they send a message like:
```json
{ "type": "join_room", "roomId": 1 }
```
We update their entry in `users`:
```ts
const user = users.find(x => x.ws === ws);
user?.rooms.push(parsedData.roomId);
```
**➡ Now, the server remembers that this user is in room `1`.**  

---

### **🔸 When a User Sends a Message:**
If they send a chat message:
```json
{ "type": "chat", "roomId": 1, "message": "Hello World!" }
```
1. **Save it in the database** (long-term storage)
```ts
await prismaClient.chat.create({
  data: {
    roomId: Number(roomId),
    message,
    userId
  }
});
```
2. **Send it to all users in that room**
```ts
users.forEach(user => {
  if (user.rooms.includes(roomId)) {
    user.ws.send(JSON.stringify({ type: "chat", message, roomId }));
  }
});
```
**➡ Now, only users in room `1` will receive this message.**  

---

### **🔸 When a User Leaves a Room:**
If they send:
```json
{ "type": "leave_room", "roomId": 1 }
```
We remove the room from their list:
```ts
user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
```
**➡ The server stops sending them messages from this room.**  

---

### **🔸 When a User Disconnects:**
When a WebSocket connection closes, they should be **removed from `users`** to free up memory.  

---

## **🔹 Why Store State in an Array Instead of a Database?**
- **Fast lookup**: Checking `users` is faster than querying a database.  
- **Only stores active users**: Users who disconnect are removed automatically.  
- **Temporary state**: WebSocket state does not need to be permanently saved.  

---

## **🛠 Summary**
- **State is stored in the `users` array** (in RAM).  
- **Each user has a WebSocket connection, userId, and room list.**  
- **This allows real-time chat features like joining rooms & sending messages.**  
- **When they disconnect, their state is removed from the array.**  

This is why **WebSockets are stateful**—the server keeps track of user sessions in memory. 🚀