## Polling is **one of the oldest techniques** for getting updates from a server **before WebSockets existed**.

---

# ✅ **What is Polling?**

**Polling = The client repeatedly asks the server: “Any new data?”**

Like this:

```
Client → Server : Any update?
Server → Client : No
Client → Server : Any update?
Server → Client : Yes, here!
```

It is literally **checking again and again**, usually every 1–2 seconds.

---

# ✅ **Why do we call it “polling”?**

Because the server does NOT push data automatically.
The *client pulls data* periodically.

---

# 🔥 Example: Polling in a Chat App (Old Method)

Before WebSockets, chat apps worked like this:

1. User sends a message.
2. Every 1 second, your browser asks the server:

   * “Do I have new messages?”
3. Server checks database.
4. Server responds:

   * “Yes message”
   * Or “No message”

This creates **huge network overhead** because the client may ask 1000 times but only receive new data a few times.

---

# 📌 **Types of Polling**

### 1️⃣ **Regular Polling**

Fixed interval:

```
setInterval(() => askServer(), 1000);
```

### 2️⃣ **Long Polling**

The server **keeps the request open** and only responds when new data arrives.

Client:

```
GET /messages
(waiting…)
```

Server:

```
When new message arrives → respond → client reconnects
```

This reduces spam but still uses HTTP.

---

# 🎯 **Why Polling is Worse Than WebSockets**

| Feature             | Polling            | WebSockets                |
| ------------------- | ------------------ | ------------------------- |
| Connection          | Many HTTP requests | One long-lived connection |
| Speed               | Slower             | Real-time                 |
| Overhead            | High               | Very low                  |
| Server Load         | High               | Low                       |
| Suitable for games? | ❌ No               | ✅ Yes                     |

WebSockets allow **push communication**:

```
Server → Client anytime (no need to ask)
```

---

# 🎮 **Polling in Games?**

Modern real-time games **never use polling**.
It’s too slow.

Games use:

### ✓ **UDP** (e.g., Fortnite, CS:GO, Valorant)

For movement & shooting.

### ✓ **WebSockets**

For browser games or simple multiplayer games.

### ✓ **TCP**

For login, inventory, match-making, store purchase.

Polling would cause:

* Lag
* Delayed shots
* Bad hit registration

So games avoid it.

---

# 👍 **Short Summary**

**Polling** = Client repeatedly asks for updates → slow, wasteful.
**WebSockets** = Persistent connection → real-time.
**UDP** = Fire-and-forget for fast game updates.
**TCP** = Guaranteed delivery for important data.
