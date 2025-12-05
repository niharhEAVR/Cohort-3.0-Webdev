# ✅ **What Are Side Effects? (Simple Explanation)**

A **side effect** is *any action a function performs that affects something outside the function itself*.

A function that **returns a value without affecting the outside world** is *NOT* a side effect.

A function that **changes something outside itself** *IS* a side effect,
for example:

* updating UI state
* making API requests
* writing to localStorage
* redirecting / navigating
* modifying a database
* setting timers (setTimeout, setInterval)
* console.log

All these **affect the outside world** — so they are *side effects*.

---

# ✅ **Normal Function (NO Side Effects)**

```ts
function add(a: number, b: number) {
  return a + b; // only returns something
}

const result = add(2, 3);
console.log(result); 
```

✔ Pure
✔ Predictable
✔ No external changes
✔ Same input → same output

---

# ❌ **Function WITH Side Effects**

```ts
function login(username, password) {
  console.log("Calling API..."); // side effect
  localStorage.setItem("user", username); // side effect
  alert("Logged in"); // side effect
}
```

These actions **modify the world outside the function**, so they are side effects.

---

# ✅ **Side Effects in React**

React is based on the idea:

👉 **Render should be pure.
👉 Side effects should be separated.**

A *pure* render means:

* no API calls
* no localStorage
* no database writing
* no DOM manipulation

That’s why React has:

### **useEffect()** — a hook designed specifically for side effects

Example:

```ts
useEffect(() => {
  fetchUsers();    // side effect
  console.log("Mounted"); // side effect
}, []);
```

---

# 🟦 Why your `handleLogin()` is a SIDE EFFECT function

Your function:

```ts
const handleLogin = async (...) => {
   const res = await fetch(...);  // API call = SIDE EFFECT
   localStorage.setItem("token", data.token); // SIDE EFFECT
   alert("done"); // SIDE EFFECT
};
```

✔ Makes API request
✔ Updates browser storage
✔ Shows an alert

So it is **not** a pure function.
It **does things** instead of **returning data only**.

---

# 🟩 Why It Works Without `return`

Your button:

```ts
<Button onClick={() => handleLogin(...)}>
```

Why does it work?

📌 Because `onClick` only needs a **function to run**, not a return value.

You are not *using* the return of handleLogin.
You just want the function to execute the side effects.

This works fine:

```ts
function doSomething() {
  console.log("Something happened");
}

<button onClick={doSomething}>Click</button>
```

React does **not** care what the function returns.

You only need return **if you want to USE the result**.

---

# 🟥 What happens if you ADD return?

Example:

```ts
return data;
```

Then you can do:

```ts
const login = await handleLogin(...);
if(login) navigate("/dashboard");
```

Now your function is:

✔ performing side effects
✔ AND returning a value
✔ And your component can use that returned value

---

# 🟩 Summary Table

| Feature                  | Pure Function | Side Effect Function |
| ------------------------ | ------------- | -------------------- |
| Returns something only   | ✅             | ❌                    |
| API calls                | ❌             | ✅                    |
| localStorage             | ❌             | ✅                    |
| navigation               | ❌             | ✅                    |
| alerts/console.log       | ❌             | ✅                    |
| same input → same output | ✅             | ❌                    |
| allowed in render        | ✔             | ❌ use useEffect      |

---

# 🟦 Final Summary

### ✔ Side effects = anything that changes the outside world

### ✔ In React, API calls and localStorage are **side effects**

### ✔ Your `handleLogin()` works without return because you don’t use its output

---
---
---




# **How async functions + fetch + promises work**.



# ⭐ **1. Your function works even without `return` — Why?**

Your function:

```ts
const handleLogin = async (username, pass, url, ves) => {
    try {
        const res = await fetch(...)

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        localStorage.setItem("token", data.token);
        alert(data.token);

    } catch (error) {
        console.error("Error logging in:", error);
    }
};
```

### This function still works because:

✔ It **executes side effects** (things that don’t need return values):

* `fetch()` API call
* save to localStorage
* show alert
* console.log
* error handling
* send request to backend

These tasks **do not require you to return anything**.

You call:

```ts
onClick={() => handleLogin(...)}
```

and `handleLogin()` runs → side effects happen → everything works.

---

# ⭐ **2. What happens if you add `return`?**

### Case A — `return data`

```ts
return data;
```

Then:

* `handleLogin()` will return the **token data**
* You can capture it:

```ts
const result = await handleLogin(...);
console.log(result.token);
```

Useful if you want parent component to use the result.

---

### Case B — `return fetch(...)` (return the promise)

```ts
return fetch(...);
```

Then `handleLogin` returns a **promise of Response**.

Not useful unless you want callers to handle the response manually.

---

# ⭐ **3. What if you don’t return anything?**

If you don't write return, this happens automatically:

```ts
return undefined;
```

But the function still works because:

🎯 **You are not expecting any return value.**
🎯 **The goal of the function is to perform actions**, not give back a value.

---

# ⭐ **4. Should you return something? (Best Practices)**

### When you SHOULD return 👇

If the caller needs the result.

Example:

```ts
const data = await handleLogin(...);
if (data) navigate("/dashboard");
```

So you write:

```ts
return data;
```

---

### When you DO NOT need return 👇

If all work happens inside the function (like yours):

✔ API call
✔ store token
✔ redirect
✔ show alert

Then return is not needed.

---

# ⭐ **5. What your function currently returns**

Since you didn’t write return:

Your function implicitly returns:

```
Promise<void>
```

Meaning:

* It is an async function
* It returns a promise
* The promise resolves to **nothing**

But side effects still run normally.

---

# 🧠 Summary

| Do you need return?     | Yes / No               | Why                  |
| ----------------------- | ---------------------- | -------------------- |
| Want result in parent   | ✔ Yes                  | Parent needs data    |
| Only performing actions | ❌ No                   | Side effects only    |
| Function is async       | default: Promise<void> | Works without return |

---

# 🚀 Your function is valid

Your function is fine because its job is to:

* call the API
* save token
* alert
* catch errors

It does NOT need to return anything.

---
---
---


---

# ❌ **Why your code is wrong**

You wrote:

```ts
const login = await handleLogin(username,pass,props.url, props.ves);

if(login) navigate("signup");
```

But your function:

```ts
const handleLogin = async (...) => {
   ...
   // NO return statement
}
```

➡️ Means it returns **undefined**, always.

So:

```ts
const login = await handleLogin(...);   // login === undefined
if(login) navigate("signup");           // condition is ALWAYS false
```

So navigation will **never happen**.

---

# ❌ Your Button Code Is Also Wrong

```tsx
<Button onClick={login}>
```

You are passing a **value** (`login`) instead of a **function**.

React expects:

```tsx
onClick={() => something()}
```

Not:

```tsx
onClick={something()}
```

(or in your case `onClick={login}` which is not a function).

---

# ✅ FIX #1 — If you want `handleLogin` to return data

### Modify your function:

```ts
const handleLogin = async (username:string, pass:string, url:string, ves:string) => {
    try {
        const res = await fetch(`${url}/${ves}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password: pass }),
        });

        if (!res.ok) return null;

        const data = await res.json();
        localStorage.setItem("token", data.token);

        return data;  // 🔥 returning something!
    } catch (error) {
        return null;
    }
};
```

### And the button click:

```tsx
const onLogin = async () => {
    const login = await handleLogin(username, pass, props.url, props.ves);

    if (login) navigate("signup");
};

<Button type="submit" onClick={onLogin}>Login</Button>
```

✔ Correct
✔ Clean
✔ `navigate()` works
✔ `handleLogin()` return value used properly

---

# ✅ FIX #2 — If you want handleLogin itself to navigate

You can move navigation *inside* the login function.

```ts
const handleLogin = async (...) => {
    try {
        const res = await fetch(...);
        const data = await res.json();

        localStorage.setItem("token", data.token);

        navigate("signup");  // 🔥 navigation done from inside
    } catch (error) {
        console.error(error);
    }
};
```

Then button becomes:

```tsx
<Button onClick={() => handleLogin(username, pass, props.url, props.ves)}>
  Login
</Button>
```

No need to return anything.

---

# ⭐ Which option should you use?

If logic belongs **in the UI** → use Fix #1.
If logic belongs **in the login handler** (common for auth) → use Fix #2.

---

# 🧠 Final Key Rules

### ✔ async function with no return → always returns `undefined`

### ✔ onClick expects a FUNCTION, not a VALUE

### ✔ If you want to use return value, you must explicitly `return data`

### ✔ If you want navigation inside login, do it inside the function