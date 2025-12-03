# ✅ **1. How Environment Variables Work in React (Vite)**

Since you're using **React + Vite**, your environment variables must follow **one strict rule**:

## **Every variable MUST start with `VITE_`**

Example:

```
VITE_API_URL=http://localhost:3000/api/v1
VITE_MODE=development
```

---

# ✅ **2. Where to Put Them**

You can create **any** of these files in your `project-root/`:

### **.env** → loaded in all environments

### **.env.development** → loaded during `npm run dev`

### **.env.production** → loaded when building `npm run build`

Example:

```
.env
.env.development
.env.production
```

But most people just use:

```
.env.local   (ignored by Git — best for secrets)
```

---

# 📌 **Example: Create `.env`**

Create file:

```
your-react-project/.env
```

Add:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_APP_NAME=SecondBrain
```

---

# ✅ **3. How to Use Env Variables in React**

Wherever you want to use them:

```ts
const backendUrl = import.meta.env.VITE_BACKEND_URL;

console.log(backendUrl);
```

---

# 🤝 **4. Using Environment Variables Inside Fetch**

Example login request:

```ts
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleLogin = async (username: string, pass: string) => {
    try {
        const res = await fetch(`${backendUrl}/api/v1/signin`, {
            method: "POST",
            credentials: "include",   // if using cookies
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password: pass })
        });

        const data = await res.json();
        console.log(data);

    } catch (err) {
        console.error("Error:", err);
    }
};
```

---

# 📌 **5. How to Access All Env Variables at Once**

```ts
console.log(import.meta.env);
```

Useful for debugging.

---

# ⚠️ Important Notes

### ❌ Never put secrets in frontend env

Anyone can see them in browser DevTools.

### ✔️ Only put server URLs / public keys

These are safe.

---

# 🔥 Summary

| Task                    | How                                     |
| ----------------------- | --------------------------------------- |
| **Create env variable** | Add to `.env`: `VITE_BACKEND_URL=...`   |
| **Access inside React** | `import.meta.env.VITE_BACKEND_URL`      |
| **Use inside fetch**    | ``fetch(`${backendUrl}/api/v1/login`)`` |
| **Secret values?**      | ❌ Never store in frontend env           |



---
---
---



# ✅ **1. What Are Environment Variables?**

Environment variables are values you store **outside your code** so that:

✔ you can switch backend URLs easily
✔ you don’t hard-code URLs
✔ you can have different configs for **dev** and **production**
✔ they remain hidden from Git if needed

These are stored inside `.env` files.

---

# ✅ **2. Types of ENV Files in Vite**

Vite loads environment variables based on the filename:

---

## **(1) `.env`**

Loaded **always**
Used for values common in all environments.

Example:

```
VITE_APP_NAME=SecondBrain
```

---

## **(2) `.env.development`**

Loaded when you run:

```
npm run dev
```

Example:

```
VITE_BACKEND_URL=http://localhost:3000
```

---

## **(3) `.env.production`**

Loaded when you run:

```
npm run build
npm run preview
```

Example:

```
VITE_BACKEND_URL=https://your-production-server.com
```

---

## **(4) `.env.local`**

Loaded **but not committed to Git** (ignored by default).
This is where you put:

✔ secrets
✔ local URLs
✔ things you don’t want on GitHub

Example:

```
VITE_API_KEY=abc123xyz
```

---

# ⚠️ The Most Important Rule in Vite

### **Every environment variable must start with `VITE_`**

Otherwise React/Vite will NOT expose it to your frontend.

Example:

```
VITE_BACKEND_URL=http://localhost:3000
```

You access it like:

```ts
import.meta.env.VITE_BACKEND_URL;
```

---

# ⭐ Summary

| Feature                   | Meaning                                   |
| ------------------------- | ----------------------------------------- |
| `.env`                    | Used everywhere (dev & prod)              |
| `.env.development`        | Used only in dev (`npm run dev`)          |
| `.env.production`         | Used only in prod (`npm run build`)       |
| `.env.local`              | Hidden from Git, private values           |
| Must start with `VITE_`   | Otherwise not available in frontend       |


---
---
---

# ✅ Which ENV Files Should Be Pushed to GitHub?

### **✔️ Allowed to push (safe):**

* `.env.development`
* `.env.production`

These usually contain **non-secret** values like:

```
VITE_BACKEND_URL=http://localhost:3000
VITE_BACKEND_URL=https://api.myapp.com
```

These files are meant to describe **environment-specific configs**, not secrets.

---

# ❌ Should NOT be pushed (never push secrets):

* `.env`
* `.env.local`

Reason:

### **These files may contain secrets:**

* API keys
* Database URLs
* Private tokens
* Sensitive configuration

So they should be listed in **`.gitignore`**.

GitHub creates a huge security risk if these get pushed.

---

# 📌 Why `.env.development` and `.env.production` are okay?

Because:

✔ They are environment-specific
✔ They usually contain **public URLs** or **non-sensitive settings**
✔ They help other developers understand your environment structure
✔ You can overwrite them on your cloud environment anyway

Example:

```
VITE_API_BASE_URL=https://staging.yourapp.com
```

No problem pushing this.

---

# 📌 Why `.env` and `.env.local` should not be pushed?

Because these files contain **machine-specific** and **secret** values.

Example:

```
VITE_API_KEY=super-secret-key
VITE_PRIVATE_TOKEN=34asd987f
```

These must stay local.

---

# 🔥 Final Rule (Easy to remember)

| File               | Push to Git? | Contains               |
| ------------------ | ------------ | ---------------------- |
| `.env`             | ❌ No         | Global secrets         |
| `.env.local`       | ❌ No         | Local machine secrets  |
| `.env.development` | ✔️ Yes       | Dev URLs and configs   |
| `.env.production`  | ✔️ Yes       | Prod URLs (non-secret) |

---
---
---


# 🚨 **Anything you put in frontend `.env` (Vite, React, Next.js) IS PUBLIC.**

Even if:

✔ you build the app
✔ you deploy it
✔ you hide `.env.production`
✔ you never push to GitHub

The values still become **visible in browser DevTools** because they are bundled inside your JS files.

---

# ❗ So the Real World Rule:

## **🔥 Never put secrets in frontend environment variables.**

**Not API keys
Not DB URLs
Not JWT secrets
Not private tokens.**

Frontend = public
Backend = secret

---

# 💡 Why Frontend ENV Variables Are Public?

Because during build, Vite replaces:

```js
import.meta.env.VITE_BACKEND_URL
```

with the actual string:

```js
"https://api.myapp.com"
```

This lives inside your final JS bundle.
Anyone can open DevTools → Sources and read it.

---

# 🛡️ What is safe to put in frontend ENV?

Only **public configuration**, for example:

✔ API base URL
✔ App name
✔ Feature flags
✔ Build mode
✔ Analytics *public* keys (not secret keys)

Example (safe):

```
VITE_BACKEND_URL=https://api.secondbrain.com
VITE_ENVIRONMENT=production
```

---

# 🚫 What should NEVER go in frontend env?

❌ Database passwords
❌ JWT secret
❌ Stripe secret key
❌ OAuth client secret
❌ Admin tokens
❌ Private API keys
❌ Anything that can be abused

---

# 🏆 Correct real-world architecture:

### **Frontend**

* Only public ENV values
* Calls backend using URL
* No secrets stored anywhere

### **Backend**

* Stores all secrets
* Connects DB
* Calls third-party APIs
* Verifies tokens
* Protects private keys

---

# ⚠️ Should frontend env variables be committed to GitHub?

### **Yes, if they are NOT secrets**

(because they are public anyway)

### **No, if they contain secrets**

(but they shouldn't contain secrets in the first place)

---

# 🧠 Summary

| Where?           | Secrets Allowed? | Visible to public? |
| ---------------- | ---------------- | ------------------ |
| **Frontend ENV** | ❌ Never          | ✔ Yes              |
| **Backend ENV**  | ✔ Yes            | ❌ No               |
