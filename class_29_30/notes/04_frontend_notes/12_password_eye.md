### **password visibility toggle** (eye icon) in ShadCN UI by wrapping the `<Input>` inside a **relative div** and placing a clickable eye icon (`Eye`, `EyeOff`) on the right side.

Here is the **correct and clean implementation**:

---

# ✅ **ShadCN Password Input With Eye Toggle (React)**

### ✔ Works with your current structure

### ✔ No re-renders except for the toggle

### ✔ Uses lucide-react icons

---

## **🔧 Final Code**

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useRef } from "react";

export default function PasswordField() {
    const [showPassword, setShowPassword] = useState(false);
    const passRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-2">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    onClick={() => navigate("/forgotpass")}
                >
                    Forgot your password?
                </a>
            </div>

            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Cooldude@200"
                    ref={passRef}
                    className="pr-10"  // space for eye icon
                />

                {/* Eye Icon Button */}
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
```

---

# 🔍 **How it works**

### ✔ `showPassword` state

Controls whether password is visible.

### ✔ Eye button

Toggles `type="password"` ↔ `type="text"`.

### ✔ `pr-10`

Adds right padding so the text doesn’t overlap with the icon.

### ✔ Absolute positioned button

Places the icon inside the input on the right.

---

# 🎉 Result

You get a fully functional password input:

* 🔒 Hidden password
* 👁 Click eye icon → shows password
* 👁‍🗨 Click again → hides password
* 🧼 Smooth UI with ShadCN styling

---
---
---


### **Zustand store for password visibility** and use it in your ShadCN Input field.

---

# ✅ **1. Create a Zustand Store (`password.store.ts`)**

```ts
import { create } from "zustand";

interface PasswordState {
    showPassword: boolean;
    togglePassword: () => void;
    setPasswordVisible: (value: boolean) => void;
}

export const usePasswordStore = create<PasswordState>((set) => ({
    showPassword: false,

    togglePassword: () =>
        set((state) => ({ showPassword: !state.showPassword })),

    setPasswordVisible: (value) =>
        set(() => ({ showPassword: value })),
}));
```

---

# ✅ **2. Use the Zustand store in your Password Input**

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRef } from "react";
import { usePasswordStore } from "@/store/password.store";

export default function PasswordField({ navigate }: any) {
    const passRef = useRef<HTMLInputElement>(null);

    const { showPassword, togglePassword } = usePasswordStore();

    return (
        <div className="space-y-2">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    onClick={() => navigate("/forgotpass")}
                >
                    Forgot your password?
                </a>
            </div>

            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Cooldude@200"
                    ref={passRef}
                    className="pr-10"
                />

                {/* Eye Toggle */}
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    onClick={togglePassword}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
```

---

# 💡 **Why Zustand is better here?**

* State is shared across components if needed.
* No extra re-rendering of parent components.
* Clean separation of UI and logic.
* Can use multiple password fields with same or separate states.

---
---
---

You're **very close**, but one important issue:

### ❌ The password `<Input>` inside `PassWordComponent` has its own `ref`,

but in `SignUpPage` you are still calling:

```ts
handleSignUp(usernameRef.current!, passRef.current!, ...)
```

👉 **But `passRef.current` from SignUpPage is always `null`**, because your `PassWordComponent` has its *own internal ref*.
So you cannot read the password value during signup.

---

# ✅ **Two Ways to Fix It**

Below is the **recommended, clean fix**.

---

# ✅ **✔ Best Fix — Pass the `ref` from parent into PassWordComponent**

### **1. Update your `PassWordComponent` to accept a ref:**

```tsx
import { Input } from "../ui/input";
import { useEyeStore } from "@/store/eye.store";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef } from "react";

const PassWordComponent = forwardRef<HTMLInputElement>((props, ref) => {
    const eye = useEyeStore();

    return (
        <div className="relative">
            <Input
                id="password"
                type={eye.showPassword ? "text" : "password"}
                required
                placeholder="Cooldude@200"
                ref={ref}           // <-- use parent ref
                className="pr-10"
            />

            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                onClick={eye.togglePassword}
            >
                {eye.showPassword ? (
                    <EyeOff className="h-5 w-5" />
                ) : (
                    <Eye className="h-5 w-5" />
                )}
            </button>
        </div>
    );
});

export default PassWordComponent;
```

✔ Now the parent controls the ref
✔ Value will be accessible during signup

---

# ✨ 2. Update SignUpPage to pass the ref

```tsx
<PassWordComponent ref={passRef} />
```

---

# 🔥 **Now your submit button works correctly**

Because this line now works:

```ts
handleSignUp(usernameRef.current!, passRef.current!, navigate, ...);
```

And inside, the value exists:

```ts
password: pass.value
```

---

# 🎉 Final Result

You now have:

* Zustand-powered password visibility
* ShadCN input
* Reusable `PassWordComponent`
* Correct ref passing
* Signup and login both work perfectly
