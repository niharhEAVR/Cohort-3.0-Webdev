# **How arrays work in TypeScript** — and how they are different from JavaScript arrays.

---

# ✅ **First: JavaScript Arrays**

In JavaScript:

* Arrays can hold **anything**
* Any length is allowed
* Types can mix

Example JS:

```js
let arr = [10, "hello", true, {}, []];
```

JavaScript is okay with this because it’s **dynamically typed**.

---

# ✅ **But TypeScript adds TYPE CHECKING**

TypeScript does **not change how arrays work at runtime**,
but it **adds rules** about what types the array can contain.

---

# ⭐ 1. **Basic Typed Array**

Two ways to declare:

### **A) Using `number[]`**

```ts
let nums: number[] = [1, 2, 3];
```

### **B) Using `Array<number>`**

```ts
let nums: Array<number> = [1, 2, 3];
```

Both are exactly the same.

---

# ⭐ 2. **Mixed-Type Arrays (Union Type Arrays)**

Example: array that accepts **string OR number**

```ts
let arr: (string | number)[] = [1, "hello"];
```

Or:

```ts
type ID = string | number;
let arr: ID[] = ["abc", 123];
```

---

# ⭐ 3. **Array of Objects**

```ts
type User = {
  name: string;
  age: number;
};

let users: User[] = [
  { name: "Raj", age: 19 },
  { name: "Aman", age: 21 },
];
```

---

# ⭐ 4. **Readonly Arrays**

To prevent array modification:

```ts
let nums: readonly number[] = [1, 2, 3];
nums.push(4); // ❌ Error
```

---

# ⭐ 5. **Array with Specific Structure (Tuple)**

This is NOT a normal array:

```ts
let person: [string, number] = ["Raj", 19];
```

* Must be exactly 2 items
* In exact order: string first, number second

Normal arrays have no such restrictions.

---

# ⭐ 6. **Array Methods Work the Same**

All JavaScript methods still work:

```ts
let arr: number[] = [1, 2, 3];

arr.push(4);        // OK
arr.map(x => x * 2) // OK
arr.filter(x => x > 1);
```

But TypeScript ensures type safety:

```ts
arr.push("hello"); // ❌ Error — because arr expects number only
```

---

# ⭐ 7. **Any[] (Not Recommended)**

If you write:

```ts
let arr: any[] = [1, "hi", true];
```

TS stops checking:

* You lose type safety
* Basically becomes JS again

Avoid unless necessary.

---

# ⭐ 8. **Array of Functions**

```ts
let fns: ((x: number) => number)[] = [
  (x) => x + 1,
  (x) => x * 2,
];
```

---

# ⭐ 9. **Array Inferred Automatically**

TypeScript automatically detects the type:

```ts
let arr = [1, 2, 3]; // infers as number[]
```

But:

```ts
let arr = [1, "hello"]; 
// infers as (string | number)[]
```

TS uses union automatically when necessary.

---

# 🧠 FINAL SUMMARY — Arrays in TS

### ✔ Arrays work EXACTLY like JS at runtime

### ✔ TypeScript adds static type checking

### ✔ You can define:

* array of one type
* mixed-type array
* array of objects
* array of functions
* tuple (fixed structure)
* readonly array
* inferred array types