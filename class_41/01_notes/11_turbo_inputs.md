## 1️⃣ What `inputs` really means (simple)

**Inputs = “things that affect the result of the task”**

Turbo watches inputs to answer **one question**:

> “Did anything that matters change?”

If **no** → cache hit
If **yes** → rebuild

That’s it.

---

## 2️⃣ `$TURBO_DEFAULT$` is just a shortcut

```json
"inputs": ["$TURBO_DEFAULT$"]
```

This expands to **common important files**, like:

* source files
* `package.json`
* `tsconfig.json`
* lockfile

It’s a **safe default**, not a rule.

---

## 3️⃣ You can fully customize `inputs`

### ✅ You can ADD more

```json
"inputs": [
  "$TURBO_DEFAULT$",
  ".env*",
  "tailwind.config.ts",
  "postcss.config.js"
]
```

### ✅ You can REMOVE `$TURBO_DEFAULT$`

```json
"inputs": [
  "src/**",
  ".env.production"
]
```

### ✅ You can COMPLETELY REPLACE it

```json
"inputs": [
  "schema.prisma",
  "migrations/**"
]
```

Turbo doesn’t care — it just hashes whatever you list.

---

## 4️⃣ Why real projects NEED custom inputs

In real-world apps, builds depend on **more than code**.

### Examples 👇

#### 🎨 Frontend apps

* `tailwind.config.ts`
* `postcss.config.js`
* `next.config.js`
* `.env.local`

If these change → build must rerun.

---

#### 🗄️ Backend apps

* `prisma/schema.prisma`
* `drizzle.config.ts`
* `migrations/**`
* `.env`

---

#### 🧱 UI libraries

* `tokens.json`
* `theme.ts`
* `styles.css`

---

#### 🚀 DevOps / infra

* Dockerfile
* `.github/workflows/*`
* `infra/**`

---

## 5️⃣ What happens if you forget an input (important!)

This is the **only real danger** ⚠️

If:

* a file affects output
* but is NOT in `inputs`

Then Turbo might say:

> “Nothing changed” → cache hit

…but the output is actually **wrong**.

So rule of thumb:

> **If it affects the result, it must be an input**

---

## 6️⃣ Outputs work the same way

Just like inputs, you can customize outputs:

```json
"outputs": [
  "dist/**",
  ".next/**",
  "build/**"
]
```

Turbo will:

* save exactly these
* restore exactly these

---

## 7️⃣ Realistic example (frontend)

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": [
    "$TURBO_DEFAULT$",
    "next.config.js",
    "tailwind.config.ts",
    ".env*"
  ],
  "outputs": [".next/**"]
}
```

This is **real production config**.

---

## 8️⃣ Final rule (lock this in 🔐)

* `$TURBO_DEFAULT$` → convenience
* Custom inputs → correctness
* Real projects → **always extend inputs**

---

## One-line summary

> Turbo doesn’t guess
> You tell it **what matters**

And yes — in **real projects**, there are **many more inputs** than the default.
