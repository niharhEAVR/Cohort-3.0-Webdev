# ✅ 1. `keyof` — Get All Keys of a Type

`keyof` creates a **union** of all *property names* of a type.

Example:

```ts
type User = {
  name: string;
  age: number;
};

type UserKeys = keyof User;
// "name" | "age"
```

So `UserKeys` becomes a type like:

```
"name" | "age"
```

---

### 💡 Practical example: Safe property access

```ts
function getProp<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user = { name: "Raj", age: 19 };

getProp(user, "name"); // OK
getProp(user, "age");  // OK
getProp(user, "email"); // ❌ ERROR
```

This prevents bugs like accessing properties that don't exist.

---

# ✅ 2. `extends` — Constraining Generics

`extends` limits what types can be passed.

### Example 1: Only types with `.length`

```ts
function logLength<T extends { length: number }>(value: T) {
  console.log(value.length);
}

logLength("hello");     // OK
logLength([1,2,3]);     // OK
logLength(10);          // ❌ number has no length
```

---

### Example 2: Ensure object shapes

```ts
function mergeObjects<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}

mergeObjects({ name: "Raj" }, { age: 19 });  // OK
mergeObjects(10, 20); // ❌ Not objects
```

---

# ✅ 3. Default Generic Types

You can give a fallback type if none is provided.

```ts
interface ApiResponse<T = string> {
  data: T;
}

const res1: ApiResponse = { data: "default string" }; // T = string
const res2: ApiResponse<number> = { data: 100 };       // T = number
```

This is used **everywhere**, especially in libraries.

---

# 🎯 4. REAL-WORLD Problems Solved by Generics

Here are the *serious* problems generics fix.

---

# 🌍 Problem 1: Working With APIs

When you fetch data, its shape changes API to API.

With generics:

```ts
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

type User = { name: string; age: number };

const user = await fetchData<User>("/api/user");
```

✔ Correct type
✔ Autocomplete
✔ Compile-time errors
❌ No need for `any`

---

# 🌍 Problem 2: React Component Props

```ts
interface ButtonProps<T> {
  value: T;
  onClick: (value: T) => void;
}

function Button<T>({ value, onClick }: ButtonProps<T>) {
  return <button onClick={() => onClick(value)}>{value}</button>;
}

<Button value="Save" onClick={(val) => console.log(val)} />;
<Button value={10} onClick={(val) => console.log(val)} />;
```

One component → unlimited value types.

---

# 🌍 Problem 3: Reusable Utility Functions

Without generics:

```ts
function wrapNumber(value: number): number[] {
  return [value];
}
```

With generics:

```ts
function wrap<T>(value: T): T[] {
  return [value];
}
```

Works for any type.

---

# 🌍 Problem 4: Type-safe Database Models

```ts
interface Model<T> {
  id: string;
  data: T;
}

const userModel: Model<{ name: string; age: number }> = {
  id: "1",
  data: { name: "Raj", age: 19 },
};
```

---

# 🌍 Problem 5: Form Validation Libraries

```ts
function createForm<T>(initialValues: T) {
  return {
    values: initialValues,
    get<K extends keyof T>(key: K) {
      return initialValues[key];
    }
  };
}

const form = createForm({
  username: "raj",
  password: "123"
});

form.get("username"); // OK
form.get("password"); // OK
form.get("email");    // ❌ ERROR
```

---

# 🌍 Problem 6: Avoiding Code Duplication

You can write ONE function that works for all types.

```ts
function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

const result = swap("hello", 123);
// result: [123, "hello"]
```

---

# 🎉 FINAL SUMMARY

| Pattern           | What it does                   |         |
| ----------------- | ------------------------------ | ------- |
| **`keyof`**       | Gets keys of a type (`"name"   | "age"`) |
| **`extends`**     | Restricts generic types        |         |
| **Default Types** | Provides fallback type         |         |
| **Generics**      | Allow reusable, type-safe code |         |
