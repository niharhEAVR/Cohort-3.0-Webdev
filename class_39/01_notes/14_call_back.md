## 1️⃣ Where do I put the `redirect` callback?

You put it **inside your NextAuth config**, where you define providers.

### 📁 App Router (Next.js 13+)

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        return { id: "1", name: credentials?.username };
      }
    })
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + "/dashboard";
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

👉 **This callback is global**
👉 Runs for **every redirect NextAuth wants to do**

---

## 2️⃣ WHEN is this callback executed?

This is the key part.

The `redirect` callback is executed **ONLY when NextAuth is about to redirect the browser**.

### Common situations:

* After `signIn()`
* After OAuth login (Google, GitHub, etc.)
* After `signOut()`
* After `useSession({ required: true })` fails
* After visiting `/api/auth/signin`

---

## 3️⃣ WHO calls this callback?

👉 **You never call it**

NextAuth internally does something like:

```ts
const finalRedirectUrl = await callbacks.redirect({
  url: someUrl,
  baseUrl: siteUrl
});
```

Then:

```
res.redirect(finalRedirectUrl)
```

---

## 4️⃣ What exactly is `url` and `baseUrl`?

### `baseUrl`

```
https://yourdomain.com
```

This comes from:

* `NEXTAUTH_URL`
* OR auto-detected by NextAuth

---

### `url` (MOST IMPORTANT)

This is **where NextAuth intends to redirect** BEFORE your callback runs.

Examples:

#### Case 1: You used `callbackUrl`

```ts
signIn("credentials", {
  callbackUrl: "/profile"
});
```

```
url = "https://yourdomain.com/profile"
```

---

#### Case 2: User was blocked by auth

User tried:

```
/dashboard
```

But not logged in → redirected to login → after login:

```
url = "https://yourdomain.com/dashboard"
```

---

#### Case 3: OAuth provider redirect

```
url = "https://yourdomain.com/api/auth/callback/google"
```

---

## 5️⃣ What YOUR callback is doing (line by line)

```ts
async redirect({ url, baseUrl }) {
```

You receive:

* `url` → where NextAuth *wants* to go
* `baseUrl` → your site root

---

```ts
if (url.startsWith(baseUrl)) return url;
```

✔ Allow internal redirects
✔ Prevent malicious redirects like:

```
https://evil.com/phishing
```

---

```ts
return baseUrl + "/dashboard";
```

❌ If redirect target is external → force safe page

---

## 6️⃣ Visual Timeline (THIS IS IMPORTANT)

### Example: Credentials Login

```
User clicks Login
   |
   | signIn("credentials", callbackUrl="/profile")
   v
NextAuth validates credentials
   |
   | Authentication SUCCESS
   v
NextAuth decides redirect URL = /profile
   |
   | 🔥 Calls redirect callback
   v
redirect({ url, baseUrl })
   |
   | Your logic runs
   v
Final redirect URL returned
   |
   | Browser redirected
```

---

## 7️⃣ How does this connect to `signIn()`?

### Client

```ts
signIn("credentials", {
  callbackUrl: "/profile"
});
```

### Backend (NextAuth internal)

```ts
url = baseUrl + "/profile";
```

### Callback

```ts
redirect({ url, baseUrl });
```

✔ You approve or override

---

## 8️⃣ IMPORTANT: redirect callback ≠ routing logic

This callback:

* ❌ Does NOT run on every page change
* ❌ Does NOT protect routes
* ✅ ONLY controls NextAuth-driven redirects

For route protection → use:

* `middleware.ts`
* `getServerSession()`

---

## 9️⃣ Mental Model (Remember This)

```
signIn() → NextAuth → redirect callback → browser redirect
```

You are **intercepting** the redirect decision.

---

## 🔟 One-liner Summary

> The `redirect` callback is a **gatekeeper** that NextAuth calls **right before redirecting the browser**, giving you the final say on **where the user is allowed to go**.