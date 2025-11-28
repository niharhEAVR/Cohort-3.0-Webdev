Enums in TypeScript are a special feature that **JavaScript does NOT have**.
They let you create a **set of named constants** so your code becomes more readable and less error-prone.

---

# ✅ **1. What is an Enum?**

An **enum** (short for *enumeration*) groups together related constant values and gives them names.

### Example:

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

Here `Direction.Up`, `Direction.Down`, etc. are constant values (0,1,2,3).

---

# ✅ **2. How does enum work internally?**

TypeScript compiles this:

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

into JavaScript like:

```js
"use strict";
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
```

So `Direction.Up === 0`, `Direction.Down === 1`, etc.

---

# 3️⃣ **Types of Enums**

There are **3 types** you must know:

---

## **A. Numeric Enums (default)**

```ts
enum Status {
  Pending,   // 0
  Success,   // 1
  Failed     // 2
}
```

Usage:

```ts
let s: Status = Status.Success;
```

---

## **B. String Enums**

Values are manually assigned:

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}
```

Usage:

```ts
let r: Role = Role.Admin;
```

Advantages:
✔ More readable
✔ Safer in APIs (doesn’t change like numbers)

---

## **C. Mixed Enums** (rarely used, not recommended)

```ts
enum Mix {
  A = 1,
  B = "Hello",
}
```

---

# 4️⃣ **Why do we use enums? (Real-world examples)**

## **Example 1 — API responses**

```ts
enum Status {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}
```

Instead of remembering numbers:

```ts
if (response.status === Status.OK) {
  console.log("All good!");
}
```

---

## **Example 2 — User roles**

```ts
enum UserRole {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}
```

---

## **Example 3 — Direction in games**

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let playerDirection = Direction.Left;
```

---

# 5️⃣ **Common Confusion: Enum vs Union Types**

### **Enum**

* Runtime object
* Exists in JavaScript after compilation

### **Union Type**

* Compile-time only (no JS code generated)

```ts
type UserRole = "admin" | "editor" | "viewer";
```

---

# 6️⃣ **When NOT to use Enums**

Many devs prefer *union types* because enums create extra JS code.

### Instead of:

```ts
enum Color { Red, Blue, Green }
```

Use:

```ts
type Color = "red" | "blue" | "green";
```

This produces **zero JS code** → lighter, faster.

---

# 🎯 Summary

| Feature                | Enums       | Union Types    |
| ---------------------- | ----------- | -------------- |
| Runtime object         | ✔ Yes       | ✖ No           |
| Can be reverse-mapped  | ✔ Yes       | ✖ No           |
| JS code added          | ✔ Yes       | ✖ No           |
| Safer for constants    | ✔ Yes       | ✔ Yes          |
| Preferred in modern TS | ⚠ Sometimes | ⭐ Often better |