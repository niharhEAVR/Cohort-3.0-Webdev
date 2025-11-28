# ✅ **1. UNION (`|`) — OR type**

### **Meaning:**

A value can be **one type OR another**.

### Symbol:

```
|
```

### Think of it like:

```
A OR B OR C
```

---

## ✔ **Example**

```ts
type ID = number | string;
```

Allowed:

```ts
let x: ID = 10;
x = "abc";
```

---

## ⭐ When to use UNION:

* When a variable can have **multiple possible shapes**
* Different API responses
* Status values
* Optional patterns
* Mixed arrays

---

## ⚠ What NOT to do with unions:

### ❌ Don’t expect union to combine properties

Example:

```ts
type A = { name: string };
type B = { age: number };

type C = A | B;
```

`C` means:

```
Either { name }
OR     { age }
```

Not both!

If you try:

```ts
let p: C = { name: "Raj", age: 19 }; // ❌ Error
```

Because union does NOT merge objects.

---

# ✅ **2. INTERSECTION (`&`) — AND type**

### **Meaning:**

A value must be **ALL types at the same time**.

### Symbol:

```
&
```

### Think of it like:

```
A AND B AND C
```

---

## ✔ **Example**

```ts
type A = { name: string };
type B = { age: number };

type Person = A & B;
```

Now:

```ts
let p: Person = { name: "Raj", age: 19 };
```

Works because it has **both** properties.

---

## ⭐ When to use INTERSECTION:

* To combine multiple structures
* To extend third-party types
* To build complex models
* Mixins
* Composition over inheritance

---

## ⚠ What NOT to do with intersections:

### ❌ Don’t intersect incompatible types

Example:

```ts
type Bad = string & number;
```

This creates a type that **can never exist**.

TS treats it as `never`.

---

### ❌ Don’t think intersection means “choose one”

Intersection ALWAYS means “must satisfy all”.

---

# 🔥 **BIG DIFFERENCE TABLE**

| Feature | UNION (`|`) | INTERSECTION (`&`) |
|---------|-------------|---------------------|
| Meaning | OR | AND |
| Combines types | No (only alternative) | Yes (merge) |
| Accepts either type | ✔ Yes | ❌ No |
| Must satisfy all types | ❌ No | ✔ Yes |
| Useful for | Variants, choices | Merging structures |
| Result of conflicting types | More broad | `never` (impossible) |

---

# 🧠 **Visual Understanding**

### Union

```
     A  
   /    
  /      
 /______ B

Can be in A OR B
```

### Intersection

```
  A ∩ B

Only values that are IN BOTH
```

---

# 🧪 **Practical Examples Where UNION and INTERSECTION Differ**

## ✔ **Union Example (UI Component Variants)**

```ts
type ButtonProps =
  | { variant: "icon"; icon: string }
  | { variant: "text"; label: string };
```

Cannot use `&` here — would force both fields.

---

## ✔ **Intersection Example (Combine Features)**

```ts
type HasID = { id: number };
type HasTimestamp = { createdAt: string };

type Entity = HasID & HasTimestamp;
```

Becomes:

```ts
{
  id: number;
  createdAt: string;
}
```

---

# 🔥 GOLDEN RULES (What to do & not do)

### ✔ Use `|` when:

* You want **choices**
* “Either A or B”
* Variants
* API responses
* Optional structures

### ✔ Use `&` when:

* You want **combination**
* “A AND B”
* Merging object shapes
* Extending types

---

### ❌ Don’t use union expecting merge

Use intersection for merging.

### ❌ Don’t use intersection for incompatible types

It will create `never`.

---

# 🎯 Final Summary

### **`|` = OR → Choose any**

### **`&` = AND → Must satisfy all**

### **Union = alternatives**

### **Intersection = combination**


---
---
---



# ✅ **Your Code**

```ts
type A = { name: string };
type B = { age: number };

type C = A | B;

let p: C = { name: "Raj", age: 19 };
```

### ✔ This does NOT give an error

Why?

Because `{ name: "Raj", age: 19 }` technically satisfies **both C options**:

### Option 1:

```ts
A = { name: string }
```

Your object has `name` → so OK.

### Option 2:

```ts
B = { age: number }
```

Your object has `age` → so OK.

So TS says:

```
This object CAN be A or B. So it is allowed.
```

---

# ❗ The Error Comes When You Try to ACCESS Properties

Example:

```ts
p.name;
```

or

```ts
p.age;
```

### ❌ TypeScript gives error:

> Property 'name' does not exist on type 'C'

Why?

Because:

```
C = A OR B
```

So from TS perspective:

* If p is A → it has `name`, but no `age`
* If p is B → it has `age`, but no `name`

TypeScript **has no guarantee** which one you mean.

Even if you KNOW that both exist, **TS does not** unless you tell it.

---

# 🧠 THINK OF IT LIKE THIS

Even if runtime object has both properties,
TypeScript checks **TYPE**, not **VALUE**.

### p: C

→ Could be A
→ Could be B

TS doesn’t assume both.

---

# 🔥 **How to Fix It (3 Ways)**

---

## ✅ 1. **Narrow the type using `in`**

Tell TypeScript which type it is:

```ts
if ("name" in p) {
  console.log(p.name); // allowed
}
```

Or:

```ts
if ("age" in p) {
  console.log(p.age);
}
```

---

## ✅ 2. **Use intersection (&) instead of union (|)**

If your intention is to MERGE the shapes:

```ts
type C = A & B;

let p: C = { name: "Raj", age: 19 };

console.log(p.name); // OK
console.log(p.age);  // OK
```

---

## ❌ Don’t use union if you want access to all properties

Union means:

```
Either A or B, not both
```

Intersection means:

```
Must be A AND B, both
```

---

# 🔥 Summary

### Why no error when creating object?

Because the object matches **at least one** of the union types.

### Why error when accessing properties?

Because TS does NOT know whether it is A or B,
so accessing a property from only one side is unsafe.

### Fix = narrow the type OR use intersection