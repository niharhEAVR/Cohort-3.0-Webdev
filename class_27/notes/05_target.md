# 🎯 What is `target` in `tsconfig.json`?

`target` tells TypeScript **which version of JavaScript you want your TypeScript code to be compiled into.**
Because browsers / Node.js don’t understand TypeScript — they only run JavaScript.

Different JavaScript versions (ES5, ES6/ES2015, ES2020, etc.) support different features.
So the `target` decides what kind of JS features are allowed in the output.

---

## 🧠 Why is this needed in the real world?

### Because:

* Not all browsers support the latest JavaScript features
* Some environments (like old Android browsers, IE11, etc.) need older JS syntax
* Modern environments (Node 18+, modern Chrome/Firefox) support latest features and run faster

So `target` is used to **control compatibility vs performance**.

---

# 🔧 Example

### TypeScript code:

```ts
const sum = (a: number, b: number) => a + b;
```

## If `target = "ES5"` (for older browsers)

It compiles to:

```js
"use strict";
var sum = function (a, b) { return a + b; };
```

## If `target = "ES6"` / `"ES2015"`

It compiles to:

```js
"use strict";
const sum = (a, b) => a + b;
```

### 🤔 Difference?

* `var` replaced with `let`/`const`
* Arrow functions not converted in ES6 version
* Modern features preserved

---

# 🌍 Real World Scenario

| Application Type                 | Recommended target          | Why                               |
| -------------------------------- | --------------------------- | --------------------------------- |
| Banking app used by old browsers | `ES5`                       | Maximum compatibility             |
| Modern web app or React app      | `ES6` / `ES2017` / `ES2020` | Better performance & cleaner code |
| Node.js backend                  | `ES2020` / `ES2022`         | Node supports latest features     |

---

# 📱 Example in Companies

Imagine you are building Swiggy / Zomato app web version.

If most users use modern devices → you choose:

```json
"target": "ES2020"
```

✔ Faster bundle
✔ Smaller build
✔ Modern features like async/await

But if building a Government website (where people use old browsers like IE11):

```json
"target": "ES5"
```

✔ Works everywhere, no crashes

---

# 🏁 Summary

| `target` controls            | Meaning                                  |
| ---------------------------- | ---------------------------------------- |
| JavaScript version generated | What JS syntax appears in build output   |
| Browser compatibility        | Old vs new device support                |
| Performance & bundle size    | Modern JS = faster                       |
| Which features are converted | arrow functions, promises, classes, etc. |

---

# 💡 Best practice (what most projects use today)

```json
"target": "ES2020"
```

For Node projects:

```json
"target": "ES2022"
```

For very old browser support:

```json
"target": "ES5"
```

---
---
---
---






# 🤖 **What are these ES things?**

**ES** stands for **ECMAScript** — the official standardized version of JavaScript.

Every few years, a new version is released with new features.

| Name         | Year | Example Features                                  |
| ------------ | ---- | ------------------------------------------------- |
| ES5          | 2009 | `var`, functions, basic JS                        |
| ES6 / ES2015 | 2015 | `let`, `const`, arrow functions, classes, modules |
| ES2017       | 2017 | `async / await`                                   |
| ES2020       | 2020 | `optional chaining ?.`, `nullish ??`              |
| ES2022       | 2022 | top-level await                                   |

So when you set:

```json
"target": "ES6"
```

You are telling TypeScript:
**Compile code into JavaScript that works like ES2015 (2015 version of JS)**

---

# 🌍 **Why doesn’t the entire world adopt the newest version immediately?**

Because **not every computer or browser can run the latest JavaScript features**.

### Think about:

* Old Android phones
* Older iPhones
* Old Windows PCs in schools, government offices, labs, etc.
* Internet Explorer (still used in some systems)

Example:
**`optional chaining` operator `?.`** works only in latest browsers.
If an old browser sees it → **it crashes**.

---

# 🏛 **Why do government websites use older versions?**

### Because they must support everyone, even users with old systems.

| Government                   | Startup                    |
| ---------------------------- | -------------------------- |
| Serve every citizen          | Target modern users        |
| Cannot break on old browsers | Can require latest devices |
| Must be stable 100%          | Can move fast              |

If a government website only worked on modern browsers:

* People in rural areas with old phones
* Old office computers
* Public cyber cafés

→ **They would be excluded**. That becomes discrimination.

So it’s actually done to **avoid discrimination**, not create it.

---

# 🧠 Real example

If a banking site breaks on an old computer and somebody can’t access money → big problem.

Imagine **income tax portal not opening** because you don’t have a latest laptop.
Government cannot say:

> “Buy a new computer to file tax”.

So they keep compatibility safe.

---

# 🔥 Then why does the tech world still progress?

Because modern companies **have different goals**:

### Example: Instagram, Netflix, Zomato

* Target mostly modern devices
* Choose newer ES versions
* Faster development
* Better performance

### Example: Hospitals, Railway Reservation, Passport websites

* Support very old browsers
* More stable than fast

---

# 🏁 Final Summary

| Reason                                  | Explanation                     |
| --------------------------------------- | ------------------------------- |
| ES versions are new JavaScript versions | Introduce modern features       |
| Not everyone upgrades devices           | Older hardware can't run new JS |
| Government needs 100% compatibility     | Must support everyone equally   |
| Companies choose new ES for performance | Faster & modern features        |

---

# 💡 Real moral

> **Technology cannot progress faster than society can adopt it.**

That’s why TypeScript lets us choose the `target`, so we can decide:

* **Support old users** or
* **Use newest modern features**
