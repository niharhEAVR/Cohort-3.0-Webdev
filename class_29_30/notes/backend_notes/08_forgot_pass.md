# ✅ **What Happens in Real Apps (Instagram, Gmail, etc.)**

When user clicks **Forgot Password**:

### **1. User enters username or email**

Frontend sends:

```json
{ "username": "harkirat" }
```

### **2. Backend checks if user exists**

If user does **not** exist → `"User not found"`
If user exists → goes to next step.

### **3. Backend creates a Reset Token**

Two types of tokens:

#### **A. One-time code (OTP)**

Example: `483920`

#### **B. Secure reset link**

Example:

```
https://yourapp.com/reset-password?token=8f2fe98c89as...
```

### **4. Save the token in database**

Something like:

```
resetToken = "8f29c9asf0asf0..."
resetTokenExpiry = Date.now() + 15 minutes
```

### **5. Send email to the user**

Email contains:

* OTP
  **or**
* Reset link

### **6. User enters OTP or clicks link**

### **7. Backend verifies token**

* Token must exist
* Must match
* Must not be expired

### **8. User sets new password**

Backend hashes the new password → updates DB → clears the token.

---

# 🚀 **Now let's implement this in your project (simple + production ready)**

We will build:

1. `/forgotpass` → generate reset token
2. `/resetpass` → verify token & update new password

---

# ⭐ Step 1 — Schema (validate only username)

```ts
export const usernameOnlySchema = z.object({
  username: z.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
});
```

---

# ⭐ Step 2 — Forgot Password Route

Generate and save reset token.

```ts
import crypto from "crypto";

app.put("/api/v1/forgotpass", async (req: Request, res: Response) => {
    try {
        const parseResult = usernameOnlySchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(411).json({
                message: "Error in inputs",
                errors: parseResult.error.issues
            });
        }

        const { username } = parseResult.data;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        // Generate secure reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

        // Save in database
        await userModel.updateOne(
            { username },
            {
                $set: {
                    resetToken,
                    resetExpiry
                }
            }
        );

        // SEND EMAIL → (fake for now)
        console.log("Reset link:", `https://yourapp.com/reset-password?token=${resetToken}`);

        return res.json({ message: "Password reset link sent to your email" });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
```

---

# ⭐ Step 3 — Reset Password Route

User clicks the link → sends:

```json
{
  "token": "xxxxx",
  "newPassword": "StrongPassword@123"
}
```

Backend verifies token → updates password.

```ts
const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(8)
});

app.put("/api/v1/resetpass", async (req: Request, res: Response) => {
    try {
        const parseResult = resetPasswordSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(411).json({
                message: "Error in inputs",
                errors: parseResult.error.issues
            });
        }

        const { token, newPassword } = parseResult.data;

        const user = await userModel.findOne({
            resetToken: token,
            resetExpiry: { $gt: Date.now() }   // not expired
        });

        if (!user) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        // Hash new password
        const hashed = await bcrypt.hash(newPassword, 10);

        await userModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashed
                },
                $unset: { resetToken: "", resetExpiry: "" } // delete token
            }
        );

        return res.json({ message: "Password updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
```

---

# ⭐ Step 4 — User Model Update

```ts
const UserSchema = new Schema({
  username: String,
  password: String,
  resetToken: String,
  resetExpiry: Number
});
```

---

# 🚀 FINAL RESULT — Your backend now supports:

✓ Forgot password
✓ Reset password
✓ Token system
✓ Zod validation
✓ Secure crypto tokens
✓ Update password safely

---
---
---


> Does my database schema will cause problem?

Short answer: **YES it will cause a problem** unless you **add the new fields** to your schema.

Long answer: let me explain clearly.

---

# ✅ Why it will cause a problem

Right now your schema is:

```ts
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
```

But in forgot-password logic you are doing:

```ts
await userModel.updateOne(
  { username },
  { 
    $set: { 
      resetToken, 
      resetExpiry 
    } 
  }
);
```

### ❌ Problem:

`resetToken` and `resetExpiry` **do not exist in your schema**.

### What happens?

### ✔ Mongoose default behavior:

* Mongoose **will actually store the extra fields** even if they are not in the schema.
* Because `strict` mode defaults to `true`, but **does NOT block** unknown fields on update operations (`updateOne`, `findOneAndUpdate`).

So **technically your code will work**, but:

---

# ❗ BUT IT IS BAD PRACTICE

Because:

* Other developers will not know those fields exist.
* Typescript will not infer these fields.
* Your editor will not autocomplete them.
* Your model becomes confusing.
* Future code may break because schema doesn’t describe actual DB structure.

---

# ✅ Correct Way (add the fields)

Update your schema to:

```ts
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    resetToken: { type: String, default: null },
    resetExpiry: { type: Number, default: null }
});
```

This is **clean, safe, predictable**, and matches actual DB structure.

---

# ❓ Should you worry if you don’t add them?

Yes — because:

* In the future, reading `user.resetToken` in TypeScript will show an error.
* Some Mongoose strict modes may block unknown fields.
* Your database will have fields that contradict your schema.

---

# 🔥 Final Recommendation

Always **add fields** you plan to store:

```ts
resetToken: { type: String },
resetExpiry: { type: Number }
```

This is the safe and industry-standard way.
