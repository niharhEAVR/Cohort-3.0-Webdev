# **Exactly how to set up an Express server in TypeScript**, step by step:

---

# 1️⃣ **Step 1 — Initialize your project**

```bash
mkdir ts-express-app
cd ts-express-app
npm init -y
```

---

# 2️⃣ **Step 2 — Install dependencies**

### Express & TypeScript packages

```bash
npm install express
npm install --save-dev typescript ts-node @types/node @types/express nodemon
```

* `express` → runtime framework
* `typescript` → compiler
* `ts-node` → run TS directly
* `@types/express` → TypeScript types for Express
* `@types/node` → Node.js types
* `nodemon` → auto-restart server on changes

---

# 3️⃣ **Step 3 — Initialize TypeScript config**

```bash
npx tsc --init
```

In the generated `tsconfig.json`, make sure:

```json
{
  "target": "es6",
  "module": "commonjs",
  "outDir": "./dist",
  "rootDir": "./src",
  "strict": true,
  "esModuleInterop": true
}
```

* `outDir` → compiled JS files go here
* `rootDir` → TS source files

---

# 4️⃣ **Step 4 — Create folder & entry file**

```bash
mkdir src
touch src/index.ts
```

---

# 5️⃣ **Step 5 — Write Express server in TypeScript**

```ts
// src/index.ts
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.post("/data", (req: Request, res: Response) => {
  const body = req.body;
  res.json({ received: body });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

✅ Key points:

* `Request` & `Response` types from Express give **type safety**
* `req.body` will still be `any` unless you type it

Example of typed POST body:

```ts
interface MyData {
  name: string;
  age: number;
}

app.post("/typed", (req: Request<{}, {}, MyData>, res: Response) => {
  const data = req.body; // TS knows data has name & age
  res.json({ received: data });
});
```

---

# 6️⃣ **Step 6 — Add scripts in `package.json`**

```json
"scripts": {
  "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

* `npm run dev` → development mode
* `npm run build` → compile TypeScript to JavaScript
* `npm start` → run compiled JS

---

# 7️⃣ **Step 7 — Run your server**

```bash
npm run dev
```

You should see:

```
Server running at http://localhost:3000
```

Open your browser → `http://localhost:3000` → “Hello from TypeScript Express!”

---

# 🔥 Optional — Type-safe routes

You can type route params, query, and body like this:

```ts
// GET /users/:id?active=true
app.get<
  { id: string },      // Params
  { message: string }, // Response
  {},                  // Body
  { active: boolean }  // Query
>("/users/:id", (req, res) => {
  const id = req.params.id;
  const active = req.query.active;
  res.json({ message: `User ${id} active? ${active}` });
});
```

This is **something you can’t easily do in plain JS**.

---
---
---


# 1️⃣ **What are `@types/...` packages?**

* In **TypeScript**, you want **type safety**.
* Plain **JavaScript libraries** (like `express` or Node.js) don’t have type information by default.
* `@types/...` packages provide **TypeScript type definitions** for those libraries.

They **do not contain runtime code** — they are only for **compile-time checking**.

---

# 2️⃣ **Example: Express**

```bash
npm install express
npm install --save-dev @types/express
```

* `express` → the **actual library** that runs at runtime
* `@types/express` → TypeScript **type definitions**, gives you:

```ts
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});
```

Without `@types/express`:

* TypeScript won’t know what `req` or `res` are.
* You would lose **intellisense** and **type checking**.

---

# 3️⃣ **Example: Node.js**

```bash
npm install --save-dev @types/node
```

* Provides types for Node.js built-ins like `fs`, `path`, `http`
* Example:

```ts
import fs from "fs";

fs.readFileSync("file.txt", "utf-8"); // TS knows the types
```

Without `@types/node`:

* TypeScript wouldn’t know that `readFileSync` exists
* No argument checking, no autocomplete

---

# 4️⃣ **Difference from normal modules**

| Feature                        | Normal Module                       | @types Package            |
| ------------------------------ | ----------------------------------- | ------------------------- |
| Contains runtime code?         | ✅ Yes                               | ❌ No                      |
| Used by Node/JS at runtime?    | ✅ Yes                               | ❌ No                      |
| Provides TypeScript type info? | Sometimes no                        | ✅ Yes                     |
| Installed as                   | `dependencies` or `devDependencies` | Usually `devDependencies` |

**Rule of thumb**:

* Libraries written in JS → you need `@types/...` for TypeScript
* Libraries written in TS → usually include their own types (no need for `@types/...`)

---

# 5️⃣ **Quick Example**

```ts
import express from "express";
import fs from "fs";

// express is runtime code
const app = express();

// fs.readFileSync exists at runtime
const data = fs.readFileSync("file.txt", "utf-8");

// Request & Response types only exist at compile time
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript!");
});
```

✅ `@types` packages allow **req, res, fs, etc. to have proper types**
❌ They don’t affect the actual JS code running in Node.


---
---
---



# 1️⃣ **dependencies vs devDependencies**

| Property          | Installed in Production? | Purpose                                                                                                |
| ----------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `dependencies`    | ✅ Yes                    | Needed **at runtime** in production. Example: `express`, `mongoose`.                                   |
| `devDependencies` | ❌ No                     | Needed **only during development or build**. Example: `typescript`, `ts-node`, `nodemon`, `@types/...` |

---

# 2️⃣ **Why `@types/...` are devDependencies**

* `@types/express`, `@types/node` → **only provide TypeScript type info**
* At runtime, Node **doesn’t use them**
* So they are **not needed in production**, only when **compiling or coding**

---

# 3️⃣ **Why TypeScript itself is a devDependency**

* `typescript` → compiler, only used to **convert `.ts` → `.js`**
* Production server only needs **JavaScript**, so `tsc` is not required there

---

# 4️⃣ **Example**

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/express": "^4.17.17",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1"
  }
}
```

✅ What happens:

* `npm install --production`
  → Only `express` is installed
* `typescript`, `@types/express`, `nodemon`, `ts-node` → **not installed**

Because in production, **we only run compiled JS**.

---

# 5️⃣ **Key Takeaway**

* Anything **needed only for development/build/type-checking** → `devDependencies`
* Anything **needed at runtime** → `dependencies`

**`@types/...` packages are always devDependencies** because their job is **type checking**, not running code.