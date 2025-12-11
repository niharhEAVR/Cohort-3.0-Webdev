## We’ll use two small tables:

### 🟦 **users**

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

### 🟩 **addresses**

| id  | user_id | city    |
| --- | ------- | ------- |
| 101 | 1       | Delhi   |
| 102 | 1       | Mumbai  |
| 103 | 2       | Kolkata |
| 104 | 4       | Chennai |

Notice:

* user 1 has 2 addresses
* user 2 has 1 address
* user 3 has **no address**
* address 104 points to **user 4 (which does NOT exist)**

This helps us see how JOINs behave.

---

# ⭐ 1. **INNER JOIN** (most common)

### ✔ Only returns rows where data exists in **both** tables.

```sql
SELECT * 
FROM users
INNER JOIN addresses ON users.id = addresses.user_id;
```

### 🎯 What we get:

Only rows where there is a match:

| users.name | addresses.city |
| ---------- | -------------- |
| Alice      | Delhi          |
| Alice      | Mumbai         |
| Bob        | Kolkata        |

### ❌ No Charlie

(because Charlie has no address)

### ❌ No Chennai

(because that address points to user 4 which doesn't exist)

### 👉 Think: **Give me matches only**

---

# ⭐ 2. **LEFT JOIN**

(also called **LEFT OUTER JOIN**)

### ✔ Return **everything from the left table**, even if there’s no match.

Missing values are filled with **NULL**.

```sql
SELECT *
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id;
```

### 🎯 Result:

| users.name | addresses.city |
| ---------- | -------------- |
| Alice      | Delhi          |
| Alice      | Mumbai         |
| Bob        | Kolkata        |
| Charlie    | NULL           |

### 🧠 Meaning:

* Give me **all users**
* For users without address → show `NULL`

### 👉 Think: **Everyone from left table, matches if available**

---

# ⭐ 3. **RIGHT JOIN**

(also called **RIGHT OUTER JOIN**)

### ✔ Opposite of LEFT JOIN

Returns **everything from the RIGHT table**.

```sql
SELECT *
FROM users
RIGHT JOIN addresses ON users.id = addresses.user_id;
```

### 🎯 Result:

| users.name | addresses.city |
| ---------- | -------------- |
| Alice      | Delhi          |
| Alice      | Mumbai         |
| Bob        | Kolkata        |
| NULL       | Chennai        |

### 🧠 Meaning:

* Give me **all addresses**
* If address does not match any user → user is NULL

### 👉 Think: **Everyone from right table, matches if available**

---

# ⭐ 4. **FULL OUTER JOIN**

### ✔ Returns **everything from both tables**, even unmatched rows

Missing values → NULL.

```sql
SELECT *
FROM users
FULL OUTER JOIN addresses ON users.id = addresses.user_id;
```

### 🎯 Result:

| users.name | addresses.city |
| ---------- | -------------- |
| Alice      | Delhi          |
| Alice      | Mumbai         |
| Bob        | Kolkata        |
| Charlie    | NULL           |
| NULL       | Chennai        |

### 🧠 Meaning:

* Show ALL users
* Show ALL addresses
* Show matches
* Show unmatched with NULLs

### 👉 Think: **Complete picture — everything from both sides**

---

# 🎨 TLDR Summary (Super Simple)

| JOIN Type      | What it returns          | Easy Meaning                                  |
| -------------- | ------------------------ | --------------------------------------------- |
| **INNER JOIN** | Only matched rows        | Give me perfect couples only                  |
| **LEFT JOIN**  | All left rows + matches  | Give me everyone from left, matched or single |
| **RIGHT JOIN** | All right rows + matches | Give me everyone from right                   |
| **FULL JOIN**  | Everything               | Give me all couples + all singles             |

---

# 🎯 Mini Visual Diagram

```
LEFT JOIN:
(users) ●●●●●  
(addresses)  ●●●

RIGHT JOIN:
(users)   ●●●
(addresses) ●●●●●

INNER JOIN:
(users)  ●●●
(addresses)  ●●●

FULL JOIN:
(users) ●●●●●
(addresses) ●●●●●
```
