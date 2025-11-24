# 🧠 **WHAT THIS PROGRAM DOES (SUPER SIMPLE)**

You have:

* **Atom:** `tempF` → stores Fahrenheit
* **Selector:** `tempC` → reads AND writes temperature in Celsius

UI displays both:

```
Temp (Celsius): X
Temp (Fahrenheit): Y
```

You can increase:

* Celsius by 10
* Fahrenheit by 10
* Or reset Celsius

---

# 🧠 **THE CORE IDEA**

### ✔ Fahrenheit is the **REAL stored value**

### ✔ Celsius is a **virtual value** calculated from Fahrenheit

### ✔ When you write Celsius → selector converts it → updates Fahrenheit

This is the purpose of `get` and `set`.

Now let’s break it down.

---

# 🔍 **1. The Atom: tempF**

```js
export const tempF = atom({
    key: "tempF",
    default: 32
});
```

This is your **actual stored temperature**.

### Default:

```
tempF = 32°F
```

This means:

```
tempC = (32 - 32) * 5/9 = 0°C
```

---

# 🔍 **2. The Selector: tempC**

### Selector definition:

```js
export const tempC = selector({
    key: "tempC",

    get: ({ get }) => (((get(tempF) - 32) * 5) / 9),

    set: ({ set }, newValue) =>
        set(
            tempF,
            newValue instanceof DefaultValue ? newValue : ((newValue * 9) / 5) + 32
        )
})
```

## ✔ GET: Convert F → C

When someone **reads** tempC:

```
Celsius = (Fahrenheit - 32) × 5/9
```

### Example:

tempF = 32 → tempC = 0
tempF = 50 → tempC = 10
tempF = 68 → tempC = 20

---

## ✔ SET: Convert C → F

When someone **writes to tempC**:

```
update tempF = (newC * 9/5) + 32
```

This is the MOST IMPORTANT PART.

### Writing to tempC updates tempF

This makes tempC a **“doorway”** for updating Fahrenheit indirectly.

---

# 🔥 LET’S WALK THROUGH THE UI STEP-BY-STEP

---

# STEP 1 — Initial State

```
tempF = 32  (atom)
tempC = 0   (derived)
```

UI shows:

```
Temp (Celsius): 0
Temp (Fahrenheit): 32
```

---

# STEP 2 — You click “Add 10 Celsius”

Button code:

```js
const addTenCelsius = () => setTempC((currentTemp) => currentTemp + 10);
```

### What happens internally?

### 1️⃣ `currentTemp` is the **Celsius** value

= tempC = 0

### 2️⃣ New Celsius = 10

### 3️⃣ Selector SET runs:

```
newF = (10 * 9/5) + 32 = 50°F
```

### 4️⃣ Recoil updates tempF

So now:

```
tempF = 50
tempC = (50 - 32) * 5/9 = 10
```

UI updates:

```
Temp (Celsius): 10
Temp (Fahrenheit): 50
```

---

# STEP 3 — You click “Add 10 Fahrenheit”

Button code:

```js
const addTenFahrenheit = () => setTempF(current => current + 10);
```

### This updates the atom directly:

```
tempF = 50 + 10 = 60
```

Selector GET recalculates tempC:

```
tempC = (60 - 32) * 5/9 = 15.55
```

UI now shows:

```
Temp (Celsius): 15.55
Temp (Fahrenheit): 60
```

---

# STEP 4 — You click RESET (reset Celsius)

Button:

```js
const reset = () => resetTemp();
```

`resetTemp()` sets tempC → DefaultValue
Selector SET sees this:

```
newValue instanceof DefaultValue ⇒ true
→ set tempF(DefaultValue)
```

So tempF resets to its default:

```
tempF = 32
tempC = 0
```

---

# 🧠 **COMPLETE FLOW VISUALIZED (easy table)**

| Action   | Who updates?          | Formula used | Final tempF | Final tempC |
| -------- | --------------------- | ------------ | ----------- | ----------- |
| Start    | tempF                 | default = 32 | 32          | 0           |
| Add 10°C | selector SET          | C → F        | 50          | 10          |
| Add 10°F | atom updates          | direct       | 60          | 15.55       |
| Reset C  | selector SET(Default) | reset        | 32          | 0           |

---

# 🧠 WHY THIS PROGRAM IS IMPORTANT

This example teaches:

### ✔ How selector `get` works

(converting Fahrenheit → Celsius)

### ✔ How selector `set` works

(converting Celsius → Fahrenheit)

### ✔ How a selector becomes a **two-way derived state**

### ✔ How updating a selector can update an atom

### ✔ How UI stays in sync without any manual code

---

# 🏁 SUPER SHORT SUMMARY

* `tempF` = real stored value
* `tempC` = calculated + writable virtual value
* Reading `tempC` calculates from `tempF`
* Writing to `tempC` updates `tempF`
* UI always stays synchronized


---
---
---
---



# ✅ **Recoil Atom + Selector (Line-by-line explanation)**

```js
export const tempF = atom({
    key: "tempF",
    default: 32
})
```

### **1. `export const tempF = atom({...})`**

* We create an atom named `tempF`.
* An **atom = single source of truth** for a piece of state.
* Any component using this atom will re-render when it changes.

### **2. `key: "tempF"`**

* Every atom/selector **must have a unique key**.
* Recoil internally uses this key like an ID to track the state.

### **3. `default: 32`**

* This is the **initial value** of the atom.
* Here temperature in Fahrenheit starts at **32°F**.

---

# ✔️ Now the Selector:

```js
export const tempC = selector({
    key: "tempC",
    get: ({ get }) => (((get(tempF) - 32) * 5) / 9),
    set: ({ set }, newValue) =>
        set(
            tempF,
            newValue instanceof DefaultValue ? newValue : ((newValue * 9) / 5) + 32
        )
})
```

### **1. `export const tempC = selector({...})`**

* A selector is **derived state**.
* It does NOT store its own value.
* It calculates value using other states (atoms or selectors).

### **2. `key: "tempC"`**

* Again, unique key for Recoil’s internal state graph.

---

# 🔍 **Understanding `get`:**

```js
get: ({ get }) => (((get(tempF) - 32) * 5) / 9)
```

### **3. `get: ({ get }) => ...`**

* `get` is a function provided by Recoil.
* You use it to **read another atom/selector** inside this selector.
* Whenever the atom you read changes → selector recalculates.

### **4. `get(tempF)`**

* This **fetches the current value** of `tempF` atom.
* If `tempF = 32`, then `get(tempF)` returns **32**.

### **5. `((get(tempF) - 32) * 5) / 9`**

* This is the Fahrenheit → Celsius formula.
* Selector returns computed Celsius value.

So:

* If `tempF = 32` → `tempC = 0`
* If `tempF = 212` → `tempC = 100`

### **Concept point:**

`tempC` is now **automatically updated** whenever `tempF` changes.

---

# 🔄 Understanding `set`: (Reverse mapping)

```js
set: ({ set }, newValue) =>
    set(
        tempF,
        newValue instanceof DefaultValue ? newValue : ((newValue * 9) / 5) + 32
    )
```

### **6. This part allows writing to the selector**

A selector can be **read-only** OR **read/write**.

You made it read/write because you defined a `set` function.

So now:

* You can update Celsius → and it will update Fahrenheit.

---

### **7. `set: ({ set }, newValue) => ...`**

* `set` allows you to update any atom.
* `newValue` is whatever user assigns to `tempC`.

For example:

```js
setTempC(100)
```

→ `newValue = 100`.

---

### **8. `newValue instanceof DefaultValue ? newValue : ...`**

This is required by Recoil:

* When resetting state using `reset(tempC)`
  Recoil sends a special object: `new DefaultValue()`.
* You need to detect that and forward it to the original atom.

This line simply means:

* If the caller resets `tempC` → reset `tempF` too.

---

### **9. `((newValue * 9) / 5) + 32`**

This is Celsius → Fahrenheit formula.

If user updates Celsius, we convert and update Fahrenheit.

Example:

```js
setTempC(0) 
```

→ updates `tempF` to `32`.

---

### ✔️ Final line:

```js
set(tempF, convertedValue)
```

Meaning:

* Update the original atom (`tempF`).
* Which automatically triggers re-calculations of any selector depending on it.

---

# 🎯 **Final Concept Summary**

### **`tempF`:**

* Actual stored value (source of truth).

### **`tempC` selector:**

* *Getter:* Converts tempF → tempC (F → C)
* *Setter:* Converts tempC → tempF (C → F)

### This creates a **bi-directional synced state**.

If user updates Fahrenheit → Celsius updates automatically.
If user updates Celsius → Fahrenheit updates automatically.
