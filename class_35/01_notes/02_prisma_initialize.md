### **1. Installing Prisma and Related Dependencies**

```bash
npm install -D typescript
npm install dotenv prisma
```
- **`typescript`**: Prisma supports TypeScript for type-safe database queries.
- **`dotenv`**: Loads environment variables (e.g., the PostgreSQL connection string from the `.env` file).
- **`prisma`**: The core Prisma package needed to interact with your database.

---

### **2. Setting up Prisma**

```bash
npx prisma init
```

- This command initializes Prisma in your project. 
- It creates:
  - A **`prisma/` folder** with a `schema.prisma` file where you define your database schema using the Prisma schema language.
  - A **`.env` file** where you set the database connection URL (e.g., for PostgreSQL).
  
Example of the generated **`.env` file**:
```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

---

### **3. Defining a Model (Creating a Table)**

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
}
```

- **`model users`**: Defines a table named `users`.
- Each field maps to a column in the table:
  - **`id`**:
    - `Int`: Represents an integer.
    - `@id`: Marks it as the primary key.
    - `@default(autoincrement())`: Automatically increments its value for each new row.
  - **`username`**: A string field, marked `@unique` to ensure no two rows have the same value.
  - **`password`**: A simple string field for storing passwords.
  - **`age`**: An integer column for storing a user’s age.

---

### **4. Running a Migration**

```bash
npx prisma migrate dev
```

#### **What happens step by step:**

1. **Prisma Compares Your Current Database Schema with `schema.prisma`**:
   - If the database has no existing `users` table (or the table differs), Prisma knows it needs to update the database schema.

2. **Asks for a Migration Name**:
   - The name you provide (e.g., `user_table_initialize`) helps version the change (similar to Git commits).

3. **Creates a Migration File**:
   - Located in the `prisma/migrations/` folder.
   - Each migration is timestamped and contains the necessary SQL to alter the database.

   **Generated Migration File Example** (`migration.sql`):
   ```sql
   CREATE TABLE "users" (
       "id" SERIAL PRIMARY KEY,
       "username" TEXT NOT NULL UNIQUE,
       "password" TEXT NOT NULL,
       "age" INT NOT NULL
   );
   ```

4. **Applies the Migration to the Database**:
   - Prisma executes the SQL commands inside the `migration.sql` file against the PostgreSQL database.

5. **Generates the Prisma Client**:
   - **Prisma Client** is regenerated to reflect the new schema.
   - You can now use `prisma.user` to interact with the `users` table programmatically.

---

### **How Prisma Alters Tables**

When you run `npx prisma migrate dev`, Prisma handles schema synchronization between your database and your Prisma schema. Let’s say you update the `users` model like this:

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
  email    String @unique
}
```

If you run `npx prisma migrate dev` again:
1. Prisma will detect the **difference** (that you’ve added the `email` field).
2. It will generate and apply another migration to alter the `users` table:
   
   **Generated Migration SQL (`migration.sql`):**
   ```sql
   ALTER TABLE "users" ADD COLUMN "email" TEXT NOT NULL UNIQUE;
   ```

---

### **What Happens During Table Alterations**
- Prisma **migrations** handle changes incrementally:
  - Adding or removing columns.
  - Changing data types.
  - Adding constraints like `@unique` or `@default`.
- It **stores migration history** in the `prisma/migrations/` directory and a special table in the database called `prisma_migrations`, which tracks all applied migrations.

---

### **Outputs in the Terminal**

```bash
Applying migration `20241214131641_user_table_initialize`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20241214131641_user_table_initialize/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... (Use --skip-generate to skip the generators)

✔ Generated Prisma Client (v6.0.1) to .\node_modules\@prisma\client in 62ms
```

#### What Each Part Means:
- **`Applying migration '20241214131641_user_table_initialize'`**:
  The migration is applied to sync the database schema with your model.
  
- **`migrations/20241214131641_user_table_initialize/migration.sql`**:
  This is the folder and file where Prisma stores the SQL statements it used to update your database.
  
- **`Your database is now in sync with your schema.`**:
  Confirms the database reflects the changes made in the Prisma schema.

- **`Generated Prisma Client`**:
  Regenerates the Prisma Client so you can query the new/updated schema in code.

---

### **Using Prisma to Interact with the Table**

After the table is created, you can use Prisma Client to interact with it programmatically. For example:

#### Insert Data:
```typescript
const newUser = await prisma.users.create({
  data: {
    username: "JohnDoe",
    password: "hashed_password",
    age: 30,
  },
});
```

#### Fetch Data:
```typescript
const allUsers = await prisma.users.findMany();
console.log(allUsers);
```

#### Update Data:
```typescript
await prisma.users.update({
  where: { username: "JohnDoe" },
  data: { age: 31 },
});
```

---

### **In Summary**

Prisma simplifies database operations by:
- Automatically generating SQL commands for you during migrations.
- Managing incremental schema changes via migration files.
- Abstracting complex SQL into an elegant, type-safe API.
- Keeping your schema and database in sync with minimal effort.