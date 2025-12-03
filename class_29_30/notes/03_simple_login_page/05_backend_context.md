# ✅ **What This Context Does**

Your context shares two values:

* `url` → backend URL
* `ves` → backend version URL

Instead of **prop drilling**, any component in your app can call `useBackend()` and instantly get `{ url, ves }`.

---

# 📘 **1. Create a Type for the Context**

```ts
interface BackendContextType {
  url: string;
  ves: string;
}
```

This simply describes **what data** the context will store.

Here:
✔️ `url` → string
✔️ `ves` → string

---

# 📘 **2. Create the Context Object**

```ts
const BackendContext = createContext<BackendContextType | undefined>(undefined);
```

### Why `undefined` initially?

Because when the app loads, **nothing has provided the context yet**.
So React Router isn't wrapped by the provider at first.

So if someone tries to read the context **outside the provider**, it will be `undefined`.

---

# 📘 **3. Create the Provider Component**

```tsx
export const BackendProvider = ({ children, url, ves }: { children: ReactNode; url: string; ves: string }) => {
  return (
    <BackendContext.Provider value={{ url, ves }}>
      {children}
    </BackendContext.Provider>
  );
};
```

Let’s break this down:

### ✔️ The provider receives:

* `children` → all nested components inside this provider
* `url` → backend URL
* `ves` → backend version URL

### ✔️ It then wraps the children like this:

```
<BackendContext.Provider value={{ url, ves }}>
      {children}
</BackendContext.Provider>
```

So **every child inside this provider** can now access `{ url, ves }`.

---

# 📘 **4. Custom Hook: `useBackend()`**

```ts
export const useBackend = () => {
  const context = useContext(BackendContext);
  if (!context) throw new Error("useBackend must be used within BackendProvider");
  return context;
};
```

### 🔍 What this hook does:

1. Calls `useContext(BackendContext)`
   → returns `{ url, ves }` **if inside the provider**
   → returns `undefined` **if used outside**

2. If context is `undefined`:

```ts
throw new Error("useBackend must be used within BackendProvider");
```

This is helpful because it prevents bugs.

3. Otherwise:

```ts
return context;
```

---

# 📌 **Example: How You Use This Context**

## Wrap Your App:

```tsx
<BackendProvider url={backendUrl} ves={backendUrlVersions}>
   <App />
</BackendProvider>
```

## Use it anywhere:

```ts
import { useBackend } from "../contexts/BackendContext";

export default function LoginPage() {
  const { url, ves } = useBackend();

  console.log(url, ves);

  return <div>Login</div>;
}
```

No more prop drilling! 🎉

---

# 🧠 Summary (In One Sentence)

Your context creates a **global storage** for `{ url, ves }`, the provider **injects** these values into the React tree, and the custom hook `useBackend()` allows any child component to **instantly access** them safely.