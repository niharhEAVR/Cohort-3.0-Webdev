# 🧠 **What does this feature mean?**

A **shareable link** means:

* Your user has “content” stored in your system.
* Sometimes they want to **share it publicly** with friends, other devices, or anyone.
* When they toggle `"share": true`, your backend will:

  * Generate a **unique public link**
  * Save that link in the database
  * Anyone with the link can view the content **without authentication**

Exactly like:

* Notion public pages
* Google Drive "anyone with link"
* Dropbox share links

---

# 🧪 Example flow

## **Client sends:**

```
POST /api/v1/brain/share
{
  "share": true
}
```

## **Backend returns:**

```
{
  "link": "https://yourapp.com/share/abc123xyz"
}
```

## **User can now open that link and see their shared content**.

---

# 🛠 How to implement this feature in your backend (Step-by-step)

## **Step 1: Add share fields to your User or Content schema**

### Option A) Each user shares their *full brain*

Add fields in User:

```ts
shareLink: { type: String, default: null },
isShared: { type: Boolean, default: false },
```

### Option B) Each content item is shareable

Add into content schema:

```ts
shareLink: { type: String, default: null },
isShared: { type: Boolean, default: false }
```

Both are correct — depends on your app idea.

---

# **Step 2: Create unique shareable URL**

You can generate random ids using:

* `crypto.randomUUID()`
* or Nano ID
* or shortid

Example:

```ts
import crypto from "crypto";

const shareId = crypto.randomUUID();
```

Share URL:

```ts
const link = `https://yourapp.com/share/${shareId}`;
```

---

# **Step 3: Save it in DB**

Example route:

```ts
router.post("/brain/share", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { share } = req.body;

    if (share !== true) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const shareId = crypto.randomUUID();
    const link = `https://yourapp.com/share/${shareId}`;

    await userModel.findByIdAndUpdate(userId, {
        shareLink: link,
        isShared: true
    });

    res.json({ link });
});
```

---

# **Step 4: Create a public route to view the shared brain**

```ts
router.get("/share/:shareId", async (req, res) => {
    const shareId = req.params.shareId;

    const user = await userModel.findOne({ shareLink: `https://yourapp.com/share/${shareId}` });

    if (!user || !user.isShared) {
        return res.status(404).json({ message: "Link not found" });
    }

    const brainData = await contentModel.find({ userId: user._id });

    res.json({ brain: brainData });
});
```

---

# 🧠 Summary (Simple English)

| What user wants           | What backend does                                |
| ------------------------- | ------------------------------------------------ |
| “Make my brain shareable” | Generate a unique URL and save it                |
| “Give me the link”        | Return it in response                            |
| Someone opens the link    | Show the user’s shared content (no login needed) |
