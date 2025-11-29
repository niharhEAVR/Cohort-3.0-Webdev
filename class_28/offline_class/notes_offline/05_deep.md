# ✅ **1. DeepPartial — makes ALL nested properties optional**

`Partial<T>` only makes **top-level** properties optional.

But `DeepPartial<T>` makes **every property inside nested objects optional too**.

---

### 📌 Example (why Partial is not enough)

```ts
type User = {
  id: number;
  name: string;
  address: {
    city: string;
    pincode: number;
  };
};
```

`Partial<User>` gives:

```ts
{
  id?: number;
  name?: string;
  address?: {   // ❌ address is optional BUT its inside values are STILL required
    city: string;       // still required
    pincode: number;    // still required
  }
}
```

But `DeepPartial<User>` makes EVERYTHING optional:

```ts
{
  id?: number;
  name?: string;
  address?: {
    city?: string;
    pincode?: number;
  }
}
```

---

### 🧠 How to implement **DeepPartial**

```ts
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
```

✔ If the value is an object → apply DeepPartial again
✔ If not → just make it optional

---

# ✅ **2. DeepReadonly — makes ALL nested properties readonly**

Just like `Readonly`, but deep inside the object.

---

### 📌 Example

```ts
type User = {
  id: number;
  profile: {
    name: string;
    email: string;
  };
};
```

`Readonly<User>` makes only top-level readonly, but its child can mutate:

```ts
const u: Readonly<User> = {
  id: 1,
  profile: { name: "Raj", email: "r@mail.com" }
};

u.profile.name = "New"; // ✔ allowed (because profile is NOT readonly)
```

But `DeepReadonly<User>` prevents this:

```ts
u.profile.name = "New"; // ❌ error
```

---

### 🧠 Implementation of **DeepReadonly**

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};
```

✔ Makes nested children readonly
✔ Prevents mutation everywhere

---

# ✅ **3. How to Create Your Own Utility Types**

Utility types are made using:

### ✔ 1. `keyof`

Get keys of a type.

```ts
type KeysOfUser = keyof User;
```

---

### ✔ 2. Mapped types

```ts
type MyOptional<T> = {
  [P in keyof T]?: T[P];
};
```

---

### ✔ 3. Conditional types

```ts
type IsString<T> = T extends string ? "yes" : "no";
```

Usage:

```ts
type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
```

---

# 🎯 **Custom Examples**

### **a) Make all properties nullable**

```ts
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

---

### **b) Make selected keys readonly**

```ts
type ReadonlyKeys<T, K extends keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;
```

Usage:

```ts
type User = { id: number; name: string; email: string };

type UserWithReadonlyId = ReadonlyKeys<User, "id">;
```

---

# 🎯 Summary Table

| Utility Type         | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `Partial<T>`         | Makes top-level keys optional                          |
| `DeepPartial<T>`     | Makes ALL nested keys optional                         |
| `Readonly<T>`        | Makes top-level keys readonly                          |
| `DeepReadonly<T>`    | Makes ALL nested keys readonly                         |
| Custom Utility Types | Created using `keyof`, mapped types, conditional types |

---
---
---

# **DeepPartial**, **DeepReadonly**, **DeepRequired**, etc.
are **NOT built into TypeScript**.

TypeScript only includes **shallow** utility types:

✔ `Partial`
✔ `Required`
✔ `Readonly`
✔ `Pick`, `Omit`
✔ `Record`
✔ `Exclude`, `Extract`
✔ `ReturnType`, etc.

But **deep versions are NOT included**.

So yes — you must **create them manually**, or use a library that provides them.

---

# ✅ Example: Manually create DeepPartial

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};
```

---

# 🟢 Example: Manually create DeepReadonly

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
```

---

# 🔧 Why isn't this built into TypeScript?

Because:

* “Deep” can mean many different things
* Some objects (like Date, Map, Set) behave differently
* Deep transformations are expensive and complex
* TypeScript keeps built-ins simple and generic

Instead, TypeScript encourages developers to build their own versions depending on their use case.

---

# 🟦 If you don’t want to write these manually…

You can install helper libraries:

### 1. **type-fest** (very popular)

```
npm install type-fest
```

It includes:

* `PartialDeep`
* `ReadonlyDeep`
* `Writable`
* `ValueOf`
* Many more useful types

Usage:

```ts
import { PartialDeep, ReadonlyDeep } from "type-fest";

type A = PartialDeep<User>;
type B = ReadonlyDeep<Product>;
```

---

# 🔥 Summary

| Utility      | Built-in? | Purpose            |
| ------------ | --------- | ------------------ |
| Partial      | ✔ Yes     | top-level optional |
| Readonly     | ✔ Yes     | top-level readonly |
| DeepPartial  | ❌ No      | nested optional    |
| DeepReadonly | ❌ No      | nested readonly    |
| DeepRequired | ❌ No      | nested required    |
