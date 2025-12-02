# ✅ **1. What is `jsonwebtoken`?**

`jsonwebtoken` is the **actual library** that performs all JWT operations:

* `jwt.sign()` → create token
* `jwt.verify()` → verify token
* `jwt.decode()` → decode token

This library is written in **JavaScript**, not TypeScript.

You install it with:

```
npm i jsonwebtoken
```

This package is used **in production**, by your real backend.

---

# 🔵 **2. What is `@types/jsonwebtoken`?**

This is *not* the JWT library.

It is a **TypeScript type-definition package** created by the community (DefinitelyTyped).

```
npm i -D @types/jsonwebtoken
```

It gives TypeScript extra knowledge about what JWT functions look like.

### It includes things like:

* The function signatures
* What parameters they accept
* What return type they produce
* What errors they throw

### Example:

It tells TypeScript:

```ts
jwt.sign(payload: string | object, secret: string, options?: SignOptions): string
```

The actual `jsonwebtoken` library **does not include** these type definitions.

---

# ⚡ Why do we need `@types/jsonwebtoken`?

Because **TypeScript cannot understand JavaScript libraries** unless:

1. They are written in TypeScript, OR
2. They have separate type definitions (`@types/...`)

Since `jsonwebtoken` is **NOT** written in TypeScript, it needs separate types.

That’s why we install:

* `jsonwebtoken` → actual runtime code
* `@types/jsonwebtoken` → TypeScript types for development

---

# 🧪 Example Without @types/jsonwebtoken

If you try this without types:

```ts
import jwt from "jsonwebtoken";

jwt.sign({ id: 1 }, "SECRET");
```

TypeScript will complain:

❌ *“Cannot find type definitions for module jsonwebtoken.”*
❌ *“jwt.sign does not exist on type any”*

Because TypeScript doesn't know what functions exist or what types they use.

---

# 🟢 Example WITH `@types/jsonwebtoken`

Now TypeScript knows:

* `sign()` returns a string
* `verify()` returns a payload or throws
* `decode()` returns `null | string | object`

So code like this will have **type safety**:

```ts
import jwt from "jsonwebtoken";

const token: string = jwt.sign({ id: 123 }, process.env.JWT_SECRET!);
const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

console.log(decoded.id); // works safely
```

---

# 🎯 Summary Table

| Package                 | Meaning                                       | Used At          |
| ----------------------- | --------------------------------------------- | ---------------- |
| **jsonwebtoken**        | Real JWT library that creates/verifies tokens | Production + Dev |
| **@types/jsonwebtoken** | TypeScript information for the library        | Dev only         |

---

# 🧠 Simple Understanding (1 Line)

**`jsonwebtoken` = actual code
`@types/jsonwebtoken` = TypeScript knowledge about the code**