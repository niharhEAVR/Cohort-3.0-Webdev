```ts
providers: [
        CredentialsProvider({
            id:"1",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", style: "background-color:#FFF; color: #000;", placeholder: "password" }
            },
            async authorize(credentials, req) {

                const { username, password } = credentials!;

                const user = { id: "1", username: username }

                console.log(user);


                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ]
```
>in this provider code when the user succesfully put his credentials and logins then the auth automatically redirect me to a random page, and i dont know how
>how can i controll the redirecter 
>And once i auth success
>then what happens
>like in react when the auth succedded the backend sends a jwt token and we store it either cookies or for developing usecases we stored that in the locastorage, now as we cant do that in next
>then how the token stored or what happend in behind

>i want a visualize undestandding

---
---
---

Great question — this confusion is **very common** when coming from a classic React + backend + JWT mental model 👍
Let’s build a **clear mental picture** of what **NextAuth** is doing and **why you see “random redirects”**.

I’ll break this into **4 clear layers**, then give you a **visual flow**.

---

## 1️⃣ Why am I redirected to a “random” page?

It’s **not random** — NextAuth has **default redirect rules**.

### Default behavior

When authentication **succeeds**, NextAuth redirects to:

```
1. callbackUrl (if provided)
2. OR the page user originally tried to visit
3. OR "/" (home page)
```

If you didn’t explicitly set a redirect, **NextAuth decides for you**.

---

## 2️⃣ How to control redirect explicitly (MOST IMPORTANT)

### ✅ Control redirect from `signIn()` (client side)

```ts
import { signIn } from "next-auth/react";

await signIn("credentials", {
  username,
  password,
  redirect: true,           // default true
  callbackUrl: "/dashboard" // 👈 YOU control this
});
```

👉 Now after login → `/dashboard`

---

### ❌ If you don’t want auto redirect

```ts
await signIn("credentials", {
  username,
  password,
  redirect: false
});
```

Then manually route:

```ts
if (res?.ok) {
  router.push("/dashboard");
}
```

---

### ✅ Global redirect control (NextAuth config)

```ts
callbacks: {
  async redirect({ url, baseUrl }) {
    // allow only internal redirects
    if (url.startsWith(baseUrl)) return url;
    return baseUrl + "/dashboard";
  }
}
```

---

## 3️⃣ What ACTUALLY happens after successful login?

Now let’s kill the **“where is my JWT??”** confusion.

### ❌ Old React Mental Model

```
Backend → sends JWT
Frontend → stores JWT in localStorage
Frontend → sends JWT in Authorization header
```

### ✅ NextAuth Mental Model (VERY DIFFERENT)

👉 **You NEVER manually store tokens**

NextAuth does this:

---

## 4️⃣ Visual Flow (THIS IS THE KEY PART)

### Step-by-step visualization

```
[ Login Form ]
     |
     | signIn("credentials")
     v
[ NextAuth API Route ]
     |
     | authorize(credentials)
     | ✔ validate user
     v
[ NextAuth creates SESSION ]
     |
     | Encrypts session data
     v
[ HTTP-ONLY COOKIE ]
     |
     | Stored in browser (not JS-accessible)
     v
[ Client + Server can now read session ]
```

---

## 5️⃣ Where is the token stored?

### By default (VERY IMPORTANT)

NextAuth stores session in:

```
🔐 Encrypted HTTP-only cookie
```

You **CANNOT see it** in:

* `localStorage` ❌
* `sessionStorage` ❌
* `document.cookie` ❌

This is **intentional** (security).

---

## 6️⃣ Is there a JWT internally?

Yes — but **you don’t manage it**.

### Default session strategy:

```ts
session: {
  strategy: "jwt"
}
```

### Internally:

```
User → JWT → Encrypted → Cookie
```

You never touch it.

---

## 7️⃣ How do I ACCESS authenticated user then?

### Client Side (React)

```ts
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();

console.log(session);
```

Output:

```ts
{
  user: {
    name: "jsmith",
    id: "1"
  },
  expires: "2025-12-31"
}
```

---

### Server Side (Next.js App Router)

```ts
import { getServerSession } from "next-auth";

const session = await getServerSession(authOptions);

if (!session) redirect("/login");
```

---

## 8️⃣ How to control WHAT goes into the session?

### `jwt` callback

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }
    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    return session;
  }
}
```

Now `session.user.id` is available everywhere.

---

## 9️⃣ Why NextAuth DOES NOT use localStorage?

Because:

❌ XSS can steal tokens
❌ Manual token refresh complexity
❌ Security bugs

Instead:

✅ HTTP-only cookies
✅ Automatic refresh
✅ Server-first auth (perfect for Next.js)

---

## 🔟 Final Mental Model (REMEMBER THIS)

```
NextAuth ≠ React JWT Auth
```

### Think like this:

* ❌ “Where is my JWT?”
* ✅ “Session lives in secure cookies”
* ❌ “Frontend manages auth”
* ✅ “NextAuth manages auth”
* ❌ “I redirect manually”
* ✅ “Redirect controlled via signIn or callbacks”