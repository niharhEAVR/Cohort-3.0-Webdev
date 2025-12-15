# 🧠 Big Picture First

```ts
NextAuth({
  providers,
  session,
  callbacks,
})
```

This object answers **three fundamental questions**:

1. **How can users prove who they are?** → `providers`
2. **How do we remember them after login?** → `session`
3. **What custom logic should run during auth?** → `callbacks`

Everything else is detail.

---

# 1️⃣ `providers` — *How users log in*

## What is a Provider?

A **provider** defines **one authentication method**.

Examples:

* Google login
* GitHub login
* Email/password
* Magic link

---

## Example

```ts
providers: [
  GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
]
```

This tells NextAuth:

> “Users are allowed to authenticate via GitHub OAuth.”

---

## What NextAuth Does Internally

When a user logs in:

1. Redirects user to provider (GitHub)
2. Validates callback
3. Fetches user profile
4. Normalizes user data
5. Creates a session

You **never handle OAuth tokens directly**.

---

## Credentials Provider (Important)

```ts
Credentials({
  authorize(credentials) {
    const user = verifyUser(credentials)
    return user || null
  }
})
```

You:

* validate email/password

NextAuth:

* handles sessions
* handles cookies
* handles CSRF

---

## Why Providers Are Mandatory

Without providers:

* No login methods
* No identity verification

Providers define **entry points** into your system.

---

# 2️⃣ `session` — *How login state is stored*

## What is a Session?

A session answers:

> “User logged in earlier — are they still authenticated now?”

---

## Two Session Strategies

### A) JWT (Stateless – default)

```ts
session: {
  strategy: "jwt"
}
```

Flow:

```text
Cookie → encrypted JWT → user info
```

* No database needed
* Fast
* Good for serverless

---

### B) Database Sessions (Stateful)

```ts
session: {
  strategy: "database"
}
```

Flow:

```text
Cookie → sessionId → DB → user
```

* Logout everywhere
* More control
* Requires DB adapter

---

## What NextAuth Handles Here

* Creates session on login
* Refreshes session
* Expires session
* Destroys session on logout

You **never manually store session tokens**.

---

# 3️⃣ `callbacks` — *Custom logic hooks*

## What Are Callbacks?

Callbacks are **hooks** that let you:

* inspect
* modify
* approve
* reject

auth behavior.

Think of them as **middleware for auth events**.

---

## Common Callbacks

### `signIn`

```ts
callbacks: {
  async signIn({ user, account }) {
    return true
  }
}
```

Runs:

* right after login
* before session creation

Use cases:

* block banned users
* restrict domains

---

### `jwt`

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) token.id = user.id
    return token
  }
}
```

Runs:

* when JWT is created/refreshed

Used to:

* attach custom fields
* control token content

---

### `session`

```ts
callbacks: {
  async session({ session, token }) {
    session.user.id = token.id
    return session
  }
}
```

Runs:

* whenever session is requested

Used to:

* expose safe data to frontend

---

## Why Callbacks Are Powerful

They let you:

* sync DB users
* enrich session
* control access
* enforce rules

Without rewriting auth.

---

# 🧠 How These Three Work Together (Runtime Flow)

### Example: GitHub Login

```text
1. User clicks "Sign in with GitHub"
2. Provider handles OAuth
3. signIn callback runs
4. Session is created
5. jwt callback runs
6. Cookie is set
7. session callback runs when needed
```

Each layer has a clear responsibility.

---

# 🧩 Mental Model (Remember This)

| Section     | Responsibility        |
| ----------- | --------------------- |
| `providers` | Identity verification |
| `session`   | Login persistence     |
| `callbacks` | Custom rules          |

---

# 🔚 Final Summary (One Paragraph)

The `providers` option defines how users authenticate (OAuth, credentials, etc.), the `session` option defines how authenticated state is stored and persisted across requests (JWT or database-backed), and `callbacks` are lifecycle hooks that let you customize and control authentication behavior at key moments like login, token creation, and session access. Together, these three sections fully describe your authentication system, while NextAuth handles all low-level security, cookie management, and request routing.
