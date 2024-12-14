### Q. Now a question comes what if in the users table there is 10 users is now exists and developer wants to add a new column called time then how can it be connected?


#### **Steps to Add the Column:**

1. **Modify the Prisma Schema:**
   Add the new `time` column to the `users` model in `schema.prisma`:

   ```prisma
   model users {
     id       Int    @id @default(autoincrement())
     username String @unique
     password String
     age      Int
     email    String @unique
     time     DateTime @default(now())
   }
   ```

   - **`time`**: Defines a new `DateTime` column.
   - **`@default(now())`**: Automatically sets the current date and time as the default for new rows.

2. **Run the Migration Command:**
   ```bash
   npx prisma migrate dev
   ```

3. **What Happens:**
   - Prisma generates a new migration file.
   - It contains SQL to add the `time` column to the `users` table.
   
   **Generated SQL in `migration.sql`:**
   ```sql
   ALTER TABLE "users" ADD COLUMN "time" TIMESTAMP NOT NULL DEFAULT now();
   ```

4. **Apply the Migration:**
   - The `time` column will be added to the database.
   - Existing rows will have their `time` column automatically set to the default value (`now()` in this case).

5. **Verify the Schema Synchronization:**
   - Once migration is complete, you can interact with the `time` column in Prisma.

---

### **Impact of Adding the Column**

1. **Database-Level Changes:**
   - The `users` table will now include the `time` column.
   - For any **existing rows**, Prisma allows you to define:
     - **Default values**: Apply `DEFAULT now()` automatically.
     - **Manual updates**: Customize the value for existing rows.

2. **Application-Level Updates:**
   - Prisma regenerates the Client.
   - You can now query, insert, or update data in the `time` column using the Prisma Client.

   **Example Usage:**
   ```typescript
   const user = await prisma.users.create({
     data: {
       username: "JaneDoe",
       password: "hashed_password",
       age: 25,
       email: "janedoe@example.com",
       time: new Date("2024-01-01T12:00:00Z"), // Custom value.
     },
   });

   const allUsers = await prisma.users.findMany({
     select: { username: true, time: true },
   });
   console.log(allUsers);
   ```


---

If the developer wants to skip setting timestamps (`time`) for the **existing rows** and only set the value for **new rows**, the process involves defining the new column without a default value for existing data and ensuring it only applies to new rows.

Here's how it can be done:


1. **Modify the Prisma Schema:**
   Update the schema to include the `time` column **without a default**:
   ```prisma
   model users {
     id       Int    @id @default(autoincrement())
     username String @unique
     password String
     age      Int
     email    String @unique
     time     DateTime?
   }
   ```

   - **`DateTime?`**: The `?` makes the `time` field optional. For existing rows, this column will remain `NULL`.

2. **Run the Migration Command:**
   ```bash
   npx prisma migrate dev
   ```

   - Prisma generates a migration file that creates the `time` column as `NULL` by default.

   **Generated SQL in `migration.sql`:**
   ```sql
   ALTER TABLE "users" ADD COLUMN "time" TIMESTAMP;
   ```

3. **Add Timestamp for New Rows in Your Application Code:**
   While inserting new rows, provide the timestamp explicitly, e.g., using `new Date()`:
   ```typescript
   const newUser = await prisma.users.create({
     data: {
       username: "JaneDoe",
       password: "hashed_password",
       age: 25,
       email: "janedoe@example.com",
       time: new Date(), // Add the current timestamp for new rows
     },
   });
   ```

---

### **Handling New Rows Automatically (Optional)**

If you want **Prisma to automatically set the timestamp for new rows** (but skip the existing ones), you can achieve this with a default value **in the database**:

1. Update the schema to include a default:
   ```prisma
   model users {
     id       Int    @id @default(autoincrement())
     username String @unique
     password String
     age      Int
     email    String @unique
     time     DateTime? @default(now())
   }
   ```

2. Run the migration:
   ```bash
   npx prisma migrate dev
   ```

   **Generated SQL:**
   ```sql
   ALTER TABLE "users" ADD COLUMN "time" TIMESTAMP DEFAULT now();
   ```

---

### **Behavior for Existing vs. New Rows**

- **Existing Rows**: The `time` column will be `NULL`.
- **New Rows**: The database will populate the `time` column automatically with the current timestamp (`now()`), **without needing any explicit logic in your application code**.

