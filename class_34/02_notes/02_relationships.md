# 🧩 **What is a Relationship in SQL?**

A **relationship** is a *connection between two tables* using **primary keys (PK)** and **foreign keys (FK)**.

### Every relationship happens between:

* **Primary Key (PK)** → a unique identifier (id)
* **Foreign Key (FK)** → a reference to a PK from another table

---

# ⭐ The 3 Main Types of Relationships

## 1️⃣ **One-to-One (1:1)**

**One row in Table A** ↔ **One row in Table B**

### Example:

A user has **one** profile.

```
users table
---------------
id | username | email
1  | john     | john@mail.com

profiles table
------------------------
id | user_id | bio | avatar
1  |    1    | Dev | pic.jpg
```

* `profiles.user_id` is a **foreign key** referencing `users.id`.
* Each user has exactly one profile.

### When to use?

Rare. Used when splitting sensitive/large data into a second table.

---

## 2️⃣ **One-to-Many (1:N) — MOST COMMON**

**One row in Table A** ↔ **Many rows in Table B**

Example:
A user can create **many** posts.

### 📌 Tables

```
users
-----------------
id | username
1  | jack

posts
-------------------------------
id | user_id | title
1  |    1    | Hello
2  |    1    | My second post
```

* One **user** → many **posts**
* `posts.user_id` is FK referencing `users.id`

### Query example — get all posts of a user

```sql
SELECT * FROM posts WHERE user_id = 1;
```

---

## 3️⃣ **Many-to-Many (M:N)**

**Many rows in A** ↔ **Many rows in B**

Example:
A student can take many courses.
A course has many students.
This requires a **junction table**.

### 📌 Tables

```
students
--------------------
id | name
1  | Rahul

courses
---------------------
id | title
1  | Math
2  | Physics
```

### Junction table (bridge table)

```
student_courses
---------------------
student_id | course_id
1          |    1
1          |    2
```

### Interpretation

* Rahul is enrolled in Math and Physics.
* Math course can have 100s of students.
* Physics also can have many students.

---

# 🧠 Why do relationships exist?

To avoid **duplication** of data.

### Without relationships (bad design)

```
posts
-----------------------------------------
id | username | email | title | password
```

You are repeating the same user info for every post → BAD.

### With relationships (good design)

```
users(id, username, email, password)
posts(id, user_id, title)
```

Data is clean, reusable, and consistent.

---

# 🛠 Real SQL Syntax

## Create One-to-Many relationship

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL
);
```

---

## Create Many-to-Many relationship

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT
);

CREATE TABLE student_courses (
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

---

# 📚 Joins (How we fetch related data)

### Example — Get posts with the username:

```sql
SELECT posts.title, users.username
FROM posts
JOIN users ON posts.user_id = users.id;
```

Output:

```
title       | username
-------------------------
Hello       | jack
My second   | jack
```

---

# 🎯 Final Summary

| Relationship | Meaning             | Example             |
| ------------ | ------------------- | ------------------- |
| **1:1**      | One row ↔ One row   | user ↔ user_profile |
| **1:N**      | One row ↔ Many rows | user ↔ posts        |
| **M:N**      | Many ↔ Many         | students ↔ courses  |

Everything in relational DB design is built around PK + FK combinations.

---
---
---





# 💡 `FOREIGN KEY(user_id) REFERENCES users(id)`

### This means:

* `posts.user_id` **must match** a `users.id`
* You cannot insert a post for a user that does NOT exist
  → PostgreSQL will throw an error
* This enforces **relationship integrity**

Example:

```
users
---------
id | username
1  | john
```

Now:

```
INSERT INTO posts (user_id, title)
VALUES (999, 'Hello');
```

❌ ERROR — Because user 999 doesn’t exist.

---

# 🔥 Now the important part:

# **`ON DELETE CASCADE`**

This tells PostgreSQL:

👉 “If the parent row is deleted, **automatically delete all the child rows related to it**.”

### In simple words:

**Deleting a user automatically deletes all their posts.**

---

# 🧠 Why does this matter?

### Without `ON DELETE CASCADE`:

If you try to delete the user:

```sql
DELETE FROM users WHERE id = 1;
```

❌ Error:

```
ERROR: update or delete on table "users"
violates foreign key constraint on table "posts"
```

Because posts still reference that user.

---

# ✔️ With `ON DELETE CASCADE`

Same delete:

```sql
DELETE FROM users WHERE id = 1;
```

PostgreSQL automatically does:

```
DELETE FROM posts WHERE user_id = 1;
```

Result:

✔ User deleted
✔ All their posts deleted too
✔ No orphan rows remain

---

# 📝 Visual Example

### users table

```
id | username
1  | john
```

### posts table

```
id | user_id | title
1  |   1     | post A
2  |   1     | post B
```

Now:

```sql
DELETE FROM users WHERE id = 1;
```

Everything disappears:

```
posts → rows (1, 2) are automatically deleted  
users → row 1 deleted
```

---

# 🎯 Why is this useful?

### 1. Keeps your database clean

No leftover "orphan" posts for deleted users.

### 2. Makes your code simpler

You don’t need to manually delete posts first.

### 3. Avoids errors

Otherwise PostgreSQL would block deletion.

---

# 🛠 Full SQL Example

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title TEXT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

---

# 🚀 Summary (Super Simple)

| Part                   | Meaning                                       |
| ---------------------- | --------------------------------------------- |
| `FOREIGN KEY(user_id)` | This column points to users.id                |
| `REFERENCES users(id)` | Enforces relationship                         |
| `ON DELETE CASCADE`    | If parent is deleted → child rows auto-delete |



---
---
---



# 🧩 **What Is a Foreign Key?**

A **foreign key** is a column in one table that **points to the primary key** in another table.

### In super simple words:

> A **foreign key connects one table to another**.

---

# 🧠 Why do we need a foreign key?

Because in SQL, **tables are separate**, but real-world data is connected.

Example:

* A **user** creates many **posts**
* Posts belong to a user
* SQL needs to know **which post belongs to which user**

We connect them using a **foreign key**:

```
posts.user_id → users.id
```

---

# 🔍 Foreign Key = Reference

Foreign key **references** another table.

### Example:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT
);
```

Here:

* `user_id` is the **foreign key**
* It references `users.id` (primary key)

---

# ⚙️ What does a foreign key DO?

A foreign key **enforces rules** to keep data correct.

### 🔒 Rule 1 — You can't insert invalid references

This is illegal:

```sql
INSERT INTO posts(user_id, title)
VALUES(999, 'Hello');
```

❌ Because user 999 does NOT exist.

The foreign key blocks it.

---

### 🔒 Rule 2 — You can't delete a parent if children depend on it

Example:

* User id=1 exists
* That user has posts

Without CASCADE:

```sql
DELETE FROM users WHERE id = 1;
```

❌ ERROR — because posts still reference user 1.

---

### 🪄 With CASCADE

If you define:

```sql
FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
```

Then deleting user 1 also deletes all their posts.

✔ No orphan data
✔ Database remains clean

---

# 🧱 Visual Example

### users table

```
id | name
1  | Alice
2  | Bob
```

### posts table

```
id | user_id | title
1  |   1     | Post A   ← belongs to Alice
2  |   1     | Post B   ← belongs to Alice
3  |   2     | Post C   ← belongs to Bob
```

Where does the link come from?

👉 `posts.user_id` (FK)
👉 points to `users.id` (PK)

---

# 🎯 Summary (Very Simple)

* **Primary key (PK)** = uniquely identifies a row (e.g., `users.id`)
* **Foreign key (FK)** = connects tables by pointing to a primary key
* Ensures **data consistency**
* Prevents **invalid or orphan data**
* Optional: `ON DELETE CASCADE` makes child rows auto-delete