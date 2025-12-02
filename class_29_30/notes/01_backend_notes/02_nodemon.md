# 🚀 What is Nodemon?

Nodemon **automatically restarts your server** whenever you save a file.

You don’t need to stop/start the app manually anymore.

---

# ✅ 1. Using Nodemon with JavaScript (`.js`)

If your main file is **server.js** or **index.js**:

### **Step 1: Install**

```
npm i -D nodemon
```

### **Step 2: Add script inside `package.json`**

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

### **Step 3: Run your server**

```
npm run dev
```

Now every time you change **any JS file**, the server auto-restarts.

---

# 🎯 2. Using Nodemon with TypeScript (`.ts`)

With TypeScript, you cannot run `.ts` files directly.
We use **ts-node + nodemon** together.

You already installed:

```
npm i -D nodemon ts-node typescript
```

### ✔ Step 1: Create **nodemon.json** (important)

Create this file in project root:

```
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

Explanation:

* `"watch": ["src"]` → watch the entire **src** folder
* `"ext": "ts"` → restart only when .ts files change
* `"exec"` → how to start your TypeScript server

---

### ✔ Step 2: Add dev script in `package.json`

```json
"scripts": {
  "dev": "nodemon"
}
```

### ✔ Step 3: Run your development server

```
npm run dev
```

Now Nodemon will:

* automatically detect **any TypeScript file changes**
* re-run your API/server instantly
* use ts-node internally so no build step is needed

---

# 🧠 Optional: Using TypeScript build + Nodemon

Some companies prefer compiling `.ts` → `.js` first.

### Step 1: Build the project

```
npm run build
```

### Step 2: Start Nodemon on the compiled JS (inside `dist`)

Add to `package.json`:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "nodemon dist/index.js"
}
```

But this method forces you to rebuild every time, so **ts-node + nodemon** is easier during development.

---

# ⭐ Summary Table

| File Type            | How to Run With Nodemon                 |
| -------------------- | --------------------------------------- |
| **JavaScript (.js)** | `nodemon index.js`                      |
| **TypeScript (.ts)** | `nodemon` (with nodemon.json) + ts-node |


---
---
---



This line in your `package.json`:

```json
"dev": "nodemon --watch src --ext ts --exec ts-node src/app.ts"
```

is just another way to run Nodemon **without using a separate `nodemon.json` file**.
Everything is written directly inside the script.

Let me break it down **super clearly**:

---

# 🔍 Breaking Down the Script

### ✔ **1. nodemon**

Starts the nodemon watcher.

---

### ✔ **2. `--watch src`**

Tell nodemon:

> “Watch the entire **src** folder for changes.”

Any file inside `/src` changes → restart server.

---

### ✔ **3. `--ext ts`**

Tell nodemon:

> “Only restart when a `.ts` file changes.”

If you modify:

* app.ts → restart
* user.controller.ts → restart
* utils.ts → restart

But if you modify:

* `.json`
* `.env`
* `.md`
  …no restart.

---

### ✔ **4. `--exec ts-node src/app.ts`**

Exec = execute command.

So:

> “Run this file using ts-node”
>
> → meaning, run TypeScript **without compiling to JavaScript**.

This part is the ENTRY POINT of your API:

```
src/app.ts
```

Like `index.ts` or `server.ts`.

---

# 🧠 So what does this whole thing do?

It means:

> Start app.ts with ts-node →
> Watch src folder →
> Restart server whenever any .ts file changes.

---

# ⭐ Final Meaning (Easy Version)

```
nodemon
  → watch src folder
  → restart when ts files change
  → run app.ts using ts-node
```

---

# 🎯 Example folder structure for this script

```
project/
 ├── src/
 │    ├── app.ts   <-- started by nodemon
 │    ├── routes/
 │    ├── controllers/
 │    └── config/
 ├── package.json
 ├── tsconfig.json
```

---

# 🚀 How to run it?

Just run:

```
npm run dev
```

Nodemon will start, and your entire backend refreshes automatically.






---
---



### **Use `ts-node` with `--loader ts-node/esm`**

Update your script in `package.json`:

```json
"scripts": {
  "dev": "nodemon --watch src --ext ts --exec node --loader ts-node/esm src/app.ts"
}
```

**Explanation:**

* `node --loader ts-node/esm` → tells Node to use ts-node’s ESM loader
* `src/app.ts` → can now run TypeScript directly
* Nodemon will still watch your `.ts` files and restart on changes
