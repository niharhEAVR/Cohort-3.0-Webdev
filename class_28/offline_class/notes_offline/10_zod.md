# 1️⃣ **What is Zod?**

* `zod` is a **TypeScript-first schema validation library**.
* Its main job: **validate data at runtime** and **infer TypeScript types automatically**.
* Think of it like **TypeScript for runtime** — because TypeScript only exists **at compile-time**.

✅ You can safely parse API requests, forms, or any data with Zod.

---

# 2️⃣ **Install Zod**

```bash
npm install zod
```

---

# 3️⃣ **Basic Example**

```ts
import { z } from "zod";

// Define a schema
const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
});

// Example data
const data = {
  name: "Raj",
  age: 20,
};

// Validate
const user = UserSchema.parse(data); // ✅ OK

console.log(user.name); // Raj
console.log(user.age);  // 20
```

### What happens:

* `UserSchema.parse(data)` checks if `data` matches the schema
* If **yes** → returns typed object
* If **no** → throws a runtime error

---

# 4️⃣ **Automatic Type Inference**

Zod automatically infers TypeScript types:

```ts
type User = z.infer<typeof UserSchema>;

const u: User = {
  name: "Alice",
  age: 25,
};
```

* `User` type is now:

```ts
type User = {
  name: string;
  age: number;
};
```

* You **don’t need to write types manually** — Zod does it for you.

---

# 5️⃣ **Validating Arrays**

```ts
const NumbersSchema = z.array(z.number());

const nums = NumbersSchema.parse([1, 2, 3]); // ✅ OK
```

* Validates that **all array items are numbers**

---

# 6️⃣ **Optional and Default Values**

```ts
const PersonSchema = z.object({
  name: z.string(),
  age: z.number().optional(), // optional
  role: z.string().default("user"), // default value
});

const person = PersonSchema.parse({ name: "Bob" });

console.log(person); 
// { name: 'Bob', role: 'user' }
```

---

# 7️⃣ **Safe Parsing (doesn’t throw)**

```ts
const result = UserSchema.safeParse({ name: "Raj", age: "twenty" });

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log(result.data);
}
```

* `safeParse` returns an object instead of throwing errors
* `result.success` → boolean
* `result.data` → valid parsed data if success

---

# 8️⃣ **Why Zod is better than manual checking**

* No need for `if (typeof x === "string")` everywhere
* Automatically gives **runtime validation** + **TypeScript type inference**
* Great for **API request validation** (Express, Fastify, Next.js, etc.)

---

# 🔥 Summary

| Feature            | Zod                                |
| ------------------ | ---------------------------------- |
| Runtime validation | ✅                                  |
| Type inference     | ✅                                  |
| Schema composition | ✅ (nested objects, arrays, unions) |
| Error reporting    | ✅ (structured)                     |
| Optional/default   | ✅                                  |

---

# 9️⃣ **Example with Express**

```ts
import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const UserSchema = z.object({
  name: z.string(),
  age: z.number().positive(),
});

app.post("/user", (req, res) => {
  const parseResult = UserSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json(parseResult.error.issues);
  }

  const user = parseResult.data;
  res.json({ message: "User valid!", user });
});

app.listen(3000, () => console.log("Server running"));
```

✅ Here Zod validates **incoming JSON body** before using it.
