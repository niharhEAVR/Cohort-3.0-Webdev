## 🧩 1. What is a “relationship” in MongoDB?

Even though **MongoDB is NoSQL**, it still allows you to link documents together —
**just like foreign keys in SQL**, but in a more flexible way.

There are two main ways to build relationships:

| Type            | Description                                 | Analogy                |
| --------------- | ------------------------------------------- | ---------------------- |
| **Embedding**   | Store related data inside a single document | like a nested JSON     |
| **Referencing** | Store only the related document’s `_id`     | like a SQL foreign key |

---

## 🧠 Example: Understanding Relationships

Imagine a `User` and a `Todo`.

### 1️⃣ Embedding (one-to-many)

Store the todos *inside* the user document:

```js
{
  name: "Nihar",
  email: "nihar@example.com",
  todos: [
    { todo: "Go gym", done: true },
    { todo: "Learn Docker", done: false }
  ]
}
```

✅ Pros: Fast read, all data in one place
❌ Cons: Can get large, difficult to update single todos

---

### 2️⃣ Referencing (Normalized)

Store todos in a separate collection but link them by `userId`:

```js
User: {
  _id: ObjectId("123"),
  name: "Nihar"
}

Todo: {
  _id: ObjectId("456"),
  userId: ObjectId("123"),
  todo: "Learn AWS"
}
```

✅ Pros: Cleaner structure, easy to scale
❌ Cons: Requires additional queries or `populate()`

---

## ⚙️ 2. Implementing Relationships in Mongoose

Let’s fix and improve your code 👇

### ✅ Correct Mongoose Models with Relations

```js
const mongoose = require("mongoose");

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Todo Schema
const todoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // references the User model
    required: true,
  },
  todo: { type: String, required: true },
  done: { type: Boolean, default: false },
});

// Models
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };
```

---

## 🧩 3. Using the Relationship (with `.populate()`)

When you query todos, you can **populate** the related user info easily:

```js
const todos = await Todo.find().populate("user");
console.log(todos);
```

This replaces the `user` ObjectId with the full user document:

```js
[
  {
    _id: "todo123",
    todo: "Learn Express",
    done: false,
    user: {
      _id: "user123",
      name: "Nihar",
      email: "nihar@example.com"
    }
  }
]
```

---

## ⚙️ 4. Create Todo for a Specific User

Example API logic:

```js
// Create new todo for a user
const user = await User.findOne({ email: "nihar@example.com" });
const todo = await Todo.create({
  user: user._id,
  todo: "Build backend project",
});
```

---

## 🧩 5. Relationship Types You Can Create

| Type             | Example           | Description                |
| ---------------- | ----------------- | -------------------------- |
| **One-to-One**   | User ↔ Profile    | Use `ref` and unique index |
| **One-to-Many**  | User → Todos      | Common in apps             |
| **Many-to-Many** | Student ↔ Courses | Use arrays of ObjectIds    |

Example of **many-to-many**:

```js
const courseSchema = new Schema({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: "User" }]
});
```

---

## ⚡ Quick Summary

| Concept             | Description                              |
| ------------------- | ---------------------------------------- |
| **Embedding**       | Store data inside one document           |
| **Referencing**     | Link documents with `_id`                |
| **ref in Mongoose** | Defines relationship between collections |
| **populate()**      | Fetches referenced data automatically    |
| **ObjectId**        | Used as link between documents           |

---

## 💡 Real-World Analogy

| SQL         | MongoDB (Mongoose)  |
| ----------- | ------------------- |
| Foreign Key | ObjectId with `ref` |
| JOIN        | `.populate()`       |
| Table       | Collection          |
| Row         | Document            |



