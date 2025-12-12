# ⭐ 1. **Pagination**

Pagination = fetching limited results at a time.

---

## ✅ **SQL way**

SQL uses:

* **LIMIT** → how many rows to return
* **OFFSET** → skip how many rows

### Example

```sql
SELECT * FROM posts
ORDER BY id
LIMIT 10 OFFSET 20;
```

Meaning:
Skip first 20 rows, return next 10 posts.

---

## ✅ **Prisma way**

Prisma uses:

* `take` → LIMIT
* `skip` → OFFSET
* `orderBy` → ORDER BY

### Prisma Equivalent

```ts
await prisma.post.findMany({
  skip: 20,   // OFFSET
  take: 10,   // LIMIT
  orderBy: { id: "asc" }
});
```

---

## ❗ Important difference

In SQL, `ORDER BY` is optional.

In Prisma, **you must always provide `orderBy`** when doing pagination.

Why?

Because without ordering, pagination becomes unpredictable.

---

## 📌 More examples

### Get first 5 users

```ts
prisma.user.findMany({
  take: 5
});
```

### Get next 5 users

```ts
prisma.user.findMany({
  skip: 5,
  take: 5
});
```

### SQL equivalent

```sql
SELECT * FROM users LIMIT 5 OFFSET 5;
```

---

# ⭐ 2. **Joins**

In SQL, `JOIN` connects two tables:

```sql
SELECT *
FROM users
JOIN posts ON posts.userId = users.id;
```

But Prisma **never uses JOIN syntax**.

Prisma uses **relations defined in the schema**.

---

## 🧠 What does Prisma do internally?

You define relations in your model:

```prisma
model User {
  id    Int   @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id     Int   @id @default(autoincrement())
  title  String
  userId Int
  user   User  @relation(fields: [userId], references: [id])
}
```

From this, Prisma understands how to "JOIN" without you writing SQL.

---

## ⭐ Example 1: Fetch user with posts

### SQL

```sql
SELECT *
FROM users u
JOIN posts p ON p.userId = u.id
WHERE u.id = 1;
```

### Prisma

```ts
prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});
```

✨ Output is nested JSON:

```json
{
  "id": 1,
  "name": "Nihar",
  "posts": [
    { "id": 10, "title": "Hello" },
    { "id": 11, "title": "World" }
  ]
}
```

---

## ⭐ Example 2: Fetch a post with its user

### SQL

```sql
SELECT p.*, u.*
FROM posts p
JOIN users u ON p.userId = u.id
WHERE p.id = 10;
```

### Prisma

```ts
prisma.post.findUnique({
  where: { id: 10 },
  include: { user: true }
});
```

---

## ⭐ Example 3: Select specific data from both tables

### SQL

```sql
SELECT p.title, u.name
FROM posts p
JOIN users u ON p.userId = u.id;
```

### Prisma

```ts
prisma.post.findMany({
  select: {
    title: true,
    user: {
      select: {
        name: true
      }
    }
  }
});
```

---

# ⭐ 3. **Relations**

Relations describe how tables connect.

Prisma relations depend on **foreign keys**, same as SQL.

---

## ⭐ SQL Relation Example

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  userId INTEGER REFERENCES users(id)
);
```

This defines a **one-to-many** relation:

* One user → many posts
* Each post → belongs to a user

---

## ⭐ Prisma Relation Example

```prisma
model User {
  id    Int   @id @default(autoincrement())
  posts Post[]
}

model Post {
  id     Int   @id @default(autoincrement())
  userId Int
  user   User  @relation(fields: [userId], references: [id])
}
```

### What Prisma adds?

* Easy navigation: `user.posts` & `post.user`
* You can fetch related data with `include`
* You can create related records using `create`

---

# ⭐ Relation Types

## 1️⃣ **One-to-Many (most common)**

Example:

* User → Posts
* Category → Products

### Prisma Query Examples

#### Create user with posts

(SQL: multiple INSERT statements)

```ts
prisma.user.create({
  data: {
    name: "Nihar",
    posts: {
      create: [
        { title: "Post 1" },
        { title: "Post 2" }
      ]
    }
  }
});
```

#### Fetch posts of a user

(SQL: SELECT + JOIN)

```ts
prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});
```

---

## 2️⃣ **One-to-One**

Example:
User → Profile
User has only 1 profile.

### Prisma schema

```prisma
model User {
  id      Int     @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id      Int  @id @default(autoincrement())
  userId  Int  @unique
  user    User @relation(fields: [userId], references: [id])
}
```

### Fetch user with profile

```ts
prisma.user.findUnique({
  where: { id: 1 },
  include: { profile: true }
});
```

---

## 3️⃣ **Many-to-Many**

Example:

* Students ↔ Courses
* Tags ↔ Posts

Prisma creates a hidden join table.

### Prisma schema

```prisma
model Post {
  id   Int    @id @default(autoincrement())
  tags Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

### Fetch post with tags

```ts
prisma.post.findUnique({
  where: { id: 1 },
  include: { tags: true }
});
```

---

# 🎯 Summary (very important)

| Concept    | SQL                | Prisma Client                       |
| ---------- | ------------------ | ----------------------------------- |
| Pagination | LIMIT, OFFSET      | take, skip, orderBy                 |
| Joins      | JOIN tableA tableB | include: { related: true }          |
| Relations  | FOREIGN KEY        | Fields & `@relation()` define links |
