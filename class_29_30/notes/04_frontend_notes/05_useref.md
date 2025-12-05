You're **very close**, but there's one **serious issue**:

### ❌ You're sending the **entire HTMLInputElement** to your API

This becomes:

```json
{
  "username": { ... html element ... },
  "password": { ... html element ... }
}
```

Your backend expects **strings**, not DOM elements.

---

# ✅ FIX: Always send `.value` to the API

---

# 🔥 Correct handleLogin (with HTMLInputElement refs)

```ts
const handleLogin = async (
    username: HTMLInputElement,
    pass: HTMLInputElement,
    navigate: NavigateFunction
) => {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username.value,   // ✔ send the value
                password: pass.value        // ✔ send the value
            }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        if (!data) throw new Error("Invalid username or password");

        localStorage.setItem("token", data.token);

        navigate("/");
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
```

---

# And Call It Like This:

```tsx
<Button 
  className="w-full" 
  onClick={() => handleLogin(usernameRef.current!, passRef.current!, navigate)}
>
  Login
</Button>
```

---

# 🎯 Summary

### BEFORE (wrong)

You passed the full DOM element → backend gets garbage.

### AFTER (correct)

Use `username.value` and `pass.value`

✔ No re-renders
✔ No useState
✔ Recoil optimized
✔ Backend receives correct payload

---

# Want me to also convert your Signup, ForgotPass, ResetPass to the same optimized pattern?
