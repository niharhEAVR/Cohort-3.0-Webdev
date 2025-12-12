# ✅ **WHAT YOU CAN CREATE WITH PRISMA**

Prisma allows you to create **6 main things** inside the `schema.prisma` file:

---

## **1️⃣ Models**

These become **database tables**.

```prisma
model User {
  id   Int    @id @default(autoincrement())
  name String
}
```

---

## **2️⃣ Fields**

These become **columns** inside tables.

```prisma
email   String  @unique
age     Int?
created DateTime @default(now())
```

---

## **3️⃣ Relations**

You can create relationships between models:

### 1-to-many

```prisma
posts Post[]
```

### Many-to-one

```prisma
user   User   @relation(fields: [userId], references: [id])
userId Int
```

### Many-to-many

```prisma
tags Tag[]
```

### One-to-one

```prisma
profile Profile?
```

---

## **4️⃣ Enums**

Defines fixed set of values.

```prisma
enum Role {
  USER
  ADMIN
}
```

---

## **5️⃣ Attributes (Field + Model attributes)**

You can create **rules and constraints**.

### Field attributes

* `@id`
* `@default()`
* `@unique`
* `@updatedAt`
* `@relation`
* `@map()`

Example:

```prisma
id Int @id @default(autoincrement())
email String @unique
```

### Model attributes

* `@@id([])` composite primary key
* `@@index([])`
* `@@unique([])`
* `@@map()` rename table

Example:

```prisma
@@unique([email, phone])
```

---

## **6️⃣ Generators**

You create "outputs" such as Prisma Client.

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

---

## Bonus (Still part of schema)

## **7️⃣ Datasources**

Creates configuration for your database.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

# 🎯 FINAL SUMMARY

**With Prisma you can create:**

1. **Models** (tables)
2. **Fields** (columns)
3. **Relations**
4. **Enums**
5. **Field attributes + Model attributes**
6. **Generators**
7. **Datasources** (DB config)

---
---
---
---

# ✅ **1. MODELS (Database Tables)**

A **model** is the Prisma way of defining a **table** in your database.

Every model becomes a SQL table when you run migrations.

### Example:

```prisma
model User {
  id    Int
  name  String
  email String
}
```

This creates a SQL table like:

| id | name | email |
| -- | ---- | ----- |

### You can create:

* User model
* Post model
* Comment model
* Product model
* Order model

Anything representing a real-world entity.

---

# ✅ **2. FIELDS (Columns inside a table)**

Fields are the actual **columns** inside a model/table.

Each field has:

* A **name**
* A **type**
* Optional **attributes**

### Example fields:

```prisma
name    String
age     Int?
verified Boolean @default(false)
createdAt DateTime @default(now())
```

### Field types include:

* `String`
* `Int`
* `Float`
* `Boolean`
* `BigInt`
* `DateTime`
* `Json`
* `Bytes`
* `Decimal`
* `Enum`
* References to other models (`User`, `Post`)

### Required vs Optional

```prisma
age  Int      // required
age  Int?     // optional (can be NULL)
```

### Default values

```prisma
createdAt DateTime @default(now())
views     Int      @default(0)
```

---

# ✅ **3. RELATIONS (Connections between models)**

Relations define relationships between tables.

Prisma supports:

* **1-to-1**
* **1-to-many**
* **many-to-many**

---

## 🔹 **1-to-many relation**

One user → many posts.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]         // 1-to-many
}

model Post {
  id     Int   @id @default(autoincrement())
  title  String
  user   User  @relation(fields: [userId], references: [id])
  userId Int
}
```

---

## 🔹 **1-to-1 relation**

One user → one profile.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int   @id @default(autoincrement())
  bio    String
  user   User  @relation(fields: [userId], references: [id])
  userId Int   @unique
}
```

---

## 🔹 **Many-to-many relation**

A post can have many tags, and a tag can belong to many posts.

In Prisma (implicit m2m):

```prisma
model Post {
  id   Int   @id @default(autoincrement())
  title String
  tags Tag[]
}

model Tag {
  id   Int   @id @default(autoincrement())
  name String
  posts Post[]
}
```

Prisma auto-creates a pivot table.

---

# ✅ **4. ENUMS (Fixed allowed values)**

Enums define **limited choices**, similar to TypeScript or SQL ENUMs.

### Example:

```prisma
enum Role {
  USER
  ADMIN
  MODERATOR
}
```

Use in a model:

```prisma
model User {
  id   Int  @id @default(autoincrement())
  role Role @default(USER)
}
```

Enums are perfect for:

* User roles
* Order status
* Category types
* Payment method types

---

# ✅ **5. FIELD ATTRIBUTES & MODEL ATTRIBUTES**

These add **rules**, **constraints**, **indexes**, and **database behavior**.

---

# 🔥 **FIELD ATTRIBUTES** (Apply to individual fields)

Examples:

### `@id` → Primary key

```prisma
id Int @id
```

### `@default()` → Default values

```prisma
isActive Boolean @default(true)
```

### `@unique` → Unique column

```prisma
email String @unique
```

### `@updatedAt` → Auto-update timestamp

```prisma
updatedAt DateTime @updatedAt
```

### `@relation`

Used for relations:

```prisma
user   User @relation(fields: [userId], references: [id])
userId Int
```

### `@map()` → Rename column in SQL

```prisma
firstName String @map("first_name")
```

---

# 🔥 **MODEL ATTRIBUTES** (Apply to entire model/table)

Examples:

### `@@map()` → Rename table in SQL

```prisma
@@map("users_table")
```

### `@@unique()` → Multi-field unique constraint

```prisma
@@unique([email, phone])
```

### `@@index()` → Add database index

```prisma
@@index([createdAt])
```

### `@@id()` → Composite primary key

```prisma
@@id([userId, productId])
```

---

# 🎯 **SUPER CLEAN SUMMARY**

You can create **these five** things in Prisma:

### ✅ **1. Models**

Tables.

### ✅ **2. Fields**

Columns.

### ✅ **3. Relations**

Links between tables (1-1, 1-many, many-many).

### ✅ **4. Enums**

Fixed allowed values.

### ✅ **5. Attributes**

Rules that modify fields or models:

* Field attributes → `@id`, `@unique`, `@default`, `@relation`, `@map`, `@updatedAt`
* Model attributes → `@@unique`, `@@index`, `@@id`, `@@map`