# **prop drilling**

---

# 🎯 **Simple One-Line Definition**

### **Prop drilling = Passing data through components that don’t need it, just to reach the component that does.**

---

# 🧠 Real-Life Analogy (Easiest Way)

Imagine you want to give a message to your little brother (bottom floor).
You give the message to your mom → she gives it to your dad → he gives it to your sister → she gives it to your brother.

Mom, dad, sister **don’t need the message**, but they still have to pass it down.

This is **prop drilling**.

---

# 🧩 Visual Diagram

```
App
 ├── Level1
 │     ├── Level2
 │     │     └── Level3 (needs the data)
```

Data lives in `App`, but Level1 and Level2 don’t need it.

Still you must do:

```jsx
<Level1 user={user} />
```

↓

```jsx
<Level2 user={user} />
```

↓

```jsx
<Level3 user={user} />  // This component actually needs it
```

Level1 and Level2 become **delivery boys**.

---

# 💥 Why is this bad?

### 1️⃣ Components get unnecessary props

Even if they don’t use them.

### 2️⃣ Makes code harder to read and maintain

More props → more complexity.

### 3️⃣ Causes unnecessary re-renders

Every time `user` changes:

* Level1 re-renders
* Level2 re-renders
* Level3 re-renders

…even though only Level3 needed it.

### 4️⃣ Makes deeper UIs painful

Imagine passing props 5–10 layers down → chaos.

---

# 🧪 Small Code Example

### Without prop drilling (ideal)

```
App --> AuthContext --> Level3
```

### With prop drilling (problem)

```jsx
function App() {
  const user = "Arjun";
  return <Level1 user={user} />;
}

function Level1({ user }) {
  return <Level2 user={user} />;
}

function Level2({ user }) {
  return <Level3 user={user} />;
}

function Level3({ user }) {
  return <div>Welcome {user}</div>;
}
```

Here:

* Level1 does NOT need user
* Level2 does NOT need user
* But they **must** receive and pass it
  → **prop drilling**

---

# 🎉 Important: When does prop drilling happen?

### Prop drilling happens when:

* The state is at the **top**,
* The component that needs it is **deep down**,
* You pass the prop through many layers in between,
* Even if those layers don’t use the data.

---

# 🧠 How do we fix/avoid prop drilling?

These tools help:

## ✔ **1. React Context API**

Share data directly without passing props.

## ✔ **2. State management (Zustand, Redux, Jotai)**

Stores global state that any component can access.

## ✔ **3. Component composition**

If possible, restructure UI.

---

# 🎉 Summary (Super Short)

### Prop drilling =

Passing props → through components → that don't need them → just to reach a child.

It makes the app:

* Harder to maintain
* Harder to read
* Slower due to re-renders

And that’s why Context and global store exist.