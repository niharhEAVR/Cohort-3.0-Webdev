### A **transaction** in SQL is a way to execute **multiple SQL operations as ONE single unit of work**.

### 🔥 Super simple definition:

> A **transaction** makes sure that either *ALL* the SQL queries succeed
> OR
> *NONE* of them happen.

This protects your data from being left in a broken or half-updated state.

---

# 🧠 Why do we need transactions?

Because sometimes your logic needs **multiple queries** to run together.

Example:

* Bank transfer
* User signup + create profile
* Place order + reduce item stock + create invoice

If *any one* of these steps fail, **everything should rollback**.

---

# 📌 Properties of Transactions (ACID)

Every SQL transaction follows **ACID**:

| Property        | Meaning                                     |
| --------------- | ------------------------------------------- |
| **A**tomicity   | “All-or-nothing” behavior                   |
| **C**onsistency | DB stays valid before and after transaction |
| **I**solation   | Transactions don’t interfere                |
| **D**urability  | Once committed → permanent                  |

---

# 🧾 SQL Transaction Syntax

### Basic structure:

```sql
BEGIN;

-- SQL query 1
-- SQL query 2
-- SQL query 3

COMMIT;  -- save all changes
```

If something fails:

```sql
ROLLBACK; -- undo everything
```

---

# 🧩 Example 1 — Bank Money Transfer (Perfect Explanation)

### Problem:

Send ₹500 from **User A** to **User B**.

We need two updates:

1. Deduct 500 from A
2. Add 500 to B

If only step 1 succeeds and step 2 fails → money disappears 😬
So use a **transaction**.

### SQL:

```sql
BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;   -- User A
UPDATE accounts SET balance = balance + 500 WHERE id = 2;   -- User B

COMMIT;
```

If something goes wrong:

```sql
ROLLBACK;
```

This prevents a broken state like:

```
User A = -500
User B = no money received
```

---

# 🧩 Example 2 — Register a new user + create a profile

```sql
BEGIN;

INSERT INTO users (username, email)
VALUES ('jack', 'jack@mail.com')
RETURNING id;

INSERT INTO profiles (user_id, bio)
VALUES (returned_id, 'Hello');

COMMIT;
```

If the profile insert fails → user should NOT be created.

---

# 🧩 Example 3 — Node.js (pg library) transaction

### In backend apps, it looks like THIS:

```js
const client = await pool.connect();

try {
    await client.query('BEGIN');

    await client.query(
      'UPDATE accounts SET balance = balance - 500 WHERE id = $1',
      [1]
    );

    await client.query(
      'UPDATE accounts SET balance = balance + 500 WHERE id = $1',
      [2]
    );

    await client.query('COMMIT');
    console.log("Transfer successful");

} catch (err) {
    await client.query('ROLLBACK');
    console.log("Transfer failed:", err);
} finally {
    client.release();
}
```

---

# 🎯 Why transactions are VERY important?

### They protect your data from corruption.

Without transactions:

* Partial updates can happen
* Money can vanish
* Two users may get the same seat
* Stock can go negative

With transactions:

* Everything stays consistent
* Multi-step processes are safe

---

# 🟢 Final Summary

| Word         | Meaning                            |
| ------------ | ---------------------------------- |
| **BEGIN**    | Start transaction                  |
| **COMMIT**   | Save all changes                   |
| **ROLLBACK** | Undo everything if something fails |

Transactions make complex operations **safe**, **consistent**, and **reliable**.
