To copy text to the clipboard in React, **you don’t need Zustand, shadcn, or any external library** unless you want extra features.
The simplest and recommended method is built-in:

---

# ✅ **1. Use the built-in Clipboard API (no library needed)**

```tsx
const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
```

### Usage:

```tsx
<button onClick={() => handleCopy("Hello World")}>
  Copy Text
</button>
```

---

# ✅ **2. If you want a React hook → use `react-use` library**

```bash
npm install react-use
```

Then:

```tsx
import { useCopyToClipboard } from "react-use";

const Component = () => {
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <button onClick={() => copyToClipboard("Some text!")}>
      Copy
    </button>
  );
};
```

---

# ✅ **3. If you want a prebuilt button → shadcn has NO copy component**,

but they recommend **using the Clipboard API**.

You can build a reusable Copy button:

```tsx
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant="outline" onClick={copy} className="flex items-center gap-2">
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
```

---

# ⭐ Your Question:

**Which library or component to use?**

### → **Best answer:**

✔️ **Use the built-in Clipboard API (`navigator.clipboard`)**
✔️ No rerenders
✔️ Fast
✔️ Works everywhere

### Optional libraries:

* `react-use` (gives a hook)
* `copy-to-clipboard` (fallback for older browsers)
