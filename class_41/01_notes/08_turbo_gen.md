## 📌 What “Generating code” is

This feature lets you **automatically create new files, packages, or components** inside your monorepo using built-in or custom templates — instead of manually copying and pasting things.
It’s like a **scaffold maker** for your repo structure. ([Turborepo][1])

---

## 📦 Why this was added recently

In a monorepo you often need to:

* create a new app
* create a new package like `@repo/ui` or `@repo/utils`
* create lots of component files with boilerplate
* maintain consistent folder structure and settings

Before, you had to manually:

* make the folder
* create `package.json` with correct fields
* copy-tsconfig / lint / build files
* update workspace config

Now Turborepo adds **commands to automate that**, saving tons of manual work. ([Turborepo][1])

---

## 🚀 What this feature lets you do

### ✅ 1. Create a **new workspace** (app or package)

Instead of manually making directories and files:

```bash
turbo gen workspace
```

This will:
✔ create a new app/package folder
✔ add a basic `package.json`
✔ update TypeScript / lint configs
✔ wire it into your monorepo structure

You can even copy from an existing template:

```bash
turbo gen workspace --copy <local-or-github-path>
```

This clones a working example as a starting point. ([Turborepo][1])

---

## 🤖 2. Custom code generators

In addition to built-in options, you can write your **own generators**:

* Use a config file (e.g., in `turbo/generators`)
* Ask for input (like component name)
* Automatically generate code, files, tests, routes, docs, etc.

It uses **Plop** under the hood, but you don’t have to install Plop manually — Turborepo handles it. ([Turborepo][2])

Example use case:

```bash
turbo gen my-component
```

Takes a prompt, then creates:

```
packages/ui/src/components/MyComponent/
   MyComponent.tsx
   index.ts
   test file
```

With correct imports and boilerplate already filled in.

---

## 🧠 How it fits into Turborepo

In a monorepo you want:

✔ consistent structure
✔ repeatable patterns
✔ no boilerplate mistakes
✔ fewer manual steps

“Generating code” is just another tool that helps you **speed up and standardize development**. ([Turborepo][1])

Think of it like:

> ➕ Clickable scaffolding for your repo

---

## 🎯 Real examples

### ➤ **New UI package**

Without generator:

* create folder
* make `package.json`
* create tsconfig
* set exports
* update workspaces
* write initial files

With generator:

```bash
turbo gen workspace --type package --name ui
```

Automates all of that.

---

### ➤ **New Route or Component**

You could define a generator like:

```
plop.setGenerator("route", {
  prompts: ["Route name"],
  actions: [
    create route file,
    create test file,
    update index,
  ]
})
```

Then run:

```bash
turbo gen route
```

to create everything in one step. ([Turborepo][2])

---

## 🧩 Summary (simple!)

🛠️ *Generating code*
= Turborepo feature to automate creation of:

✔ new apps
✔ new packages
✔ new components
✔ any structured code you define

It saves you from manual copying + mistakes and enforces consistency across the repo. ([Turborepo][1])


[1]: https://turborepo.com/docs/guides/generating-code?utm_source=chatgpt.com "Generating code"
[2]: https://turborepo.dev/docs/guides/generating-code "Generating code"