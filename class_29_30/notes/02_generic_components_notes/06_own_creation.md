# ✅ **Your Goal**

Create a generic `<Button />` component that supports:

* Variants (default, outline, ghost, destructive, etc.)
* Sizes (sm, md, lg)
* Icons
* Disabled state
* Loading state
* Tailwind styling
* Forwarding refs
* Accessible HTML button behavior
* Can also render as a link or any other tag

This is **exactly** how shadcn’s button works.

---

# 🛣️ **THE EXACT PATH (Beginner → Senior)**

## **STEP 1 → Create the button folder**

```
src/components/ui/button.tsx
```

---

## **STEP 2 → Create variant maps**

Variants allow:

```ts
<Button variant="default" size="lg">
<Button variant="outline">
<Button variant="ghost">
```

Here’s the simplest working version:

```tsx
// src/components/ui/button.tsx

import React from "react";
import clsx from "clsx";

// 1. Define variants
const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 hover:bg-gray-100",
  ghost: "hover:bg-gray-100",
};

const buttonSizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-lg",
};
```

---

## **STEP 3 → Create the Button component**

Use `forwardRef` so your button still works inside forms, dialogs, etc.

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "rounded-md font-medium transition-all disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

---

## **STEP 4 → Use It**

```tsx
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="p-6">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="lg">Large Button</Button>
      <Button isLoading>Saving...</Button>
    </div>
  );
}

export default App;
```

---

# 🎉 **Congratulations**

You’ve now created:

✔ Variant-based button
✔ Size-based button
✔ Loading state
✔ Custom class merging
✔ ForwardRef support
✔ TypeScript support
✔ Tailwind styling

This is **already 40–50% of what shadcn does**, but in a simpler form.

---

# 🧠 **STEP 5 → Level up (When you want)**

Add more professional features:

### 1. **Add `asChild` support** (render button as `<a>`, `<Link>`, etc.)

Using Radix Slot:

```tsx
import { Slot } from "@radix-ui/react-slot";
```

### 2. **Add icon support**

```tsx
{leftIcon && <Icon className="mr-2" />}
{children}
{rightIcon && <Icon className="ml-2" />}
```

### 3. **Polish accessibility**

ARIA attributes
Keyboard navigation
Focus ring

### 4. **Add animation**

Use Framer Motion.

### 5. **Add variant generator**

Use `cva()` (class-variance-authority) same as shadcn.

---

# 🏁 **FINAL ANSWER**

If you want to *try* building your own generic button:

### ✔ Follow the exact path above

### ✔ Start simple (variant + size + loading)

### ✔ Learn how UI components are made

### ✔ Later compare with shadcn’s button

### ✔ Use shadcn/ui in real projects (less bugs, more features)