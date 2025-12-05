# **Real multiplayer games DO NOT use WebSockets**, so they also do **NOT use WebSocket libraries**.

Because games use **UDP**, they use **networking libraries built specifically for game networking** — NOT for WebSockets.


---

# 🎮 **1. ENet (UDP-based, extremely popular for games)**

🔹 Used by:

* Minecraft Bedrock
* Godot Engine
* Various indie multiplayer games
* Many custom game engines

🔹 What it is:
ENet is a **reliable UDP** layer.
It adds:

* Optional reliability
* Channels
* Sequencing
* Packet loss handling
  But still keeps UDP fast.

🔹 Think of ENet as:

> UDP + just enough reliability for games

---

# 🎮 **2. RakNet (C++ UDP networking for games)**

🔹 Used by:

* Minecraft (older Java versions)
* PlayStation games (official SDK used to include it)
* Unity games (older networking)

🔹 Features:

* NAT Punchthrough
* Voice chat
* Reliable UDP
* Game-ready RPCs

RakNet is one of the most famous game networking libraries ever.

---

# 🎮 **3. Steam Networking Sockets / GameNetworkingSockets**

🔹 Used by:

* **CS:GO**
* **Dota 2**
* **Team Fortress 2**
* All modern Valve games

Open-source version:
[https://github.com/ValveSoftware/GameNetworkingSockets](https://github.com/ValveSoftware/GameNetworkingSockets)

Built on **UDP + strong reliability + security**.

---

# 🎮 **4. Photon (Cloud-based game networking)**

Used heavily in mobile & indie games:

* Among Us
* VRChat
* Many Unity mobile games
* Multiplayer RPGs, shooters, etc.

Photon uses its own UDP-based protocol.

---

# 🎮 **5. Netcode for GameObjects / Unity Transport Layer (UTP)**

Unity’s official modern multiplayer system.

UTP uses:

* **UDP**
* Enet-like reliability
* Lag compensation features

Games built in Unity use this by default.

---

# 🎮 **6. Unreal Engine Networking (UE-Net)**

Used by:

* Fortnite
* Unreal Tournament
* Valorant (modified)

Unreal has its own **UDP-based** networking stack:

* Replication system
* State synchronization
* Prediction
* Lag compensation

---

# 🎮 **7. Lidgren (C# / .NET)**

Used by:

* MonoGame
* Terraria multiplayer servers
* Many custom C# engines

Reliable UDP library for .NET.

---

# 🎮 **8. KCP (UDP-based reliable protocol)**

Modern, extremely fast, used by:

* Game servers
* Mobile games
* Real-time networking apps

Variants exist for:

* C
* C++
* C#
* Go
* Node.js (kcp-js)

KCP is popular because it handles packet loss extremely well.

---

# 🎮 **9. QUIC (UDP-based modern protocol by Google)**

Used by:

* Stadia
* Chrome
* Cloud gaming solutions
* Multiplayer cloud engines

HTTP/3 is built on QUIC (which is built on UDP).

---

# 🧠 **Important Note**

Games **never** use WebSocket libraries like:

* `ws`
* `socket.io`
* `websocket`

Because ALL of those are **TCP-based**, and TCP = lag.

---

# 🟢 **So, What Library Does Which Game Use?**

| Game / Engine     | UDP Library                     |
| ----------------- | ------------------------------- |
| Fortnite          | Unreal Engine replication (UDP) |
| Valorant          | Custom UDP + UE                 |
| CS:GO             | SteamNetworkingSockets          |
| Minecraft Java    | RakNet (older) + custom         |
| Minecraft Bedrock | ENet                            |
| Among Us          | Photon (UDP)                    |
| Roblox            | Custom UDP                      |
| Godot Engine      | ENet                            |
| Unity             | UTP / Netcode (UDP)             |
| Terraria          | Lidgren (C# UDP)                |

---

# ⭐ Short Answer (Simple Version)

Games use **UDP-specific networking libraries**, not WebSocket libraries.

The most important ones:

### ✅ ENet

### ✅ RakNet

### ✅ SteamNetworkingSockets

### ✅ Unity Transport (UTP)

### ✅ Unreal Engine networking

### ✅ Lidgren

### ✅ Photon

### ✅ KCP

---
---
---

# 🎯 **Core Idea:**

### **Games use UDP = “send and forget”, BUT…**

👉 **They do not rely on every packet.**
👉 **The server decides the truth (authoritative server).**
👉 **Important actions like shooting ARE confirmed/reliable.**
👉 **Movement stays smooth even if some packets are lost.**

This is the secret.

Let’s break it visually 👇

---

# 🟦 1. **Movement uses unreliable packets (UDP “send & forget”)**

You move your mouse → your client sends:

```
{ position: (10, 20), direction: 90deg }
{ position: (12, 20), direction: 90deg }
{ position: (14, 20), direction: 90deg }
```

If ONE packet is lost:

```
{ position: (12, 20) }  ❌ lost
```

It doesn’t matter because the server soon gets:

```
{ position: (14, 20) } ✔️
```

So the game continues smoothly.

➡ **Movement = not important to be perfect every frame.**
➡ **Losing a movement packet = fine.**

---

# 🔴 2. **Shooting uses reliable packets (reliable UDP)**

Here is the trick:

Even though UDP itself is unreliable…

### Game networking libraries (ENet, RakNet, Unreal, Unity) add:

* **Reliable packet channels**
* **Sequenced packet channels**
* **Critical action tracking**

Example: When you shoot:

```
I fired my gun at time 12900ms, bullet direction XYZ
```

This packet is sent on a **reliable channel**, meaning:

* If lost → resent automatically
* Server cannot ignore it
* Server cannot miss it
* Server processes it in order

---

# 🟩 3. **Server confirms kills, NOT the client**

Client sends:

```
playerShot(bulletDirection, timestamp)
```

Server receives it
(Server NEVER trusts the client because cheaters exist)

Server checks:

* Where you were
* Where the enemy was
* Lag compensation (rewind positions)
* Whether the bullet hit
* How much damage it should do

THEN server says:

```
You hit enemy_4 for 89 damage
Enemy_4 died
Update kill count
```

The server sends:

```
{ kill: playerID, killedBy: you }
```

---

# 🟨 4. **Even if the shot packet is late, the server fixes it**

Example:

You shoot at 10:00:100
Packet arrives at 10:00:120 (20ms late)

Server uses **lag compensation**:

1. Rewinds enemy position back 20ms
2. Checks if your shot hit
3. Calculates correct result
4. Sends back hit confirmation / kill update

This is why:

* You shoot
* 20ms later → ✔ hit shows
* Game feels fair

---

# 🟣 5. **What about cheats?**

You *cannot* tell server “I killed the enemy”

Your client only sends:

```
I shot in this direction at this time.
```

The server decides the actual result.

---

# ⭐ FINAL SUMMARY (READ THIS)

### 🟢 **MOVEMENT:**

* Uses **unreliable UDP packets**
* Sending 60 packets/sec
* If 1–2 packets drop → no problem
* Game continues smoothly

### 🔴 **ACTIONS LIKE SHOOTING:**

* Use **reliable packets** (via ENet/RakNet/UTP/etc.)
* Must reach server
* Must be processed in order
* Must be confirmed by server
* Server determines:

  * Hit
  * Damage
  * Kill
  * Score

### 🔵 **UDP is “send & forget” only for unimportant data**

* Positions
* Rotations
* Velocities

### 🔴 **Important actions have reliability layers built on top of UDP**

* Shooting
* Reloading
* Opening doors
* Throwing grenades
* Using abilities

---

# 🎮 Example: Valorant

When you shoot:

1️⃣ Client → sends shot packet (reliable UDP)
2️⃣ Server → replays last 50 ms (lag compensation)
3️⃣ Server → calculates if bullet hits
4️⃣ Server → sends:

```
hit: 1
damage: 124
player_dead: enemy_3
kill_count_update: you
```

5️⃣ Your game updates instantly
