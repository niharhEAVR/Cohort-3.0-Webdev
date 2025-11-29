In TypeScript, **`Pick`** is a **utility type** that lets you create a *new type* by selecting **specific keys** from an existing type.

---

# ✅ **What is `Pick`?**

`Pick<Type, Keys>`
It **picks** a subset of properties from another type and creates a new type.

---

# 📌 **Syntax**

```ts
Pick<OriginalType, "key1" | "key2">
```

---

# 📘 **Example 1 — Basic Usage**

```ts
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

type UserPreview = Pick<User, "id" | "name">;
```

Now, `UserPreview` becomes:

```ts
{
  id: number;
  name: string;
}
```

You can now use only these props:

```ts
const u: UserPreview = {
  id: 1,
  name: "Raj"
};
```

---

# 📘 **Example 2 — Why is `Pick` Useful?**

Imagine you have a large type:

```ts
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
};
```

But you only need fields for a card UI (title + price):

```ts
type ProductCard = Pick<Product, "title" | "price">;
```

---

# 📌 **When should you use `Pick`?**

Use `Pick` when:

✔ You want a **smaller version** of a type
✔ You don’t want to rewrite types (avoid duplication)
✔ You want code that is easier to maintain
✔ You need to **reuse models** (backend DTO → frontend UI models)

---

# 📘 **Example 3 — Function using Pick**

```ts
function showUser(u: Pick<User, "name" | "email">) {
  console.log(u.name, u.email);
}
```

---

# 🧠 **Why does Pick exist?**

Because in TypeScript:

* Interfaces and types can get large
* Repeating properties causes **code duplication**
* If the original changes, your copies do NOT update

`Pick` solves this by reusing the same structure.

---

# 🆚 Pick vs Omit (quick difference)

| Utility  | What it does                  |
| -------- | ----------------------------- |
| **Pick** | Selects *only* specified keys |
| **Omit** | Removes specified keys        |

Example:

```ts
Pick<User, "id">      // only id
Omit<User, "id">      // everything except id
```

---
---
---