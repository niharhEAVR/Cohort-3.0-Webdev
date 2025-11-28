# 🟦 **Part 1 — Internal Working of npm (Node Package Manager)**

npm is basically made of **3 big systems**:

1. **npm CLI** → the commands you type
2. **npm Registry** → the online database containing all packages
3. **npm Local Project System** → `node_modules`, `package.json`, lock files

Let’s break these down internally.

---

# 🔧 **1. npm CLI Internal Workflow**

When you run a command like:

```
npm install express
```

npm internally performs the following steps:

---

## 🔍 **Step 1 — Read the project structure**

npm checks:

* Is there a `package.json`?
* Is there a `node_modules/`?
* Is there a `package-lock.json`?

It loads these files into memory.

---

## 🔎 **Step 2 — Resolve the dependency version**

npm looks at:

* your `package.json`
* semver rules (`^`, `~`, `>=`, etc.)
* your registry (by default: [https://registry.npmjs.org](https://registry.npmjs.org))

npm asks the registry:

```
give me express@latest version metadata
```

The registry responds with a JSON containing:

* all versions
* dependencies of each version
* tarball download URL

---

## 📦 **Step 3 — Download the package tarball**

Every npm package is stored as a `.tgz` (tarball).
For example:

```
https://registry.npmjs.org/express/-/express-4.19.2.tgz
```

npm downloads this tarball into your cache folder:

```
~/.npm/_cacache/
```

And **extracts it**.

---

## ⚙️ **Step 4 — Build dependency tree**

npm now processes the **dependencies of your dependency**.

Example:

* express → body-parser → debug → ms → …

npm builds a full **dependency graph**.

This is the main job of npm.

---

## 📁 **Step 5 — Create folder structure**

npm creates this pattern:

```
node_modules/
    express/
    body-parser/
    debug/
```

Each package has:

* its own `package.json`
* its own source files
* its own dependencies (nested or hoisted)

---

## 🔌 **Step 6 — Binary linking (important)**

If a package provides a CLI tool, like:

```
"bin": { "vite": "bin/vite.js" }
```

npm creates:

```
node_modules/.bin/vite
```

This file executes the tool.

---

## 🔐 **Step 7 — Update lock file**

Writes exact versions:

* no caret
* no range
* exact resolved versions

Example from package-lock.json:

```json
"express": {
  "version": "4.19.2",
  "resolved": "https://registry.npmjs.org/express/-/express-4.19.2.tgz",
  "integrity": "sha512-xxxx"
}
```

This ensures **consistent installs**.

---

## 🧹 **Step 8 — Post-install scripts (optional)**

Some packages run scripts:

* Next.js builds
* node-gyp compiles native modules
* Prisma generates clients

These run **after installation**.

---

# 📌 **Internal Summary of npm**

npm does:

1. Version resolution
2. Dependency graph building
3. Downloading tarballs
4. Extracting packages
5. Creating `node_modules` structure
6. Linking CLI binaries
7. Updating lock files

npm **does not execute packages**.
It only **installs** and **manages** them.

---

# 🟨 **Part 2 — Internal Working of npx (Node Package Executor)**

npx = “run a package without installing globally.”

Internally, npx works like a smart runner.

---

# 🔄 **npx Internal Steps (Very Important)**

When you run:

```
npx create-react-app myapp
```

This happens:

---

## 🟡 **Step 1 — Check local node_modules/.bin**

npx first checks:

```
./node_modules/.bin/create-react-app
```

* If found → use **local** version
* If not → continue

This avoids version conflicts.

---

## 🟡 **Step 2 — Check global packages**

Next:

```
/usr/local/bin/create-react-app
```

If installed globally ↓
npx uses the global version.

---

## 🟡 **Step 3 — If not found → download temp package**

If local & global NONE found:

```
npx download create-react-app temporarily
```

Downloaded into:

```
/tmp/npx/XXXXX/
```

This is NOT global.

---

## 🟡 **Step 4 — Execute the package**

It runs the binary defined in:

```
package.json → "bin"
```

Example:

```json
"bin": {
  "create-react-app": "index.js"
}
```

npx runs:

```
node /tmp/npx/create-react-app/index.js
```

---

## 🟡 **Step 5 — Delete temporary directory**

After the command finishes, npx **cleans up**.

Nothing remains in your project.

---

# 🔍 **Internal Summary of npx**

| Step | What npx does           |
| ---- | ----------------------- |
| 1    | Looks for local binary  |
| 2    | Looks for global binary |
| 3    | Downloads temp package  |
| 4    | Runs it using Node      |
| 5    | Deletes it              |

npx **never installs anything permanently** unless you ask it to.

---

# 🧪 **Example: npx ts-node script.ts**

1. npx checks local `.bin/ts-node`
2. If exists → runs it
3. If not → temporary install
4. Executes → cleans up

This avoids global installations.

---

# 🧠 Final comparison (internals)

| Tool     | Internal Purpose                                     |
| -------- | ---------------------------------------------------- |
| **Node** | Executes JS through V8 + Event Loop                  |
| **npm**  | Installs & manages packages, builds dependency graph |
| **npx**  | Executes packages (local → global → temporary)       |
