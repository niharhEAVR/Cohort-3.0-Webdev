# ✅ **Your Prisma Schema**

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
  email    String @unique
  todos    todos[]
}

model todos {
  id     Int     @id @default(autoincrement())
  title  String
  done   Boolean @default(false)
  userId Int
  user   users   @relation(fields: [userId], references: [id])
}
```

Let’s explain everything.

---

# 🟦 **1. Prisma Model = SQL Table**

Each `model` becomes a SQL table.

### So:

| Prisma model | SQL table |
| ------------ | --------- |
| `users`      | `users`   |
| `todos`      | `todos`   |

---

# 🟨 **2. Prisma Field = SQL Column**

Each line inside the model becomes a column in the SQL table.

Example:

```prisma
id Int @id @default(autoincrement())
```

Means:

| Prisma                      | SQL meaning          |
| --------------------------- | -------------------- |
| `Int`                       | INTEGER              |
| `@id`                       | PRIMARY KEY          |
| `@default(autoincrement())` | SERIAL/AUTOINCREMENT |

---

# 🟥 **3. Explain the Users Table**

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
  email    String @unique
  todos    todos[]
}
```

### What this means:

* `id` → primary key, auto-increment
* `username` → text, must be unique (two users cannot have same name)
* `password` → text
* `age` → number
* `email` → must be unique
* `todos` → **relation (one-to-many)**
  This means **one user → many todos**.

---

# 🟩 **4. Explain the Todos Table**

```prisma
model todos {
  id     Int     @id @default(autoincrement())
  title  String
  done   Boolean @default(false)
  userId Int
  user   users   @relation(fields: [userId], references: [id])
}
```

### Meaning:

* `id` → primary key
* `title` → text
* `done` → boolean (default = false)
* `userId` → the foreign key
* `user` → relation that links to `users` table
  `fields: [userId]` = local column
  `references: [id]` = the users.id column

---

# ⭐ **5. Relationship Explained**

### ✔ One User → Many Todos

Called **one-to-many relationship**.

### How?

* In SQL:
  `todos.userId` references `users.id`

* In Prisma:

  * `todos` model contains the foreign key
  * `users` model contains the array `todos[]`

---

# 🛠 **6. What SQL Will Prisma Generate?**

Here is the SQL version Prisma generates when you run:

```
npx prisma migrate dev
```

---

# 📌 **users table in SQL**

```sql
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "age" INT NOT NULL,
  "email" TEXT NOT NULL UNIQUE
);
```

---

# 📌 **todos table in SQL**

```sql
CREATE TABLE "todos" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "done" BOOLEAN NOT NULL DEFAULT false,
  "userId" INT NOT NULL,
  CONSTRAINT "todos_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE
);
```

---

# 📌 **Relationship (Foreign Key) SQL**

Prisma will automatically generate:

```sql
ALTER TABLE "todos"
ADD CONSTRAINT "todos_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users" ("id");
```

This foreign key ensures:

* Cannot create a TODO for a non-existing user
* When user is deleted, you must decide what to do (restrict, cascade etc.)

---

# 🟦 **7. Visual Structure**

### Users Table

| id | username | password    | age | email                                 |
| -- | -------- | ----------- | --- | ------------------------------------- |
| 1  | john     | hashed-pass | 24  | [john@mail.com](mailto:john@mail.com) |

### Todos Table

| id | title        | done  | userId |
| -- | ------------ | ----- | ------ |
| 1  | Buy milk     | false | 1      |
| 2  | Learn Prisma | true  | 1      |

---

# 🟣 **8. How to Query in Prisma**

### Get a user with todos:

```ts
const user = await prisma.users.findUnique({
  where: { id: 1 },
  include: { todos: true },
});
```

### Create a todo:

```ts
await prisma.todos.create({
  data: {
    title: "New task",
    userId: 1,
  },
});
```

---
---
---


# ✅ **Why Prisma makes fields NOT NULL even if you didn’t write `@notNull`**

In Prisma, **nullable vs non-nullable** is decided by **the type itself**, not with `NOT NULL` keyword.

In Prisma:

### ✔ This is NOT nullable:

```prisma
title String
age   Int
done  Boolean
```

### ✔ This *is* nullable:

```prisma
title String?
age   Int?
done  Boolean?
```

The **question mark (`?`)** is the key.

---

# 🟦 **RULE:**

### **If a Prisma field has NO `?` → SQL = NOT NULL**

Example:

```prisma
age Int
```

➡ SQL:

```sql
"age" INTEGER NOT NULL
```

---

# 🟩 **If a field has `?` → SQL = NULL allowed**

Example:

```prisma
age Int?
```

➡ SQL:

```sql
"age" INTEGER
```

(No `NOT NULL` → nullable)

---

# 🔍 Look at your model:

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
  email    String @unique
  todos    todos[]
}
```

All fields are **WITHOUT `?`**.

So Prisma will create:

| Field    | Prisma type | SQL type | Nullable? |
| -------- | ----------- | -------- | --------- |
| id       | Int         | SERIAL   | NOT NULL  |
| username | String      | TEXT     | NOT NULL  |
| password | String      | TEXT     | NOT NULL  |
| age      | Int         | INTEGER  | NOT NULL  |
| email    | String      | TEXT     | NOT NULL  |

Foreign keys also default to NOT NULL:

```prisma
userId Int
```

➡ SQL:

```sql
"userId" INTEGER NOT NULL
```

---

# 🟧 **Your foreign key relationship:**

```prisma
userId Int
user   users @relation(fields: [userId], references: [id])
```

Since `userId` has **no `?`**, the SQL column is:

```sql
"userId" INT NOT NULL
```

Because every TODO **must belong** to a user.

---

# 🟥 **So why doesn’t Prisma require `@notNull`?**

Because Prisma chooses a simpler method:

### **If type has no `?` → field is required.**

This is same behavior as TypeScript:

```ts
let username: string     // required
let email?: string       // optional
```

Prisma copied this idea.

---

# 🟦 **Example: Making password optional**

```prisma
password String?
```

SQL becomes:

```sql
"password" TEXT
```

(Nullable allowed)

---

# ⭐ TL;DR

| Prisma Field | Nullable?      | SQL Output      |
| ------------ | -------------- | --------------- |
| `String`     | ❌ NOT NULL     | `TEXT NOT NULL` |
| `String?`    | ✔ NULL allowed | `TEXT`          |
| `Int`        | ❌ NOT NULL     | `INT NOT NULL`  |
| `Int?`       | ✔ NULL allowed | `INT`           |

---
---
---

# 🧩 **Scenario:**

* You already ran migrations
* Your SQL tables have existing data
* Now you want to add a new column (in Prisma model)
* What happens to old rows?

---

# 🚦 **There are 2 cases**

# ✅ **CASE 1: New column is NULLABLE**

You write in Prisma:

```prisma
middleName String?
```

Prisma generates SQL:

```sql
ALTER TABLE "users" ADD COLUMN "middleName" TEXT;
```

**What happens?**

* Old rows get **NULL** as the default
* No crash
* No issues
* Migration runs smoothly

### Old Data → New Result:

| id | username | email                                 | middleName |
| -- | -------- | ------------------------------------- | ---------- |
| 1  | john     | [john@mail.com](mailto:john@mail.com) | NULL       |
| 2  | sara     | [sara@mail.com](mailto:sara@mail.com) | NULL       |

Everything works fine ✔

---

# ❌ **CASE 2: New column is NOT NULL (required)**

You write:

```prisma
middleName String
```

Prisma needs:

```sql
ALTER TABLE "users" ADD COLUMN "middleName" TEXT NOT NULL;
```

**This is a problem** ⚠️
Because existing rows **do not have a value** for this field.

### PostgreSQL will throw an error:

```
ERROR: column "middleName" contains null values.
```

Migration will **fail**.

---

# 🔥 **So how do you fix it?**

You have 4 options:

---

# 🟩 **OPTION 1: Make it nullable**

```prisma
middleName String?
```

Then migrate.
Afterwards, update old rows manually, then later change it to NOT NULL.

✔ safest
✔ most common
✔ recommended

---

# 🟦 **OPTION 2: Add a default value**

```prisma
middleName String @default("")
```

SQL becomes:

```sql
ALTER TABLE "users"
ADD COLUMN "middleName" TEXT NOT NULL DEFAULT '';
```

Old rows get:

| middleName |
| ---------- |
| ""         |

✔ avoids errors
✔ works for numbers, booleans, strings

Example:

```prisma
age Int @default(0)
isActive Boolean @default(true)
```

---

# 🟨 **OPTION 3: Write a custom migration**

You can manually edit the migration SQL.

Example:

```sql
ALTER TABLE "users"
ADD COLUMN "middleName" TEXT;

UPDATE "users"
SET "middleName" = 'Not Provided';

ALTER TABLE "users"
ALTER COLUMN "middleName" SET NOT NULL;
```

✔ You get full control
✔ Used in production

---

# 🟥 **OPTION 4: Delete all data 🤣**

This works in development only:

```bash
npx prisma migrate reset
```

But DO NOT do this in production.

---

# 📌 **Summary Table**

| Column Type Added            | Old Rows Get     | Migration Works? |
| ---------------------------- | ---------------- | ---------------- |
| `String?`                    | NULL             | ✔ Yes            |
| `String @default("x")`       | "x"              | ✔ Yes            |
| `String` (required)          | ❌                | ❌ Fails          |
| Add required, but custom SQL | Whatever you set | ✔ Yes            |

---

# ⭐ TL;DR

### ✔ Adding **nullable** column → No problem

### ✔ Adding **column with default** → No problem

### ❌ Adding **required field without default** → Migration fails

### ✔ Fix by adding default or making column nullable
