# 🔐 What is CSRF?

**CSRF = Cross-Site Request Forgery**

> It is an attack where a **user is tricked into performing an action they did NOT intend**, **while already logged in**.

The attacker **never steals your password**.
They **abuse your browser’s trust**.

---

# 🧠 The One Line Idea

> **Your browser automatically sends cookies.
> CSRF abuses that behavior.**

---

# 🔁 Normal (Safe) Request Flow

```text
User → yoursite.com → login
```

Browser receives:

```http
Set-Cookie: sessionId=abc123;
```

Later:

```text
Browser → yoursite.com/delete-account
Cookie: sessionId=abc123
```

Server says:

> “Cookie is valid → user is authenticated”

✅ Works as intended.

---

# 💣 CSRF Attack Flow (Step by Step)

### Assume:

* User is logged into **yoursite.com**
* Session is stored in a cookie

---

## 1️⃣ User visits attacker site

```text
User → evil.com
```

User is still logged into **yoursite.com** in another tab.

---

## 2️⃣ Attacker sends a hidden request

On `evil.com`:

```html
<form action="https://yoursite.com/change-email" method="POST">
  <input type="hidden" name="email" value="hacker@mail.com">
</form>

<script>
  document.forms[0].submit()
</script>
```

User never sees anything.

---

## 3️⃣ Browser does what browsers do

Browser sends:

```http
POST /change-email
Cookie: sessionId=abc123
```

⚠️ **Browser doesn’t care this came from evil.com**

---

## 4️⃣ Server accepts request

Backend logic:

```ts
if (sessionIsValid(req.cookies.sessionId)) {
  changeEmail()
}
```

💥 Email changed.
💥 Password reset next.
💥 Account stolen.

---

# ❗ Key Point (THIS MATTERS)

> **Cookies are automatically attached to cross-site requests.**

That’s why CSRF exists.

---

# 🧠 Why CSRF ONLY works with Cookies

| Auth Type     | CSRF Possible? | Why            |
| ------------- | -------------- | -------------- |
| Cookies       | ✅ Yes          | Auto-sent      |
| JWT in Header | ❌ No           | JS must attach |
| localStorage  | ❌ No           | Not auto-sent  |

**CSRF is a cookie problem.**

---

# 🔥 Real-World CSRF Damage

CSRF can:

* Delete accounts
* Change passwords
* Transfer money
* Change emails
* Modify settings

Many **bank hacks** were CSRF-based.

---

# 🛡️ How CSRF Is Prevented (IMPORTANT)

You must prove:

> “This request actually came from MY site”

---

## 🛡️ 1️⃣ CSRF Token (Best Protection)

### Server generates token

```ts
csrfToken = random()
```

### Server sends it to browser

```html
<input type="hidden" name="csrf" value="random123">
```

### Browser sends it back

```http
POST /change-email
csrf=random123
```

### Server checks:

```ts
if (csrf !== session.csrf) reject
```

Attacker **cannot guess token**.

---

## 🛡️ 2️⃣ SameSite Cookies (Modern Defense)

```http
Set-Cookie:
sessionId=abc123;
SameSite=Strict;
```

Browser rule:

> “Do NOT send this cookie on cross-site requests”

So evil.com → yoursite.com ❌ no cookie.

---

## 🛡️ 3️⃣ Origin / Referer Check

Backend checks:

```ts
req.headers.origin === "https://yoursite.com"
```

If not → reject.

Not perfect, but helpful.

---

# 🧠 Why Many Devs Miss CSRF

Because:

* App works perfectly
* Login works
* No visible bug

CSRF is an **invisible vulnerability**.

---

# 🧩 CSRF vs XSS (Quick Difference)

| Attack | What it does       |
| ------ | ------------------ |
| CSRF   | Forces user to act |
| XSS    | Runs attacker JS   |
| SQLi   | Attacks database   |

CSRF **does not require JavaScript access**.

---

# ⚠️ Very Important Truth

> **If you use cookies for auth
> and you don’t protect CSRF
> you ARE vulnerable.**

No exceptions.

---

# 🧠 Final Mental Model (Remember This)

> **CSRF = Trusted browser, untrusted intention**

The server trusts:

* the cookie
  but shouldn’t trust:
* the request source
