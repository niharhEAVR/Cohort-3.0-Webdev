### What if a user want to send data like this:
```json
{
    "username": "alice",
    "email": "alice@gmail.com",
    "password": "'); DELETE FROM users;"
}
```

The example you provided demonstrates an **SQL Injection attack**. This happens when a malicious user manipulates input to execute unintended SQL commands on the database. Let's break it down step by step:


### 1. **User Input**
The user sends a malicious payload:
```json
{
    "username": "alice",
    "email": "alice@gmail.com",
    "password": "'); DELETE FROM users;"
}
```

Here, the `password` field contains a malicious SQL fragment designed to terminate the current SQL statement and execute a destructive SQL command (`DELETE FROM users;`).


### 2. **Vulnerable Code**
Your code constructs a raw SQL query by directly embedding user input:
```javascript
const insertQuery = `
    INSERT INTO users (username, email, password) 
    VALUES ('${username}', '${email}', '${password}');
`;
```

When you plug in the malicious input:
```javascript
const insertQuery = `
    INSERT INTO users (username, email, password) 
    VALUES ('alice', 'alice@gmail.com', ''); DELETE FROM users;');
`;
```

#### What Happens:
1. The SQL parser sees the malicious `password` value: `'); DELETE FROM users;`.
2. The query is split into two commands:
   - The first inserts the data:  
     ```sql
     INSERT INTO users (username, email, password) VALUES ('alice', 'alice@gmail.com', '');
     ```
   - The second deletes all rows in the `users` table:  
     ```sql
     DELETE FROM users;
     ```
3. The database executes both commands, resulting in **data loss**.


### 3. **The Solution: Parameterized Queries**
To prevent this type of attack, you must use **parameterized queries**. These treat user input as data, not executable SQL.

#### Updated Code with Parameterized Query:
```javascript
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const insertQuery = `
        INSERT INTO users (username, email, password) 
        VALUES ($1, $2, $3);
    `;
    try {
        await client.query(insertQuery, [username, email, password]);
        res.status(201).json({ message: "User signed up successfully!" });
    } catch (error) {
        console.error("Error inserting user:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
```

#### What Happens Now:
When the user sends:
```json
{
    "username": "alice",
    "email": "alice@gmail.com",
    "password": "'); DELETE FROM users;"
}
```

The parameterized query ensures the `password` field is treated as a string literal. It escapes the malicious input and safely inserts it into the database. The resulting query becomes:
```sql
INSERT INTO users (username, email, password) 
VALUES ('alice', 'alice@gmail.com', '\'); DELETE FROM users;');
```

The database driver prevents the `DELETE FROM users;` command from executing because it's embedded as part of the `password` value, not as an executable SQL command.


### 4. **Why Parameterized Queries Work**
Parameterized queries:
1. **Separate SQL Commands and Data**: User input is treated as data only, no matter how malicious.
2. **Escape Dangerous Characters**: Automatically escape single quotes, semicolons, or other potentially harmful characters.
3. **Prevent SQL Injection**: The query structure remains intact, safeguarding the database.


### 5. **General Best Practices to Avoid SQL Injection**
- **Always use parameterized queries**: Avoid concatenating user input directly into SQL.
- **Input validation**: Validate user input to ensure it meets the expected format.
- **Limit database permissions**: Ensure the application user has only the necessary permissions (e.g., avoid `DROP` or `DELETE` rights unless required).
- **Use an ORM**: Object-relational mappers (like Sequelize or TypeORM) often include built-in protections against SQL injection.
- **Monitor for unusual activity**: Use logging and monitoring to detect suspicious queries.


### Conclusion
Parameterized queries are essential for protecting your database against SQL injection attacks. In this example, using `pg` with placeholders like `$1, $2, $3` ensures that malicious input such as `'); DELETE FROM users;` is treated as a string, not a command. Always validate user input and avoid directly embedding it into SQL statements.