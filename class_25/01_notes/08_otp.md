```jsx
import { useState } from "react"
import { useRef } from "react"

export const Otp = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()

    return <div className="flex justify-center items-center font-bold">
        <SubOtpBox reference={ref1} onDone={() => {
            ref2.current.focus()
        }} onBack ={()=>{
            ref1.current.focus()
        }}/>
        <SubOtpBox reference={ref2} onDone={() => {
            ref3.current.focus()
        }} onBack ={()=>{
            ref2.current.focus()
        }}/>
        <SubOtpBox reference={ref3} onDone={() => {
            ref4.current.focus()
        }} onBack ={()=>{
            ref3.current.focus()
        }}/>
        <SubOtpBox reference={ref4} onDone={() => {
        }}/>

    </div>
}


function SubOtpBox({
    reference,
    onDone, 
    onBack
}) {

    const [value, setValue] = useState("")

    return <div>
        <input value={value} ref={reference} onKeyUp={(e)=>{
            if (e.key == "Backspace") {
                onBack()
            }
        }} onChange={(e) => {
            const val = e.target.value
            if (val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val == "9") {
                setValue(val)
                onDone()
            }
        }} type="text" className="m-1 w-[40px] h-[50px] rounded-xl bg-slate-400 outline-none px-4 text-black" />
    </div>
}
```


# ✅ **Full Explanation**

# 🔹 **Parent Component: `Otp`**

```js
const ref1 = useRef()
const ref2 = useRef()
const ref3 = useRef()
const ref4 = useRef()
```

* You create **4 refs**, each for one OTP box.
* A ref gives direct access to the `<input>` DOM element.
* You will use `.focus()` to move between boxes.

---

### Rendering 4 OTP boxes

```jsx
<SubOtpBox reference={ref1} onDone={() => { ref2.current.focus() }} onBack ={()=>{ ref1.current.focus() }}/>
```

* When user enters a number → `onDone()` → next box gets focus
* When user presses backspace → `onBack()` → previous box gets focus

You do this for all 4 OTP boxes.

---

# 🔹 **Child Component: `SubOtpBox`**

```js
const [value, setValue] = useState("")
```

State to hold the single digit.

---

### Input JSX

```jsx
<input
  value={value}
  ref={reference}
  onKeyUp={(e) => {
    if (e.key == "Backspace") {
      onBack()
    }
  }}
  onChange={(e) => {
    const val = e.target.value
    if (
      val == "1" || val == "2" || val == "3" || val == "4" ||
      val == "5" || val == "6" || val == "7" || val == "8" ||
      val == "9"
    ) {
      setValue(val)
      onDone()
    }
  }}
  type="text"
  className="m-1 w-[40px] h-[50px] rounded-xl bg-slate-400 outline-none px-4 text-black"
/>
```

## 🔹 What happens?

### **When typing**

* `onChange` runs.
* You check if the value is a valid digit.
* If valid:

  * `setValue(val)`
  * Call `onDone()` → focus next ref

### **When pressing backspace**

* `onKeyUp` runs.
* If key = "Backspace":

  * Call `onBack()` → focus previous ref.

---

# 🟥 **PROBLEMS IN YOUR CODE (IMPORTANT!)**

## ❌ Problem 1: You are not allowing "0"

Your check ignores `"0"`.

Solution (better):

```js
if (/^[0-9]$/.test(val)) {
```

---

## ❌ Problem 2: Backspace moves focus **without clearing the value**

When you press back:

* It moves to previous box
* But the current box's value remains (not cleared)

Fix:

```js
if (e.key === "Backspace") {
    setValue("")
    onBack()
}
```

---

## ❌ Problem 3: onBack() of ref2, ref3, ref4 is incorrect

Example:

```js
<SubOtpBox reference={ref2} onDone={() => { ref3.current.focus() }}
onBack ={()=>{ ref2.current.focus() }} />
```

This means:

* When pressing backspace in box 2 → it focuses B0X 2 again
* It DOES NOT go to box 1
  ➡️ This is a logic bug.

Correct:

```js
onBack={() => ref1.current.focus()}
```

Same for others:

* Box 3 → go to box 2
* Box 4 → go to box 3

---

## ❌ Problem 4: User can paste multiple digits into input

You are not preventing multi-character values.

Fix:

```js
if (val.length > 1) return
```

---

# ✅ **COMPLETE FIXED OTP COMPONENT (4-digit)**

```jsx
import { useRef, useState } from "react";

export const Otp = () => {
    const refs = [useRef(), useRef(), useRef(), useRef()];

    return (
        <div className="flex justify-center items-center font-bold">
            {refs.map((ref, index) => (
                <SubOtpBox
                    key={index}
                    reference={ref}
                    onDone={() => {
                        if (index < refs.length - 1) {
                            refs[index + 1].current.focus();
                        }
                    }}
                    onBack={() => {
                        if (index > 0) {
                            refs[index - 1].current.focus();
                        }
                    }}
                />
            ))}
        </div>
    );
};

function SubOtpBox({ reference, onDone, onBack }) {
    const [value, setValue] = useState("");

    return (
        <input
            ref={reference}
            value={value}
            maxLength={1}
            onKeyUp={(e) => {
                if (e.key === "Backspace" && value === "") {
                    onBack();
                }
            }}
            onChange={(e) => {
                const val = e.target.value;

                if (/^[0-9]$/.test(val)) {
                    setValue(val);
                    onDone();
                } else {
                    setValue(""); // block alphabets, symbols
                }
            }}
            className="m-1 w-[40px] h-[50px] rounded-xl bg-slate-400 outline-none text-center text-lg text-black"
            type="text"
        />
    );
}
```

---

# ⭐ **What improvements I applied**

### ✔ **1. Scalable – no need to manually create 4 refs**

Used:

```js
const refs = [useRef(), useRef(), useRef(), useRef()];
```

### ✔ **2. Correct Focus Logic**

Forward focus:

```js
refs[index + 1].current.focus();
```

Backward focus:

```js
refs[index - 1].current.focus();
```

### ✔ **3. Allows digits 0–9**

With regex:

```js
/^[0-9]$/.test(val)
```

### ✔ **4. Allows only one character**

`maxLength={1}`

### ✔ **5. When backspace pressed, moves left only if box is empty**

Better UX.

### ✔ **6. Prevents alphabets and special characters**

If user types `"a"`:

```js
setValue("");
```


---
---
---


### 1. **`onDone`**

```javascript
onDone={() => {
    if (index < refs.length - 1) {
        refs[index + 1].current.focus();
    }
}}
```

* This is called **after a user enters a valid digit** in the current input box.
* `index < refs.length - 1` ensures **you are not on the last input box**.

**Why the check?**

* If you didn’t check, `refs[index + 1]` could be `undefined` on the last box.
* Focusing `undefined` would throw an error.

✅ So this safely moves the cursor to the **next input** only if it exists.

---

### 2. **`onBack`**

```javascript
onBack={() => {
    if (index > 0) {
        refs[index - 1].current.focus();
    }
}}
```

* This is called **when the user presses Backspace** on an empty input box.
* `index > 0` ensures **you are not on the first input box**.

**Why the check?**

* If you are on the first input, there is no "previous input" to go back to.
* Without this check, `refs[index - 1]` would be `undefined`, causing an error.

✅ So this safely moves the cursor to the **previous input** only if it exists.

---

### Summary:

| Function | Purpose                                     | Why check `index`?                    |
| -------- | ------------------------------------------- | ------------------------------------- |
| `onDone` | Move focus to next box after typing a digit | Avoid error when already on last box  |
| `onBack` | Move focus to previous box on Backspace     | Avoid error when already on first box |

---

In short, **these checks prevent errors and keep the focus navigation safe** when the user types or deletes.

---
---
---

### Setup

* We have **4 input boxes**: `[Box0, Box1, Box2, Box3]`
* Each box has a `ref` in `refs[0..3]`
* You type digits one by one, and backspace if needed.

---

### Step 1: Typing first digit

* Cursor is in **Box0**.
* User types `5`.

Code in `SubOtpBox` triggers:

```javascript
onChange(e):
  val = "5"
  /^[0-9]$/.test(val) -> true
  setValue("5")
  onDone() -> refs[0+1].current.focus() // Box1
```

* `index = 0`
* Check: `0 < 3` ✅ true
* Focus moves to **Box1** ✅

---

### Step 2: Typing second digit

* Cursor is in **Box1**
* User types `2`.

`onChange` triggers:

```javascript
setValue("2")
onDone() -> refs[1+1].current.focus() // Box2
```

* `index = 1`
* Check: `1 < 3` ✅ true
* Focus moves to **Box2** ✅

---

### Step 3: Typing fourth digit (last box)

* Cursor is in **Box3**
* User types `9`.

`onChange` triggers:

```javascript
setValue("9")
onDone() -> refs[3+1].current.focus() // ????
```

* `index = 3`
* Check: `3 < 3` ❌ false
* Focus **does NOT move** (correct, because there is no next box)

✅ This prevents a runtime error from trying to focus `refs[4]` which doesn’t exist.

---

### Step 4: Pressing backspace on Box3

* Box3 has value `"9"`
* User presses Backspace → value becomes `""`

`onKeyUp` triggers:

```javascript
if e.key === "Backspace" && value === "":
    onBack() -> refs[3-1].current.focus() // Box2
```

* `index = 3`
* Check: `3 > 0` ✅ true
* Focus moves to **Box2** ✅

---

### Step 5: Pressing backspace on Box0

* Cursor is in **Box0**
* User presses Backspace → value is already `""`

`onKeyUp` triggers:

```javascript
if e.key === "Backspace" && value === "":
    onBack() -> refs[0-1].current.focus() // ????
```

* `index = 0`
* Check: `0 > 0` ❌ false
* Focus **does NOT move** ✅

✅ Prevents error from trying to focus `refs[-1]` which does not exist.

---

### ✅ Summary of Dry Run

1. `onDone` moves forward **only if there’s a next box** (`index < refs.length - 1`)
2. `onBack` moves backward **only if there’s a previous box** (`index > 0`)
3. Without these checks, focusing would fail at **first box Backspace** or **last box typing**.
