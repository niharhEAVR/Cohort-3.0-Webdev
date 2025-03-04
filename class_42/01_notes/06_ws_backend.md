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