# ✅ **Why Not Only NoSQL?**

Many beginners start with **MongoDB** because:

* It’s **schema-less**
* Fast to get started
* Easy to store JSON-like structures
* No need for migrations

But this flexibility becomes a **problem** as the app grows.

---

# 🔍 **What does “schemaless” mean?**

A NoSQL document database (like MongoDB) allows:

* Document A → `{ name: "Nihar", age: 19 }`
* Document B → `{ username: "nihar", isVerified: true, hobbies: [...] }`

Both are inside **the same collection**.

### 📌 Key idea:

**NoSQL collections do not enforce structure at the DB-level.**

So:

* Keys can be different
* Types can be different
* Shape of data can change any time

---

# ❌ **Problems With Schemaless Systems**

### 1. **Inconsistent database**

Different documents have different fields, types, formats.

This causes:

* Bugs
* Confusion
* Broken UI responses

### 2. **Runtime errors**

Example:

```js
user.age.toFixed(2)
```

If one user uses `age: "19"` instead of `19`, your backend will crash.

### 3. **No enforced constraints**

SQL enforces:

* UNIQUE
* NOT NULL
* FOREIGN KEYS
* RELATIONSHIPS
* CHECK constraints

MongoDB does not enforce these unless you manually code everything.

### 4. **Too much freedom**

Bad data can easily get inserted.

Why?

👉 Because Mongoose’s schema is **NOT the database schema**.

MongoDB doesn’t know Mongoose exists.

### Example mistake:

Even with a Mongoose schema, I can run:

```js
db.users.insertOne({ name: 123, invalid: true })
```

MongoDB allows it because **it doesn’t enforce your backend schema**.

---

# ⭐ Upsides of NoSQL

* Move very fast in early development
* Flexible structure
* Perfect for prototyping
* Easy schema changes
* Great for massive scale apps (feeds, logs, chats)

**This is why startups love NoSQL for MVPs.**

---

# 🔥 Why SQL?

SQL databases are the opposite of NoSQL:

### ✔ Enforced Schema (DB-level strictness)

Example SQL table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) UNIQUE
);
```

SQL will **reject** invalid data:

```sql
INSERT INTO users (name, age, email)
VALUES ('Nihar', 'abc', 'a@b.com');
```

Result: ❌ Error. Wrong type.

SQL enforces:

* schema
* types
* constraints
* relationships

At the **database** level — not in your Node.js code.

---

# 🧱 **Why SQL is preferred for growing apps**

It forces you to:

1. **Define a strict schema**
2. **Insert data that matches the schema**
3. **Migrate schema safely when the app evolves**
4. **Run reliable queries and maintain consistency**

This prevents the “silent data corruption” problem that NoSQL faces.

---

# 🔧 4 Components of Using an SQL Database (correct)

You wrote the right idea — here is a cleaner version:

### 1. **Running the database**

Start the actual DB server:

* PostgreSQL
* MySQL
* MariaDB

### 2. **Connecting with a client**

Using:

* Prisma
* Knex
* pg (Postgres library)
* mysql2

These let you talk to the DB from Node.js.

### 3. **Define schema (tables + columns)**

SQL forces you to define tables with:

* column names
* data types
* constraints
* rules

### 4. **Run queries**

To:

* Insert data
* Update data
* Delete data
* Join data
* Query data efficiently

---

# 🎯 **Summary in 4 bullets**

* **NoSQL** = fast, flexible, scalable → but risky because no strict schema at DB-level
* **SQL** = strict schema, reliability, transactions → perfect for long-term apps
* **Mongoose** gives schema at **application level**, not **DB level**
* **SQL forces correctness** before bad data enters your system
