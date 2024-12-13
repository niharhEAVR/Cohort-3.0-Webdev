The third point, **"Update the schema as your app changes and perform migrations,"** refers to the process of making changes to the database's structure as the requirements of your application evolve. Let’s break it down:

---

### 1. **Why would you update the schema?**
Applications often evolve over time due to:
- **New features**: Adding new functionality may require new tables, columns, or relationships in the database.
- **Changing requirements**: Existing data structures may need to be adjusted, such as changing the datatype of a column, renaming it, or even removing it.
- **Optimizations**: You might redesign certain parts of the schema for performance improvements.
  
For example:
- Adding a new `date_of_birth` column to the `users` table.
- Changing the `username` column from `VARCHAR(50)` to `VARCHAR(100)` to allow longer usernames.
- Splitting a single `address` column into `street`, `city`, and `zipcode`.

---

### 2. **What are migrations?**
Migrations are a systematic way to manage schema changes in a database. They allow developers to:
- **Apply schema updates** consistently across different environments (development, testing, production).
- **Track changes** made to the schema over time, ensuring version control for the database.
- **Roll back** changes if needed.

---

### 3. **How do migrations work?**
A migration typically involves:
- **Defining the change**: Writing scripts or code that describe what changes should be made to the database schema.
- **Executing the change**: Applying the migration script to update the database schema.
- **Testing**: Verifying that the changes work correctly and that the database is in a valid state.

For instance:
- **Before migration**:
  ```sql
  CREATE TABLE users (
      id INT PRIMARY KEY,
      name VARCHAR(50)
  );
  ```
- **Migration script**:
  ```sql
  ALTER TABLE users ADD COLUMN email VARCHAR(100);
  ```
- **After migration**:
  ```sql
  CREATE TABLE users (
      id INT PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(100)
  );
  ```

---

### 4. **Tools for migrations**
Many frameworks and tools provide built-in support for database migrations, such as:
- **Django**: `python manage.py makemigrations` and `migrate`.
- **Rails**: ActiveRecord migrations.
- **TypeORM/Sequelize**: JavaScript/TypeScript-based migration tools for Node.js.
- **Flyway/Liquibase**: Independent migration tools for any SQL database.

---

### 5. **Challenges with migrations**
- **Data consistency**: Ensuring no data is lost or corrupted during schema changes.
- **Downtime**: Some migrations might require locking tables or taking the system offline temporarily.
- **Backward compatibility**: Ensuring that old code can still work with new database structures during phased rollouts.

---

In summary, updating the schema and performing migrations is about adapting the database structure to meet the changing needs of your application while ensuring stability and consistency.