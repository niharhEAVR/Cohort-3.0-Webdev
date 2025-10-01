In **Node.js**, `fs.readFile` and `fs.writeFile` are **asynchronous**.
That means they **don’t block the program** — they return immediately, and Node continues running the next line while the I/O happens in the background.

---

### 🔹 What happens if you write them *line by line* (not nested)?

Example:

```js
const fs = require("fs");

let data;
fs.readFile("input.txt", "utf-8", (err, content) => {
  data = content.trim();
});

fs.writeFile("output.txt", data, () => {
  console.log("done");
});
```

👉 Here’s the issue:

1. `readFile` starts, but it doesn’t finish immediately.
2. Before the callback runs, Node continues to `writeFile`.
3. At that moment, `data` is still `undefined`.
4. So it writes nothing to the file.

That’s why you **nest `writeFile` inside the `readFile` callback** → to ensure writing only happens *after reading is done*.

---

### 🔹 Why the "better" code looks cleaner

Instead of **nesting**, it wraps `readFile` and `writeFile` in a `Promise`.
That way, you can use `await`:

```js
await cleanFile("input.txt", "output.txt");
console.log("done");
```

Now, `console.log("done")` only runs **after** reading and writing finish — without callback nesting.

---

✅ So you are **100% correct**:
We nest callbacks (or use promises/async-await) because `fs.readFile` and `fs.writeFile` are asynchronous.
If we didn’t, the second operation could happen **before the first finishes**.
