## 🧩 What is Zod?

**Zod** is a **TypeScript-first schema validation library** for JavaScript and Node.js.
It helps you **validate** and **parse** user input — like data coming from:

* API requests (`req.body`, `req.query`, `req.params`)
* Environment variables
* Database records
* Config files

In short:

> ✅ Zod ensures the data your code works with is valid, clean, and type-safe.

---

## ⚙️ Install Zod

```bash
npm install zod
```

or

```bash
yarn add zod
```

---

## 🧠 Basic Usage Example

```js
import { z } from "zod";

// Define a schema
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18),
});

// Example data
const data = {
  name: "Nihar",
  email: "nihar@example.com",
  age: 19,
};

// Validate
try {
  const validData = userSchema.parse(data);
  console.log("✅ Valid:", validData);
} catch (err) {
  console.log("❌ Invalid:", err.errors);
}
```

👉 `parse()` either:

* returns validated & typed data
* throws an error if validation fails

---

## 🧩 Commonly Used Zod Types

| Type           | Description             | Example                             |
| -------------- | ----------------------- | ----------------------------------- |
| `z.string()`   | String type             | `z.string().min(3).max(30)`         |
| `z.number()`   | Number type             | `z.number().int().positive()`       |
| `z.boolean()`  | Boolean type            | `z.boolean()`                       |
| `z.date()`     | Date object             | `z.date()`                          |
| `z.array()`    | Array validation        | `z.array(z.string())`               |
| `z.enum()`     | Limited values          | `z.enum(["admin", "user"])`         |
| `z.object()`   | Object shape            | `z.object({ name: z.string() })`    |
| `z.optional()` | Optional field          | `z.string().optional()`             |
| `z.nullable()` | Accepts `null`          | `z.string().nullable()`             |
| `z.union()`    | Multiple possible types | `z.union([z.string(), z.number()])` |
| `z.any()`      | Accept anything         | `z.any()`                           |

---

## 🧰 Validation in Express.js

Example signup route using **Zod** + **Express** + **Mongoose**:

```js
import express from "express";
import { z } from "zod";
import User from "../models/user.js";

const router = express.Router();

// 1️⃣ Define schema
const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// 2️⃣ Route
router.post("/signup", async (req, res) => {
  try {
    // 3️⃣ Validate input
    const validated = signupSchema.parse(req.body);

    // 4️⃣ Save to DB
    const user = await User.create(validated);
    res.status(201).json({ success: true, user });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: "Invalid input", errors: err.errors });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
```

✅ This ensures that **invalid data never reaches your database**.

---

## 🔍 Useful Zod Features

### 1. **Custom messages**

```js
z.string().min(5, { message: "Username must be at least 5 characters" })
```

### 2. **Refinements (custom validation logic)**

```js
z.string().refine((val) => val.includes("@"), {
  message: "Must contain @ symbol",
})
```

### 3. **Transform**

You can modify values after validation:

```js
z.string().trim().toLowerCase()
```

### 4. **Safe parse**

Doesn’t throw an error, returns an object with success status:

```js
const result = userSchema.safeParse(data);
if (!result.success) console.log(result.error);
else console.log(result.data);
```

### 5. **Nested objects**

```js
const userSchema = z.object({
  profile: z.object({
    age: z.number().min(18),
    bio: z.string().optional(),
  }),
});
```

---

## 💡 Why use Zod (vs. Joi / Yup)?

| Feature                       | Zod    | Joi        | Yup        |
| ----------------------------- | ------ | ---------- | ---------- |
| TypeScript support            | ✅ Best | ⚠️ Partial | ⚠️ Partial |
| Built-in type inference       | ✅      | ❌          | ❌          |
| Works in frontend & backend   | ✅      | ❌          | ✅          |
| Syntax simplicity             | ✅      | ⚠️ Complex | ✅          |
| Tree-shakeable (small bundle) | ✅      | ❌          | ✅          |

---

## 🧱 Real-world use cases

* API request validation (Express, Fastify, Next.js)
* Environment variable checking (with `dotenv`)
* Form validation (React + Zod)
* Type-safe config validation

---

## 🧩 Example: Environment validation

```js
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().url(),
});

const env = envSchema.parse(process.env);

export const { PORT, MONGO_URI } = env;
```

---

## ✅ Summary

| Concept       | Description                                         |
| ------------- | --------------------------------------------------- |
| Zod           | Library for schema validation                       |
| Purpose       | To validate data safely                             |
| Install       | `npm install zod`                                   |
| Common types  | `string`, `number`, `object`, `array`, `enum`       |
| Core methods  | `parse()`, `safeParse()`, `refine()`, `transform()` |
| Best use case | Input validation in APIs                            |
