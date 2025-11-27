# 🚀 **What is `ts-node`?**

`ts-node` is a tool that allows you to **run TypeScript files directly**, **without manually compiling them into JavaScript** first.

### Normally, with TypeScript:

1. You write `.ts` file
2. You must run **`tsc`** to compile → generates `.js`
3. Then run **`node file.js`**

### With `ts-node`:

You can **run TypeScript directly** like this:

```bash
ts-node index.ts
```

No separate compile step needed.

---

# 🧠 Why do we use `ts-node`?

| Problem Without ts-node           | Solution With ts-node        |
| --------------------------------- | ---------------------------- |
| Must compile to JS first          | Skip compile step            |
| Repeated steps during development | Faster development & testing |
| Slower workflow                   | Instant execution            |
| Produces lots of JS output files  | No output files created      |

---

# 🧩 Example

### **index.ts**

```ts
const greet = (name: string) => {
  console.log(`Hello, ${name}`);
};

greet("Barshan");
```

### Without ts-node:

```bash
tsc index.ts
node index.js
```

### With ts-node:

```bash
ts-node index.ts
```

---

# 🛠 How to install

```bash
npm install -g ts-node typescript
```

or dev dependency:

```bash
npm install --save-dev ts-node

# then run with 

npx ts-node index.ts
```

---

# 🌍 Real-world use cases

### 🧪 1. Backend development (Node.js + TypeScript)

When building APIs with:

* Express
* NestJS
* Fastify

Developers use:

```bash
ts-node src/server.ts
```

and combine with **nodemon** for hot reload:

```bash
nodemon --exec ts-node src/server.ts
```

### 🛠 2. Running scripts quickly

For testing logic or utilities without building a whole project.

### 🧑‍🏫 3. Learning & experimenting

No need to build every time you change 1 line.

---

# ⚠️ Real world note

You **should NOT** use `ts-node` in production (server deployment) because:

* It is slower than running compiled JS
* It compiles on the fly

### Production deployment workflow:

```bash
tsc
node dist/server.js
```

---

# 🏁 Summary

| Feature                 | Meaning                    |
| ----------------------- | -------------------------- |
| `ts-node`               | Runs TypeScript directly   |
| Saves time              | No manual compile required |
| Used in dev environment | Faster backend development |
| Not for production      | Compile first, then run JS |

---

# 🎯 In one sentence

> **`ts-node` = Node.js for TypeScript**
> Run `.ts` files directly without converting to `.js` first.