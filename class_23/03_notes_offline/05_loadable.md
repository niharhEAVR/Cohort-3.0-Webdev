# 🚀 Why do we need Loadables?

Normally you use:

```js
const value = useRecoilValue(mySelector)
```

But if the selector is **async**, then Recoil automatically suspends the component while it waits.

This means:

* Your component **cannot** manually handle loading/error
* React Suspense boundary must catch it

If you want:

* manual loading screen
* manual error handling
* avoid React Suspense
* more control over async states

→ You use **Loadables**.

Loadables give you:

```js
loadable.state  // "loading", "hasValue", "hasError"
loadable.contents  // the actual value OR error OR promise
```

---

# 🟦 1. useRecoilValueLoadable

### ✔ PURPOSE

Gets the value of an atom/selector but wrapped in a **Loadable** object so you can detect:

* `"loading"`
* `"hasValue"`
* `"hasError"`

### ❗ Use this when you want **read-only access** to async state.

---

# 💡 Example: Async selector that fetches notifications

### store.js

```js
export const notificationsAsync = selector({
  key: "notificationsAsync",
  get: async () => {
    const res = await fetch("https://sum-server.100xdevs.com/notifications");
    return res.json();
  },
});
```

---

# Component using **useRecoilValueLoadable**

```jsx
import { useRecoilValueLoadable } from "recoil";
import { notificationsAsync } from "./store";

function Notifications() {
  const loadable = useRecoilValueLoadable(notificationsAsync);

  if (loadable.state === "loading") {
    return <div>Loading notifications...</div>;
  }

  if (loadable.state === "hasError") {
    return <div>Error loading notifications!</div>;
  }

  if (loadable.state === "hasValue") {
    return (
      <div>
        Notifications: {JSON.stringify(loadable.contents)}
      </div>
    );
  }
}
```

---

# 🔍 Loadable object explained

```js
{
  state: "loading" | "hasValue" | "hasError",
  contents: Promise | Value | Error
}
```

### When state is:

| state        | contents                  |
| ------------ | ------------------------- |
| `"loading"`  | a Promise                 |
| `"hasValue"` | actual output of selector |
| `"hasError"` | the caught error          |

---

# 🟩 2. useRecoilStateLoadable

### ✔ PURPOSE

This is like a combination of:

```
useRecoilValueLoadable + useSetRecoilState
```

You get a **Loadable (for reading)** and a **setter (for updating)**.

Useful when:

* You want to **read async state**
* AND **update atom/selector** from the component

---

# ✨ Example: User Profile (async fetch + editable)

### store.js

```js
export const userProfile = atom({
  key: "userProfile",
  default: selector({
    key: "userProfile/default",
    get: async () => {
      const res = await fetch("https://myapi.com/user");
      return res.json();
    },
  }),
});
```

### Component using useRecoilStateLoadable:

```jsx
import { useRecoilStateLoadable } from "recoil";
import { userProfile } from "./store";

function Profile() {
  const [loadable, setProfile] = useRecoilStateLoadable(userProfile);

  if (loadable.state === "loading") return <p>Loading profile...</p>;
  if (loadable.state === "hasError") return <p>Error loading profile</p>;

  const user = loadable.contents;

  return (
    <div>
      <h1>{user.name}</h1>

      <button onClick={() => setProfile({ ...user, name: "New Name" })}>
        Change Name
      </button>
    </div>
  );
}
```

---

# 📘 When to use which?

| Hook                       | Reads sync/async? | Sets value? | When to use                            |
| -------------------------- | ----------------- | ----------- | -------------------------------------- |
| **useRecoilValueLoadable** | YES               | NO          | You want manual loading/error handling |
| **useRecoilStateLoadable** | YES               | YES         | You want async read + write support    |
| **useRecoilValue**         | YES               | NO          | Using Suspense or synchronous data     |
| **useRecoilState**         | YES               | YES         | For synchronous atoms/selectors        |

---

# 🧠 Internal Behavior Summary

### 🔸 `useRecoilValue`

Suspends component if async.

### 🔸 `useRecoilValueLoadable`

NEVER suspends; gives you status manually.

### 🔸 `useRecoilStateLoadable`

Same as above + setter for the atom.

---

# 🌍 REAL-WORLD USE CASES

| Scenario                           | Best Hook                |
| ---------------------------------- | ------------------------ |
| Fetching notifications with loader | `useRecoilValueLoadable` |
| Fetching + Editing user profile    | `useRecoilStateLoadable` |
| Load theme instantly (sync)        | `useRecoilState`         |
| Show skeleton loader (manual)      | `useRecoilValueLoadable` |
| Avoiding React Suspense boundaries | Loadable hooks           |

---

# 🏁 Final Example (super simple)

```jsx
function Example() {
  const loadable = useRecoilValueLoadable(myAsyncSelector);

  switch (loadable.state) {
    case "loading": return <p>⏳ Loading...</p>;
    case "hasError": return <p>❌ Error!</p>;
    case "hasValue": return <p>✨ {loadable.contents}</p>;
  }
}
```
