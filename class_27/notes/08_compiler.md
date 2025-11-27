# 🚀 **What is the TypeScript Compiler?**

The **TypeScript Compiler** is a program called **`tsc`**.

It comes from installing TypeScript:

```
npm install -g typescript
```

This gives you a command:

```
tsc
```

### 👉 `tsc` has two jobs:

1. **Check your TypeScript code for errors**
2. **Convert (compile) TypeScript into normal JavaScript**

Because browsers and Node.js **cannot run TypeScript directly** — they only understand JavaScript.

---

# ⚙️ **How does the TypeScript compiler work? (step by step)**

Think of it like a 3-step machine:

```
TypeScript Code (.ts)
        ↓
   tsc checks errors
        ↓
 tsc removes types & compiles
        ↓
JavaScript Code (.js)
```

Now let’s break it down.

---

# 🧩 **Step 1: You write TypeScript code**

Example:

```ts
function greet(name: string): string {
  return "Hello " + name;
}

greet(123); // ❌ ERROR
```

---

# 🧩 **Step 2: The compiler checks for mistakes**

`t`sc will check types:

* `name` is a string
* You passed a number (123)

So TypeScript will show:

```
Argument of type 'number' is not assignable to type 'string'.
```

This step is called **type checking**.

⚠️ IMPORTANT:
This error happens **before running the code**.
So bugs are caught early.

---

# 🧩 **Step 3: Compiler removes all TypeScript features**

TypeScript has features JavaScript does not, like:

* types
* interfaces
* enums
* generics
* access modifiers (private, public)

The compiler **removes** all of them during conversion.

Example:

TypeScript:

```ts
function greet(name: string): string {
  return "Hello " + name;
}
```

After compilation → JavaScript:

```js
function greet(name) {
  return "Hello " + name;
}
```

Notice:

* The `: string` types disappear
* The function is now plain JavaScript

---

# 🧩 **Step 4: Compiler outputs JavaScript (.js)**

You run:

```
tsc file.ts
```

This creates:

```
file.js
```

This JS file is what the browser or Node.js runs.

---

# 🧠 **Internally, how does tsc work?** (simple version)

The TypeScript compiler internally does 3 things:

### **1. Parsing**

Reads `.ts` code and turns it into an internal structure (AST — abstract syntax tree).

### **2. Type Checking**

Checks if your code follows the types you defined.

### **3. Emitting**

Generates plain JavaScript code.

Think of it like this:

| Stage     | What happens             |
| --------- | ------------------------ |
| **Read**  | Understand your TS code  |
| **Check** | Validate types & rules   |
| **Emit**  | Produce clean JavaScript |

---

# 💡 Why do we need a compiler at all?

Because:

* TypeScript has features that JavaScript does not understand
* Browsers cannot execute `.ts` files
* TypeScript isn't a language computers can run — it’s a *development language*

So TypeScript must be **compiled** → **JavaScript**.

---

# 📝 Summary (super easy version)

* TypeScript Compiler (`tsc`) converts **TypeScript → JavaScript**
* It **checks errors** (type checking)
* It **removes types** and produces normal JS
* The JS is what actually runs in browsers or Node.js
