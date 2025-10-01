## 🔹 1. **Facts / Callouts**

* JavaScript runs mainly in the **browser** or **Node.js**.
* It is an **interpreted** (not compiled to machine code ahead of time) and **high-level** language.
* Core design choice: **single-threaded** with an **event loop** (handles async things).
* JS is **dynamically typed** (variables can hold any type at runtime).

👉 Example:

```js
let x = 42;     // number
x = "hello";    // now string (allowed in JS)
```

---

## 🔹 2. **Performance Overhead**

* JavaScript adds **runtime checks and abstractions**, so it’s slower than low-level languages.
* The browser (V8, SpiderMonkey, etc.) does JIT (just-in-time compilation) to improve speed, but still overhead vs compiled languages like C++.

👉 Example:

```js
for (let i = 0; i < 1e7; i++) {}  // runs slower in JS than in C++
```

Reason: The JS engine checks types, memory, and optimizations at runtime.

---

## 🔹 3. **More Prone to Runtime Errors**

* Because JS is **dynamically typed**, you can easily run into errors that are only caught when the code actually runs.

👉 Example:

```js
function add(a, b) {
  return a + b;
}
console.log(add(5, 2));     // 7
console.log(add(5, "2"));   // "52" (string concatenation, maybe not intended)
console.log(add());         // NaN
```

These wouldn’t compile in stricter, statically typed languages.

---

## 🔹 4. **Dynamically Typed**

* Type is checked at runtime.
* A variable can hold different types at different times.

👉 Example:

```js
let value = 10;     // number
value = "text";     // now string
value = true;       // now boolean
```

---

## 🔹 5. **Statically Typed**

* Type is fixed at compile time.
* JavaScript itself isn’t statically typed, but **TypeScript** (a superset of JS) is.

👉 TypeScript Example:

```ts
let value: number = 10;
value = "text";   // ❌ compile-time error
```

---

## 🔹 6. **Execution (Single and Multi-thread)**

* **JavaScript itself is single-threaded.** One main thread runs code, managed by the **event loop**.
* But browsers/Node.js provide **Web APIs / worker threads**, so tasks like timers, network requests, and file I/O happen in background threads.

👉 Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside Timeout");
}, 2000);

console.log("End");
```

Output:

```
Start
End
Inside Timeout
```

Here, `setTimeout` runs on a separate Web API timer thread, but callback execution comes back to the **main thread**.

---

## 🔹 7. **Garbage Collection**

* JS uses **automatic garbage collection** (mark-and-sweep).
* You don’t manually free memory — the engine removes objects when no references exist.

👉 Example:

```js
let obj = { name: "John" };
obj = null; // previous object is no longer referenced → garbage collector frees memory
```

---

## 🔹 8. **Manual Memory Management**

* In low-level languages like **C/C++**, you must explicitly `malloc` and `free`.
* In JS, this doesn’t exist — memory is auto-managed.

👉 C Example (manual):

```c
int* ptr = malloc(sizeof(int)); 
*ptr = 42;
free(ptr);  // you must free manually
```

👉 JavaScript (automatic):

```js
let x = { num: 42 };
// no free() needed, GC does it automatically
```

---

## 🔹 9. **Rust Ownership (contrast to JS)**

* Rust uses a strict **ownership model** instead of garbage collection.
* Rules:

  1. Each value has a single owner.
  2. When the owner goes out of scope, the value is freed.
  3. Borrowing rules prevent data races in multi-threading.

👉 Rust Example:

```rust
fn main() {
    let s = String::from("hello");
    let t = s;  // ownership moves to `t`
    // println!("{}", s); // ❌ error, s is no longer valid
    println!("{}", t);   // ✅ works
}
```

👉 JavaScript equivalent:

```js
let s = "hello";
let t = s;   // copies the reference/value, both usable
console.log(s); // still valid
console.log(t);
```

* In JS, both references remain valid because GC handles cleanup.
* In Rust, ownership prevents accidental memory misuse.

---

## ✅ Summary Table

| Concept              | JavaScript Behavior              | Other Languages (contrast)     |
| -------------------- | -------------------------------- | ------------------------------ |
| Performance Overhead | Higher (JIT, runtime checks)     | Lower in C/C++                 |
| Runtime Errors       | More common (dynamic typing)     | Caught earlier in Java/TS      |
| Typing               | Dynamic                          | Static in Java, C++, Rust      |
| Execution            | Single-thread + async event loop | Multi-thread (Java, C++)       |
| Garbage Collection   | Automatic                        | Manual in C, ownership in Rust |
| Memory Management    | Automatic (GC)                   | Manual / ownership             |
