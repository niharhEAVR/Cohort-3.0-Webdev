`Readonly` in TypeScript is a **utility type** that makes **all properties of an object type read-only**, meaning **you cannot change (mutate) them after assignment**.

---

# ✅ **What is `Readonly`?**

`Readonly<Type>` takes a type and makes **every property immutable**.

---

# 📌 Example 1 — Basic Usage

```ts
type User = {
  id: number;
  name: string;
};

const u: Readonly<User> = {
  id: 1,
  name: "Raj"
};

// ❌ Error: cannot reassign, because it's readonly
u.name = "Rahul";
```

`u.name` becomes readonly — no change allowed.

---

# 🧠 **How `Readonly` Works Internally**

This is how TypeScript defines it:

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Breakdown:

* `keyof T` → gets all keys of the type
* `[P in keyof T]` → loop through every key
* `readonly` → adds readonly modifier
* `T[P]` → keeps original value type

Effect: **All properties become readonly.**

---

# 📌 Example 2 — Works on Objects, not arrays (for arrays use ReadonlyArray)**

```ts
const person: Readonly<{ name: string; age: number }> = {
  name: "Raj",
  age: 19
};

person.age = 20; // ❌ Error
```

---

# 📘 Example 3 — ReadonlyArray

This is a special type:

```ts
const nums: ReadonlyArray<number> = [1, 2, 3];

nums.push(4); // ❌ Error
nums[0] = 10; // ❌ Error
```

You **cannot mutate** the array.

---

# 📌 Example 4 — Real-world use: Protecting configs

```ts
type Config = {
  apiKey: string;
  retry: number;
};

const config: Readonly<Config> = {
  apiKey: "XYZ",
  retry: 3
};

// Somewhere else in code
config.retry = 5; // ❌ not allowed
```

This prevents accidental changes.

---

# 📌 Example 5 — Readonly + Partial + Pick etc.

You can combine utility types:

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type SafeUser = Readonly<Pick<User, "id" | "name">>;
```

Now:

* Only `"id"` and `"name"` exist
* Both are readonly

---

# 📦 When to use `Readonly`?

Use it when:

✔ You want to **protect data**
✔ Prevent accidental mutation
✔ Freeze config objects
✔ Enforce immutability in functions


---
---
---
<br>
<br>

Yes — **all three utility types (`Pick`, `Partial`, `Readonly`) work with BOTH**:

✔ **Type aliases (`type`)**
✔ **Interfaces (`interface`)**

Because these utility types operate on the *shape* of the type, not on how it was defined.

---

# ✅ **Example with `interface`**

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const a: Partial<User> = { name: "Raj" };
const b: Pick<User, "id" | "email"> = { id: 1, email: "x@mail.com" };
const c: Readonly<User> = { id: 1, name: "Raj", email: "x@mail.com" };
```

✔ Works perfectly.

---

# ✅ **Example with `type`**

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const a: Partial<User> = { name: "Raj" };
const b: Pick<User, "id" | "email"> = { id: 1, email: "x@mail.com" };
const c: Readonly<User> = { id: 1, name: "Raj", email: "x@mail.com" };
```

✔ Works exactly the same.

---

# 🧠 **Why do they work on both?**

Because:

* `interface` and `type` both define **object shapes**
* Utility types operate on those shapes using:

  * `keyof`
  * mapped types (`[P in keyof T]`)
  * property modifiers (`readonly`, `?`)

So TypeScript doesn’t care whether the original was an interface or a type — as long as it’s an object-like structure.

---

# 📌 Small Difference (for deeper knowledge)

Utility types **do NOT work** on:

* primitives (`string`, `number`, `boolean`)
* unions of primitives
* function types (unless structured)

Example:

```ts
type X = Partial<string>; // ❌ meaningless
```

But for objects (interfaces & type objects), they work perfectly.
