# 🧠 **Selector SET: Super Easy Definition**

A selector’s **set** function allows you to:

👉 **write/update atoms through the selector**
👉 treat a selector like a “virtual atom”

You use `set` when:

* You don’t want components to update atoms directly
* You want to run some logic **before** writing to an atom
* You want a "formatted" or "converted" value that works both ways

---

# 🎯 **Think of selector SET like this:**

### ✔ `get` = How to *calculate* the value

### ✔ `set` = How to *update* atoms when someone tries to modify this selector

---

# 🧊 Let’s take the most simple example (temperature converter)

## ❄️ Atom stores temperature in °C

```jsx
const temperatureC = atom({
  key: "tempC",
  default: 0,
});
```

## 🔥 Selector exposes temperature in °F

```jsx
const temperatureF = selector({
  key: "tempF",
  get: ({ get }) => {
    const c = get(temperatureC);
    return (c * 9/5) + 32;        // Convert C → F
  },

  set: ({ set }, newFValue) => {
    set(temperatureC, (newFValue - 32) * 5/9); // F → C
  }
});
```

---

# 🧪 What just happened?

This selector:

* **Reads** °C
* **Shows** °F
* If the user updates °F → selector auto-updates °C

You now have a **bidirectional formula**.

---

# 📌 How it works in the UI

```jsx
function TemperatureInput() {
  const [tempF, setTempF] = useRecoilState(temperatureF);

  return (
    <input
      value={tempF}
      onChange={(e) => setTempF(Number(e.target.value))}
    />
  );
}
```

When user types “212” (boiling point):

1. Component calls `setTempF(212)`
2. Selector’s **set** is triggered
3. Selector converts F → C
4. It updates the atom (temperatureC)
5. Atom update triggers selector **get** again
6. UI updates

---

# 🧠 WHY DO WE NEED SELECTOR SET?

### 1️⃣ **To intercept and modify values before saving them**

Example: Sanitizing user input
→ no spaces, no emojis, no special chars

### 2️⃣ **To update multiple atoms at once**

Example:

* Atom: `firstName`
* Atom: `lastName`

Selector set can update *both*.

### 3️⃣ **To convert formats**

* meters ↔ feet
* USD ↔ INR
* celsius ↔ fahrenheit
* backend format ↔ UI format

### 4️⃣ **To create a single “combined field”**

Example: Store first+last name in two atoms
But frontend deals with a single “fullName” selector.

---

# ⭐ SIMPLE Example: Full Name Selector

## Atoms

```jsx
const firstNameState = atom({
  key: "firstName",
  default: "John",
});

const lastNameState = atom({
  key: "lastName",
  default: "Doe",
});
```

## Selector with get + set

```jsx
const fullNameState = selector({
  key: "fullName",
  get: ({ get }) => {
    return get(firstNameState) + " " + get(lastNameState);
  },

  set: ({ set }, newValue) => {
    const [first, last] = newValue.split(" ");
    set(firstNameState, first);
    set(lastNameState, last);
  },
});
```

Now UI can treat first + last name as **one value**!

---

# 🧠 Ultra-Easy Explanation of Selector SET

> **Selector SET lets you change atoms indirectly using one “virtual state” instead of updating atoms individually.**

OR

> **It’s like writing into a formula and the formula updates the actual atoms.**

---

# 🔥 FINAL SUMMARY (93% of people understand after this)

### ✔ Selector `get` → read

### ✔ Selector `set` → write

### ✔ Components can call `set` on selectors

### ✔ Selector can change:

* 1 atom
* multiple atoms
* filtered data
* formatted data
* converted data

### ✔ Selector SET = “smart setter with logic inside”
