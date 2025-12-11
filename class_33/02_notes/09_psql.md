Here are the **most useful and important `psql` commands** you’ll use in the real world — explained simply and with examples.

---

# 🔥 **1. Connect to a PostgreSQL / NeonDB Database**

> Go to Neondb and then `Dashboard` then click on the `connect` button:

### Option 1: `passwordless auth` Through Web Authentication

```bash
psql -h pg.neon.tech -d neondb -U neondb_owner
```

 Meaning of each flag in `psql`:

# **`-h`**

**Host** — the address of the PostgreSQL server.
Example:

```bash
-h pg.neon.tech
```

Means you are connecting to the Neon cloud PostgreSQL host.

# **`-d`**

**Database name** — the specific database inside the server you want to connect to.
Example:

```bash
-d neondb
```

# **`-U`**

**Username** — the PostgreSQL user you want to authenticate as.
Example:

```bash
-U neondb_owner
```

**Connect to the PostgreSQL server hosted at `pg.neon.tech`, using the `neondb_owner` user, and open the `neondb` database.**


> you’ll see:


```bash
PS D:\My_Workings\Cohort-3.0-Webdev\class_33> psql -h pg.neon.tech -d neondb -U neondb_owner
NOTICE:  Welcome to Neon!
Authenticate by visiting (will expire in 2m):
    https://console.neon.tech/psql_session/3160c6**********

```

- When you will click that link you will be redirected to the web page where you have to select the `database` then click `Confirm`


```sh
NOTICE:  Connected to database, session_id: 7ddbe**-****-****-****-09816a3*****
psql (17.4, server 17.7 (178558d))
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off, ALPN: postgresql)
Type "help" for help.

neondb=> 
```

### Option 2: `connection string` Direct, No need to authenticate anything

```bash
psql 'postgresql://neondb_owner:npg_Tfwk1ujoO4YN@ep-billowing-smoke-ahk9ej3t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

you’ll see:


```bash
psql (17.4, server 17.7 (178558d))
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off, ALPN: postgresql)
Type "help" for help.

neondb=>
```


---

# 🔥 **2. List All Databases**

```sql
\l
```

---

# 🔥 **3. Switch Between Databases**

```sql
\c database_name
```

---

# 🔥 **4. List All Tables in the Current Database**

```sql
\dt
```

To see tables in all schemas:

```sql
\dt *
```

---

# 🔥 **5. Describe a Table (See Structure / Columns)**

```sql
\d table_name
```

Example:

```sql
\d users
```

Shows:

* column names
* data types
* constraints (PK, FK, unique, default, etc.)

---

# 🔥 **6. Create a Table**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 🔥 **7. Insert Data**

```sql
INSERT INTO users (name, email) VALUES ('Nihar', 'nihar@example.com');
```

Insert multiple rows:

```sql
INSERT INTO users (name, email)
VALUES 
  ('Alice', 'a@gmail.com'),
  ('Bob', 'b@gmail.com');
```

---

# 🔥 **8. Select Data**

Get all rows:

```sql
SELECT * FROM users;
```

Filter:

```sql
SELECT * FROM users WHERE name = 'Nihar';
```

Select specific columns:

```sql
SELECT name, email FROM users;
```

---

# 🔥 **9. Update Data**

```sql
UPDATE users SET name = 'New Name' WHERE id = 1;
```

---

# 🔥 **10. Delete Data**

```sql
DELETE FROM users WHERE id = 1;
```

Delete all rows:

```sql
DELETE FROM users;
```

⚠️ Careful: This removes **all** data.

---

# 🔥 **11. Drop a Table**

```sql
DROP TABLE users;
```

Drop only if exists:

```sql
DROP TABLE IF EXISTS users;
```

---

# 🔥 **12. Show Current User**

```sql
\conninfo
```

---

# 🔥 **13. Clear the Terminal**

```sql
\! clear
```

---

# 🔥 **14. Quit psql**

```sql
\q
```

---

# 🔥 **15. View Queries With Formatting**

View a row vertically:

```sql
SELECT * FROM users \gx
```

Useful when row data is long.

---

# 🚀 **16. Export Data to a File (local only)**

```sql
\copy users TO 'users.csv' CSV HEADER;
```

---

# 🚀 **17. Run SQL File**

If you have a file `setup.sql`:

```bash
psql -h host -d db -U user -f setup.sql
```

---

# 🔥 **18. View All Commands**

```sql
\?
```

---

# ⭐ Bonus: Admin Commands (Very Useful)

#### See all indexes:

```sql
\di
```

#### See privileges of tables:

```sql
\dp
```

#### Show server version:

```sql
SELECT version();
```
