# **lifting state up**
---

# 🎯 **THE SIMPLEST EXPLANATION**

Think of **state** as *data*.
Think of **lifting state up** as *moving the data to a parent so two children can share it*.

---

# 🔥 **REAL LIFE EXAMPLE**

You and your brother share a water bottle.

Instead of:

* Both of you carrying your own bottle,
* Your **father** (parent) carries one bottle and gives it to both of you when needed.

That’s **lifting state up** → move shared data to the parent.

---

# 📌 **React Example Without Lifting State**

Two components each have their own state:

```
App
 ├── BoxA (has its own color)
 └── BoxB (has its own color)
```

```jsx
function BoxA() {
  const [color, setColor] = useState("red");
}
function BoxB() {
  const [color, setColor] = useState("red");
}
```

❌ Problem:
A and B do **not** share the same color—they are independent.
If you want both boxes to change color together, this fails.

---

# 📌 **React Example WITH Lifting State Up (Correct)**

State is moved (lifted) to the common parent:

```
App (holds color)
 ├── BoxA (gets color from App)
 └── BoxB (gets color from App)
```

```jsx
function App() {
  const [color, setColor] = useState("red");

  return (
    <>
      <BoxA color={color} setColor={setColor} />
      <BoxB color={color} />
    </>
  );
}
```

Now:

* If BoxA changes color → the parent changes state → BoxB instantly gets the new color too
* They share one source of truth
* No duplication
* Easy to sync

---

# 🎉 **Ultimate One-Line Definition**

### **Lifting state up = Moving a piece of state from a child into its nearest parent so multiple children can share and update it.**

---

# 🧠 WHY THE WORD “LIFTING”?

Because the direction is always:

**child → parent (upwards)**
but the data flows down again as **props**.

---

# 🧩 VISUAL DIAGRAM

**Before lifting:**

```
Parent
 ├── ChildA   (has state)
 └── ChildB   (has state)
```

**After lifting:**

```
Parent (has state)
 ├── ChildA   (reads/updates parent's state)
 └── ChildB   (reads parent's state)
```

---

If you want, I can also show you a **real working code example** where you will see:

* without lifting → components behave differently
* with lifting → components behave in sync

Just tell me:
👉 *“Show me example without & with lifting state”*
