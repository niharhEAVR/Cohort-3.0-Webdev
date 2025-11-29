`Partial` is one of the most useful **built-in utility types** in TypeScript.

---

# ✅ **What is `Partial`?**

`Partial<Type>` makes **all properties optional**.

If you pass a type with required fields, `Partial` will turn every field into `optional`.

---

# 📌 Example 1 — Basic Usage

```ts
type User = {
  id: number;
  name: string;
  email: string;
};
```

Normally, when you create a user object:

```ts
const u: User = {
  id: 1,
  name: "Raj",
  email: "raj@mail.com"
};
```

But with `Partial<User>`:

```ts
const u2: Partial<User> = {
  name: "Raj"
};
```

This is valid because all fields are optional.

---

# 🧠 **How `Partial` Works Internally**

Here is the TypeScript definition of `Partial`:

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

Breakdown:

* `keyof T` → gets all keys of the type (ex: `"id" | "name" | "email"`)
* `P in keyof T` → loop over each key
* `?:` → makes each key optional
* `T[P]` → keeps the same value type

So it creates a new type where all fields are optional.

---

# 📌 Example 2 — Real-world use case: PATCH API

Imagine editing a user in a database:

```ts
PATCH /users/:id
```

In PATCH, a user might update **only one field**, like:

```ts
{ name: "New Name" }
```

Using `Partial<User>` prevents you from making everything required:

```ts
function updateUser(id: number, data: Partial<User>) {
  // update logic...
}
```

Now all of these are valid:

```ts
updateUser(1, { name: "Raj" });
updateUser(1, { email: "new@mail.com" });
updateUser(1, { id: 10, name: "New Raj" });
```

---

# 📌 Example 3 — Optional config objects

```ts
type Config = {
  debug: boolean;
  retries: number;
  timeout: number;
};

function setup(config: Partial<Config>) {
  console.log(config);
}

setup({ debug: true });
setup({ retries: 3, timeout: 5000 });
```

---

# 📌 Example 4 — Partial + Required fields mix

You can combine types:

```ts
type UserUpdate = Partial<User> & { id: number };
```

Now:

* `id` → required
* others → optional

---

# 📦 When to use `Partial`?

Use `Partial` whenever:

✔ You want to allow **partial objects**
✔ You are building **update functions**
✔ You want to avoid repeating optional versions of a type
✔ You need **flexibility** without losing type hints
