### todays slide link
```link
https://projects.100xdevs.com/tracks/YOSAherHkqWXhOdlE4yE/sql-1
```


Here’s a step-by-step guide to setting up your first free PostgreSQL database on NeonDB:

---

### 1. **Sign Up for NeonDB**  
   - Go to the [Neon website](https://neon.tech/).
   - Sign up using your email or a supported single sign-on method like Google or GitHub.

---

### 2. **Create a New Project**  
   - Once logged in, click the **"New Project"** button.
   - Choose a name for your project (this can be anything; e.g., "My First DB").
   - Select the region closest to you for low-latency access.

---

### 3. **Configure Your Database**  
   - Neon automatically creates a PostgreSQL database for your project.
   - Once the project is created, you’ll see details like the database name, username, password, and connection string.

---

### 4. **Copy the Connection String**  
   - Look for the **connection string** in your project dashboard.
   - The format will look something like this:
     ```
     postgresql://<username>:<password>@<host>:<port>/<database_name>?sslmode=require
     ```
   - Copy this connection string—you’ll need it to connect your application to the database.

---

### 5. **Connect to Your Database**  
   - **Using `pg` in Node.js**:
     ```javascript
     import pg from "pg";
     const { Client } = pg;

     const client = new Client("your_connection_string_here");

     async function main() {
       try {
         await client.connect();
         console.log("Connected to NeonDB!");
       } catch (err) {
         console.error("Connection failed:", err);
       }
     }

     main();
     ```
   - **Using a GUI Client (Optional)**:
     - Tools like [pgAdmin](https://www.pgadmin.org/) or [DBeaver](https://dbeaver.io/) can be used to visually interact with your database.
     - Use the connection string to connect in these tools.

---

### 6. **Create Tables and Test Queries**  
   - Once connected, start creating tables and inserting data. For example:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(100) NOT NULL
     );

     INSERT INTO users (username, email, password)
     VALUES ('testuser', 'testuser@example.com', 'password123');
     ```

---

### 7. **Use the Free Tier Wisely**  
   - NeonDB offers a free tier with limitations (e.g., storage and compute).
   - Monitor your usage to ensure you stay within the free plan limits.

---

### 8. **Documentation and Support**  
   - Refer to [Neon’s documentation](https://neon.tech/docs) for detailed guidance on advanced features like branching, scaling, or integrating with other tools.

You’re now ready to start using your free PostgreSQL database on NeonDB!