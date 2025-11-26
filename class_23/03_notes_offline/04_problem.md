# 🟥 **THE PROBLEM YOU FACED**

You wanted to add a **setter (set:)** inside a Recoil selector so that clicking a button triggers some logic.

You wrote something like:

```js
export const totalNotificationSelector = selector({
    get: ({ get }) => { ... },
    set: ({ set, get }) => {
        set(notifications, { ... })   // reset or logic
    }
});
```

And used it like this:

```js
const resetAll = useSetRecoilState(totalNotificationSelector);
<button onClick={resetAll}>Me</button>
```

### ❌ Result:

You got this error:

```
Warning: Maximum update depth exceeded
```

This means **infinite re-render loop**.

---

# 🟧 **WHY THE PROBLEM HAPPENED**

There were **3 reasons**:

---

## 1️⃣ **You used useSetRecoilState(selector) on a selector that is also used inside your component.**

In your app:

```js
const totalNotificationCount = useRecoilValue(totalNotificationSelector);
const resetAll = useSetRecoilState(totalNotificationSelector);
```

This means:

* Your component **reads** the selector
* Your component **writes** to the same selector

This sets up a cycle:

```
selector.set → updates atom → selector.get runs → component re-renders → selector.set again → …
```

This is how you hit **maximum update depth exceeded**.

---

## 2️⃣ **Inside your `set` you used atom updates that forced the selector to recompute**

Selector setter:

```js
set(notifications, ...)
```

But the selector `get` uses the same atom:

```js
get(notifications)
```

So the selector depended on the same atom it wrote to.

This forms a loop:

```
set() → atom changes → selector.get() re-runs → component re-renders → selector.set() triggers again → infinite loop
```

---

## 3️⃣ **You forgot to pass `get` to selector `set`**

You wrote:

```js
set: ({ set }) => {
    const all = get(notifications); // ❌ get is not defined
}
```

Even if fixed, the logic structure still caused a loop.

---

# 🟩 **THE RIGHT WAY TO USE SELECTORS WITH SETTERS**

Selectors with setters must be used like this:

### ✔ Use selector.get ONLY for reading

### ✔ Use selector.set ONLY when triggered

### ✔ NEVER use `useRecoilState(selector)` on them

### ✔ NEVER subscribe to the selector that contains setter

(e.g., via useRecoilValue + useSetRecoilState on same selector)

### ✔ Use the selector ONLY as a **write selector**

Meaning: you call its setter to do custom logic,
but you do NOT treat it like a value selector.

---

# 🟦 **THE CLEAN SOLUTION**

Here is the correct version of what you wanted:

---

# ✅ store/atom.js — Write-selector with logic

```js
export const notifications = atom({
  key: "notifications",
  default: {
    network: 1,
    jobs: 6,
    messaging: 3,
    notifications: 5
  }
});

export const modifyNotificationsSelector = selector({
  key: "modifyNotificationsSelector",
  get: ({ get }) => {
    // optional: return something if needed
    return get(notifications);
  },

  set: ({ set, get }, newValue) => {
    const current = get(notifications);

    // example: custom update logic
    set(notifications, {
      network: current.network + 1,
      jobs: current.jobs,
      messaging: current.messaging,
      notifications: current.notifications
    });
  }
});
```

---

# ✅ App.jsx — Correct usage

```jsx
function MainApp() {
  const notificationsValue = useRecoilValue(notifications); 
  const modifyNotifications = useSetRecoilState(modifyNotificationsSelector);

  return (
    <>
      <button onClick={() => modifyNotifications()}>
        Modify using Selector
      </button>

      <div>
        Total Notifications: {
          notificationsValue.network +
          notificationsValue.jobs +
          notificationsValue.messaging +
          notificationsValue.notifications
        }
      </div>
    </>
  );
}
```

---

# 🟩 **WHY THIS FIX WORKS**

### ✔ The component is **not subscribing** to the write-selector

You only use `useSetRecoilState()` on it.

### ✔ The selector’s `set` updates the atom

→ Component re-renders only because atom changed
→ NOT because selector re-triggered

### ✔ No infinite loop

Because selector.set is triggered only by **button click**, never by re-render.

### ✔ Selector.get() is harmless

Because it does not write anything.

---

# 🍀 **IN ONE LINE:**

**Selector with `set:` must be treated as a write-only action, not as state.
Read from the atom, trigger write via the selector.**
