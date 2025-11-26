```jsx
<div className="h-500 w-500 border border-black border-solid"></div>
```

# ❌ **Problem: `h-500` and `w-500` do NOT exist in Tailwind**

Tailwind does **not** allow arbitrary numbers in classes like:

```
h-500
w-500
```

These classes are **not part of Tailwind’s default spacing scale**.

That’s why your box is **not showing** the height/width you expect.

---

# ✅ **Correct Ways to Fix It**

## **✔ Option 1: Use arbitrary values (recommended)**

Tailwind supports arbitrary values inside brackets:

```jsx
<div className="h-[500px] w-[500px] border border-black"></div>
```

This works 100%.

---

## **✔ Option 2: Use Tailwind predefined sizes**

Tailwind has predefined sizes like:

```
h-96    → 24rem (384px)
h-[32rem] → arbitrary
```

But there is **no h-500 or w-500**.

So if you want exactly 500px, just use brackets.

---

## **✔ Option 3: Add custom classes in `tailwind.config.js`**

If you want to define your own custom utility:

```js
theme: {
  extend: {
    spacing: {
      500: "500px",
    },
  },
}
```

Then you can use:

```jsx
<div className="h-500 w-500"></div>
```

But this is optional.

---

# ⭐ **Conclusion**

❌ `h-500` does NOT exist in Tailwind
✔ Use `h-[500px]` instead
✔ Or add your own custom spacing
