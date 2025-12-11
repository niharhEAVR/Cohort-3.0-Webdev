# 🟦 1. **What is `pg`?**

`pg` (node-postgres) is the **official PostgreSQL driver for Node.js**.

It allows your backend to:

* connect to PostgreSQL
* execute SQL queries
* insert / update / delete data
* handle connection pooling
* receive results from database

In simple terms:

**pg = bridge between Node.js and your PostgreSQL database.**

---

# 🟦 2. **How `pg` Works Internally (simple)**

When your backend uses `pg`:

1. It opens a connection to PostgreSQL.
2. It sends SQL queries as strings.
3. PostgreSQL executes them.
4. It returns results back to your code.

Example:

```ts
const result = await pool.query("SELECT * FROM users");
```

* `"SELECT * FROM users"` → sent to Postgres
* Postgres returns the rows
* `result.rows` contains actual data

---

# 🟦 3. **Two Main Features in pg**

## ✔️ **A. Client**

Direct connection to the database.

Usage:

```ts
const client = new Client();
await client.connect();
```

Problems:

* connects every time
* slow
* not good for production

👉 Only use **Client** for scripts.

---

## ✔️ **B. Pool (Recommended)**

Pool = multiple reusable connections.

### Why use Pool?

✔ Faster
✔ Safe for production
✔ Handles many users
✔ Prevents overload

You create one pool for entire backend.

Example:

```ts
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```

Then reuse `pool` everywhere.

---

# 🟦 4. **How to Use pg to Do CRUD**

We will do real examples using the `users` table you created.

---

## 🟩 **A. INSERT (Create)**

### SQL:

```sql
INSERT INTO users (username, email, password)
VALUES ($1, $2, $3)
RETURNING *;
```

### Backend:

```ts
const createUser = async (username, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};
```

✔ `$1, $2, $3` = placeholders
✔ Prevents SQL injection
✔ `RETURNING *` returns new row

---

## 🟩 **B. SELECT (Read)**

### Example: Get all users

```ts
const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
```

---

### Example: Get user by email

```ts
const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};
```

---

## 🟩 **C. UPDATE**

### SQL:

```sql
UPDATE users SET username = $1 WHERE id = $2 RETURNING *;
```

### Backend:

```ts
const updateUsername = async (id, newName) => {
  const result = await pool.query(
    "UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
    [newName, id]
  );
  return result.rows[0];
};
```

⚠️ Always use **WHERE**, else all rows update.

---

## 🟩 **D. DELETE**

### SQL:

```sql
DELETE FROM users WHERE id = $1 RETURNING *;
```

### Backend:

```ts
const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
```

---

# 🟦 5. Best Folder Structure for pg Backend

```
backend/
  |-- db/
  |     |-- index.js        (pool connection)
  |
  |-- services/
  |     |-- user.service.js (CRUD using pool)
  |
  |-- routes/
  |     |-- user.route.js
  |
  |-- app.js
  |-- server.js
```

## `db/index.js`

```ts
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

## `services/user.service.js`

CRUD functions here.

---

# 🟦 6. Common Mistakes Beginners Make

### ❌ Using string concatenation

```ts
"SELECT * FROM users WHERE email = '" + email + "'"
```

Very dangerous → SQL injection risk.

### ✔️ Correct:

```ts
"SELECT * FROM users WHERE email = $1"
```

---

### ❌ Creating a new Pool for every request

Wrong:

```ts
app.get("/", () => {
  const pool = new Pool();
});
```

Correct:
Create only ONCE at startup.

---

### ❌ Not using RETURNING

If you insert or update, always do:

```
RETURNING *
```

So you get the updated row.

---

# 🟩 Final Summary (Easy to Remember)

### **pg = library that lets backend talk to PostgreSQL.**

Use:

* `Pool` → stable connection
* `pool.query()` → run SQL

CRUD:

* INSERT → add user
* SELECT → get data
* UPDATE → modify user
* DELETE → remove user

You now fully understand the pg basics.