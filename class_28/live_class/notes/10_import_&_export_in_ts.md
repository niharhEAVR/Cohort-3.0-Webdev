# ✅ 1. **Named Exports**

These export *many things* from a file.

```ts
// file: math.ts
export const add = (a: number, b: number) => a + b;
export const sub = (a: number, b: number) => a - b;
export const PI = 3.14;
```

### Import them:

```ts
// file: app.ts
import { add, sub, PI } from "./math";
```

✔ Name must match exactly
✔ Can export multiple things

---

# ✅ 2. **Default Export**

A file can have **only ONE default export**.

```ts
// file: helper.ts
export default function greet(name: string) {
  console.log("Hello " + name);
}
```

### Import default:

```ts
import greet from "./helper";
```

Notice:

* No `{ }`
* Name can be **anything** (default export is unnamed)

```ts
import something from "./helper"; // works, but not recommended
```

---

# 🔥 Difference Between Named vs Default

| Feature       | Named Export              | Default Export         |
| ------------- | ------------------------- | ---------------------- |
| Import syntax | `import { x }`            | `import x`             |
| Rename?       | Yes → `import { x as y }` | Yes → `import y`       |
| Quantity      | Many allowed              | Only one per file      |
| Autocomplete  | Best                      | Less strict            |
| Error-proof   | Strict                    | Flexible but less safe |

---

# ✅ 3. Exporting Types & Interfaces

Types can also be exported:

```ts
export interface User {
  name: string;
  age: number;
}

export type ApiResponse<T> = {
  data: T;
};
```

Importing:

```ts
import { User, ApiResponse } from "./types";
```

---

# ✅ 4. Exporting Everything at Once

```ts
export { add, sub, PI };
```

Or:

```ts
export { add as sum };
```

---

# ✅ 5. Importing With Renaming

```ts
import { add as sum } from "./math";

sum(5, 10);
```

---

# ✅ 6. Re-exporting (Barrel Files)

Useful to clean folder structure.

### file: utils/math.ts

```ts
export function add() {}
export function sub() {}
```

### file: utils/string.ts

```ts
export function upper() {}
```

### file: utils/index.ts

```ts
export * from "./math";
export * from "./string";
```

Now import from ONE place:

```ts
import { add, sub, upper } from "./utils";
```

This is called a **barrel file**.

---

# ✅ 7. Mixed Exports

You can combine:

```ts
export const x = 10;

export default function foo() {}
```

Importing:

```ts
import foo, { x } from "./file";
```

---

# ⭐ ⭐ STOP — MOST COMMON CONFUSION

### ❌ Wrong:

```ts
export default const x = 10; // ERROR!
```

### ✔ Correct:

```ts
const x = 10;
export default x;
```

---

# 🔥 8. Modules in TypeScript Compilation

After compiling:

* TypeScript converts imports/exports to JavaScript ES modules.
* If targeting older JS (like ES5), TS may convert them into CommonJS (`require`/`module.exports`) — depending on `tsconfig.json`.

Example output:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
```

This is normal.

---

# 🎯 9. When To Use What?

### Use **named exports** when:

✔ More than one thing to export
✔ Building libraries
✔ You want strictness + autocomplete
✔ Cleaner imports

### Use **default export** when:

✔ The file has one main purpose
✔ Example: React components

```ts
export default function Navbar() {}
```

---

# 🧠 10. Real Example — React Component

```ts
// Button.tsx
export default function Button() {}
export const size = 10;
```

Import:

```ts
import Button, { size } from "./Button";
```

---

# 🎉 Final Summary

| Feature    | Named Export            | Default Export                   |
| ---------- | ----------------------- | -------------------------------- |
| Syntax     | `export const x`        | `export default x`               |
| Import     | `import { x }`          | `import x`                       |
| Quantity   | Many                    | One file = one default           |
| Strictness | High                    | Low                              |
| Ideal For  | Utils, types, libraries | Components, single main function |