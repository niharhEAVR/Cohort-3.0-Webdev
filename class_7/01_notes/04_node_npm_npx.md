# 🚀 **What is Node.js?**

**Node.js = JavaScript running outside the browser.**

Normally, JavaScript runs **only inside the browser** (Chrome, Firefox, etc.).
Node.js allows JavaScript to run:

* on your computer
* on servers
* to build backend APIs
* to run tools like TypeScript, React, Next.js, Vite, Tailwind, etc.

### ⭐ How does it work?

Node.js uses:

* **Google’s V8 engine** → executes JavaScript fast
* **Libuv** → handles async operations (files, network, timers)

This allows Node to handle many tasks without blocking, making it great for servers.

---

# ⚙️ What can you do with Node?

* Create backend APIs (Express, NestJS, Fastify)
* Build CLI tools
* Use npm packages
* Run build systems (Vite, Webpack, TypeScript compiler)
* Automate scripts

---

# 📦 **Node.js also includes npm**

npm (**Node Package Manager**) comes with Node.
You use npm to install libraries:

```
npm install react
npm install -g typescript
```

---

# 🟩 **Most important Node.js commands**

These commands are run in the terminal after installing Node.

---

# 🔍 **1. Check Node & npm version**

```
node -v
npm -v
```

---

# ▶️ **2. Run a JavaScript file**

```
node file.js
```

Example:

```
node app.js
```

---

# 📥 **3. Initialize a Node project**

Creates `package.json`:

```
npm init
```

or fast mode:

```
npm init -y
```

---

# 📦 **4. Install packages (dependencies)**

### Install locally (project only)

```
npm install express
```

### Install globally (system-wide)

```
npm install -g typescript
```

---

# 🔄 **5. Update packages**

```
npm update
```

---

# 🗑️ **6. Remove a package**

```
npm uninstall express
```

---

# ▶️ **7. Run scripts from package.json**

In `package.json` you may have:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Run:

```
npm start
npm run dev
```

---

# 📁 **8. View installed packages**

```
npm list
npm list -g
```

---

# 🔧 **9. Clear npm cache**

```
npm cache clean --force
```

---

# 🌍 **10. Install npx and run tools without installing**

npx is included with npm.

Example (run TypeScript compiler without installing):

```
npx tsc
```

Example (create-react-app):

```
npx create-react-app myapp
```

---

# 🧰 Summary Table

| Purpose            | Command                         |
| ------------------ | ------------------------------- |
| Check version      | `node -v`, `npm -v`             |
| Run JS file        | `node app.js`                   |
| Create project     | `npm init -y`                   |
| Install dependency | `npm install package`           |
| Install globally   | `npm install -g package`        |
| Uninstall          | `npm uninstall package`         |
| Run script         | `npm start`, `npm run <script>` |
| Show installed     | `npm list`, `npm list -g`       |

---
---
---


# 🟩 **1. Node.js — JavaScript Runtime**

### ✅ What is Node?

Node = A **runtime environment** that allows JavaScript to run outside the browser.

### 🧠 Internal Behavior (How Node works)

Node has:

1. **V8 Engine →** Executes JavaScript fast.
2. **Event Loop →** Handles async tasks (files, network, timers).
3. **Libuv →** Provides thread pool, non-blocking I/O.
4. **C++ Bindings →** Allow JS to talk to the operating system.

So when you write:

```js
console.log("Hello")
```

Node uses V8 to execute it.

When you write:

```js
fs.readFile("file.txt", () => {})
```

`fs` uses **libuv + threadpool** to read the file.

---

# 🟦 **2. npm — Node Package Manager**

### 🎯 What is npm?

npm = A tool that:

* installs third party packages
* manages versions
* creates `node_modules/`
* updates and removes libraries
* manages `package.json`

npm is installed automatically when you install Node.

---

# ⚙️ Internal Behavior of npm

### 📌 When you run:

```
npm install express
```

This happens internally:

1. **npm reads package.json**
2. Finds version of `express` from npm registry
3. Downloads the package as `.tgz` tarball
4. Extracts it inside `node_modules/express`
5. Writes dependency info in `package-lock.json`
6. Makes sure every dependency version is exact

### 📁 Files npm creates

| File                | Purpose                |
| ------------------- | ---------------------- |
| `node_modules/`     | All installed packages |
| `package.json`      | Project configuration  |
| `package-lock.json` | Exact dependency tree  |

### ⚠️ Important

npm does *not* run JavaScript files directly—that’s Node’s job.

---

# 🟨 **3. npx — Node Package Executor**

### 🎯 What is npx?

npx = A tool that **runs packages without installing them globally**.

Example:

```
npx create-react-app myapp
```

You don’t install `create-react-app`.
npx downloads it temporarily → executes it → deletes after.

---

# ⚙️ Internal Behavior of npx

When you run:

```
npx tsc
```

npx does this:

1. Checks if `tsc` exists in local `node_modules/.bin/`
2. If yes → runs that local version
3. If not → downloads package temporarily
4. Executes it
5. Deletes temporary files

So **npx always prioritizes local project packages**.

---

# 🧩 **How Node, npm, npx work together at project level**

Let’s assume we have a project:

```
my-project/
  package.json
  node_modules/
  src/
```

### 🟢 **Node**

* runs your app (`node index.js`)
* loads JS files
* executes them

### 🔵 **npm**

* installs dependencies to `node_modules`
* updates them
* removes them
* manages local vs global installs

### 🟡 **npx**

* runs tools from `node_modules/.bin/`
* or downloads+executes tools one-time

---

# 🧠 Example: Running TypeScript in a Project

### Install TypeScript locally:

```
npm install typescript --save-dev
```

Now this exists:

```
node_modules/.bin/tsc
```

### If you run:

```
npx tsc
```

npx finds and executes the local `tsc`.

### If you run:

```
npm run build
```

And "build" is:

```json
"scripts": {
  "build": "tsc"
}
```

npm runs the TypeScript compiler **from local node_modules**.

---

# 🔍 **Difference between Node vs npm vs npx**

| Feature                       | Node       | npm                  | npx              |
| ----------------------------- | ---------- | -------------------- | ---------------- |
| What is it                    | JS runtime | package manager      | package executor |
| Executes JS                   | ✔️         | ❌                    | ❌                |
| Installs packages             | ❌          | ✔️                   | ❌                |
| Runs project scripts          | ❌          | ✔️                   | ✔️ (indirectly)  |
| Runs binary from node_modules | ❌          | ✔️ (through scripts) | ✔️               |
| Runs packages without install | ❌          | ❌                    | ✔️               |

---

# 🧠 In short

* **Node** runs JavaScript
* **npm** installs and manages packages
* **npx** *executes* packages (without global install)