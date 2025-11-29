# ✅ **1. What is `Exclude`?**

`Exclude` allows you to **remove certain types from a union**.

Syntax:

```ts
Exclude<UnionType, ExcludedMembers>
```

* `UnionType` → the original union of types
* `ExcludedMembers` → the type(s) you want to remove
* Returns → a **new union** without the excluded types

---

# ⭐ **2. Super Simple Example**

```ts
type T = "a" | "b" | "c";
type Result = Exclude<T, "a">;
```

### Step by step:

```
T = "a" | "b" | "c"
Exclude "a"
Result = "b" | "c"
```

✅ So `Result` = `"b" | "c"`

---

# ⭐ **3. Exclude multiple types**

```ts
type T = "a" | "b" | "c" | "d";
type Result = Exclude<T, "a" | "c">;
```

```
Result = "b" | "d"
```

---

# ⭐ **4. Exclude non-literal types**

```ts
type MyType = string | number | boolean;
type Result = Exclude<MyType, string | boolean>;
```

```
Result = number
```

---

# ⭐ **5. How it works under the hood**

`Exclude<T, U>` is basically a **conditional type**:

```ts
type Exclude<T, U> = T extends U ? never : T;
```

Which is exactly like what we learned earlier with `never`.

* For each type in `T`:

  * If it is assignable to `U` → remove it (`never`)
  * Else → keep it

Example:

```ts
type T = string | number | boolean;
type U = string | boolean;

Exclude<T, U> 
= (string extends string | boolean ? never : string)
  | (number extends string | boolean ? never : number)
  | (boolean extends string | boolean ? never : boolean)

= never | number | never
= number
```

---

# ⭐ **6. Real-world Example**

```ts
type Roles = "admin" | "user" | "guest";

type AllowedRoles = Exclude<Roles, "guest">;
// AllowedRoles = "admin" | "user"
```

* We just **removed the "guest" role** from the union.
* Useful for **filtering types** in API or permissions.

---

# 🔥 **Summary**

| Feature        | Description                        |
| -------------- | ---------------------------------- |
| Type           | Built-in TypeScript utility        |
| Purpose        | Remove certain types from a union  |
| Syntax         | `Exclude<Union, TypeToRemove>`     |
| Return         | New union without the removed type |
| Under the hood | `T extends U ? never : T`          |
