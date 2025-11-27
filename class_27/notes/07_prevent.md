**TypeScript will not generate a `.js` file if there’s a compilation error**.

But there’s an option to override this behavior.

---

# **Option: `noEmitOnError`**

* This is the compiler option that controls whether JS files are emitted on errors.
* Default:

```json
"noEmitOnError": true
```

* Meaning: **do NOT emit JS if there are TypeScript errors**
* If you want JS to be emitted **even if there are errors**, set it to `false`.

---

### **Example tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "noEmitOnError": false
  },
  "include": ["src/**/*"]
}
```

---

### **Behavior**

Suppose you have `app.ts`:

```ts
let age: number = "hello"; // ❌ Type error
console.log(age);
```

* With `"noEmitOnError": true` → **no app.js is generated**
* With `"noEmitOnError": false` → **JS file is still generated** (with the code as-is)

---

# ⚠️ **Why usually we keep `noEmitOnError = true`**

* Avoids running broken code in production
* Forces developers to fix errors before deploying
* Keeps builds safe and predictable

---

# ✅ **TL;DR**

* **Default behavior**: JS is NOT generated on TypeScript errors
* **Option to change**: `noEmitOnError: false`
* **Use case**: Only if you want partial JS output despite errors (rare, usually for debugging)
