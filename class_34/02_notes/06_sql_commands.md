# ✅ **Query 1 — Basic JOIN (default = INNER JOIN)**

```sql
SELECT users.id, users.username, users.email, 
       addresses.id, addresses.city, addresses.country, 
       addresses.street, addresses.pincode
FROM users 
JOIN addresses ON users.id = addresses.user_id
WHERE users.id = $1;
```

### ✔ What SQL does step-by-step:

1. **Look at table `users`**

2. Find the row where:

   ```
   users.id = $1
   ```

   Let’s say `$1 = 5`, so it loads user with `id = 5`.

3. **Join with table `addresses` by matching:**

   ```
   users.id = addresses.user_id
   ```

4. SQL fetches all address rows where:

   ```
   addresses.user_id = 5
   ```

5. It combines (JOINs) the user row + each matching address row.

6. Output includes selected columns from both tables.

### ✔ Meaning:

Get **user + all their addresses**, but **only if they have at least one address**
(because default `JOIN` = `INNER JOIN`).

---

# ✅ **Query 2 — Same as above but using aliases**

```sql
SELECT 
    u.id AS user_id, 
    u.username, 
    u.email, 
    a.city, 
    a.country,
    a.street, 
    a.pincode
FROM users u
INNER JOIN addresses a
ON u.id = a.user_id;
```

### ✔ What changed?

* You used table aliases:

  ```
  users → u
  addresses → a
  ```

  Purely for convenience and readability.

* You explicitly wrote:

  ```
  INNER JOIN
  ```

  which is the same as just writing:

  ```
  JOIN
  ```

### ✔ What SQL does:

1. Start from users (u)
2. INNER JOIN addresses (a)
3. Match rows:

   ```
   u.id = a.user_id
   ```
4. Return every matching pair.

### ✔ Result:

Same as Query 1 but without filtering by a specific ID.
This returns **all users who have addresses**.

### ❗ Users with *no* address are excluded.

---

# ✅ **Query 3 — LEFT JOIN**

```sql
SELECT u.id, u.username, u.email, 
       a.city, a.country, a.street, a.pincode
FROM users u 
LEFT JOIN addresses a 
ON u.id = a.user_id
WHERE u.id = $1;
```

### ✔ What SQL does step-by-step:

1. Look up the user with:

   ```
   u.id = $1
   ```
2. Perform a **LEFT JOIN**:

   ```
   u.id = a.user_id
   ```

### ✔ LEFT JOIN behavior:

* If the user **has addresses** → return them.
* If the user **has NO addresses** → return the user with `NULL` for address fields.

Example output if user has **no address**:

| id | username | email                   | city | country | street | pincode |
| -- | -------- | ----------------------- | ---- | ------- | ------ | ------- |
| 7  | ronny    | [r@a.in](mailto:r@a.in) | NULL | NULL    | NULL   | NULL    |

### ✔ Meaning:

Return the user even if they have zero addresses.

---

# 🎯 Summary of ALL 3 Queries

| Query | JOIN Type            | What It Does                                                 |
| ----- | -------------------- | ------------------------------------------------------------ |
| **1** | INNER JOIN (default) | Get specific user **only if** they have at least one address |
| **2** | INNER JOIN           | Get **all users who have addresses**                         |
| **3** | LEFT JOIN            | Get specific user **even if** they have no address           |

---

# 🎨 Ultra-Simple Visual

### Query 1 & 2 (INNER JOIN)

```
users (only those with addresses)
          ↓ match
addresses
```

If no match → row is dropped.

---

### Query 3 (LEFT JOIN)

```
users (all of them)
          ↓ match if exists, else NULL
addresses
```

User without address still appears.