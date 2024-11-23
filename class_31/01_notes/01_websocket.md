### Todays class slide link:
```link
https://petal-estimate-4e9.notion.site/WebSockets-1477dfd10735802982becc925074b5f0
```

---

### 1. **WebSockets**
WebSockets are a technology used for real-time communication between a client and a server. Unlike traditional HTTP requests, where the client sends a request and waits for a response, WebSockets allow both the client and the server to send messages to each other at any time without needing to wait.

---

### 2. **Persistent Communication Channel**
This means that once a connection is established, it stays open. Instead of opening and closing a connection for every interaction (like HTTP does), the WebSocket connection remains alive. This allows continuous communication without the overhead of repeatedly starting and stopping connections.

---

### 3. **Full-Duplex Communication**
**Full-duplex** means that data can flow in both directions simultaneously.  
- In HTTP, the client sends a request to the server, and the server sends back a response (half-duplex). 
- With WebSockets, both the client and server can send messages to each other independently at the same time, which is useful for applications like chat systems, online games, or stock price updates.

---

### 4. **TCP Connection**
TCP (Transmission Control Protocol) is a reliable communication protocol that ensures data sent between devices is delivered accurately and in order.  
- When WebSockets are used, they build upon a TCP connection.  
- This ensures that the communication between the client and the server is reliable and error-free.

---

### 5. **Client and Server**
- **Client**: Typically, this is a web browser or an application running on a user’s device.
- **Server**: This is the backend system (usually a web server) that provides services or resources to the client.

---

### 6. **How WebSockets Work**
1. The client (browser) sends an HTTP request to the server, asking to upgrade the connection to a WebSocket.
2. If the server supports WebSockets, it agrees to the upgrade and establishes a WebSocket connection.
3. Once established, both the client and server can send messages back and forth over this single connection.

---

### Why Use WebSockets?
- **Real-time updates**: Great for applications where data needs to be updated frequently without refreshing the page.
- **Efficiency**: Reduces the need for repeated HTTP requests, saving bandwidth and reducing latency.

Examples:
- Chat applications (e.g., WhatsApp Web).
- Online multiplayer games.
- Real-time stock price updates.
- Collaborative tools (e.g., Google Docs live editing).

If you need clarification on any of these points, feel free to ask!