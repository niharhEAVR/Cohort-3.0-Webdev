The issue here lies in **Mongoose’s default behavior of pluralizing model names** to form the corresponding collection names. Let’s break this down:

---

### Why Does This Happen?
When you define the model:

```javascript
const adminModel = mongoose.model("admin", adminSchema);
```

Mongoose does the following:
1. **Model Name**: `"admin"` is the name of the model.
2. **Pluralization**: By default, Mongoose pluralizes the model name to determine the collection name.  
   - `"admin"` becomes **`admins`** (notice the plural form).
3. **Automatic Collection Creation**: When you save a document using `adminModel`, Mongoose creates the collection **`admins`** in the database if it doesn’t already exist.

This explains why you see a collection named **`admins`** instead of your expected **`admin`**.

---

### How to Fix This?

If you want the collection to be named **`admin`**, you need to **explicitly specify the collection name**. You can do this by passing a third argument to `mongoose.model()`:

```javascript
const adminModel = mongoose.model("admin", adminSchema, "admin");
```

- The **third parameter** (`"admin"`) explicitly tells Mongoose to use the collection named `"admin"` without pluralizing it.

---

### Corrected Code:
Here’s the fixed version of your code:

```javascript
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const adminModel = mongoose.model("admin", adminSchema, "admin"); // Explicit collection name

module.exports = adminModel;
```

---

### Key Points:
1. **Default Behavior**:
   - Mongoose automatically pluralizes model names to determine collection names.
   - `"admin"` becomes `"admins"` unless explicitly told otherwise.

2. **Explicit Naming**:
   - Pass the desired collection name as the third argument to `mongoose.model()` to prevent pluralization or unwanted naming.

3. **Prevent Automatic Creation**:
   - Always ensure the desired collection name matches explicitly to avoid confusion during runtime.

---

This should resolve the issue, ensuring that the collection remains named **`admin`** as intended. Let me know if you need further clarification! 😊