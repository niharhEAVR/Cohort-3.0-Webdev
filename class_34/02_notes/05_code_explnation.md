### First we created a different table for better understanding of the types in join

- without any Foreign relation with `users` table

```SQL
CREATE TABLE bank_balances (
    id SERIAL PRIMARY KEY,
    user_id INT,
    account_number VARCHAR(20) UNIQUE,
    balance DECIMAL(10, 2) NOT NULL
);
```

- its indeed have the `user_id` but have no direct realtion with users table. (Like addresses table have)

---


The code contains three API endpoints, each demonstrating a different type of SQL join (`LEFT JOIN`, `RIGHT JOIN`, and `FULL JOIN`) between the `users` and `bank_balances` tables. Below is the detailed explanation of each endpoint.

### 1. `/left-metadata` Endpoint (LEFT JOIN)

```javascript
app.get("/left-metadata", async (req, res) => {
    const id = req.query.id;

    const query = `
    SELECT u.id, u.username, u.email, bb.account_number, bb.balance
    FROM users u LEFT JOIN bank_balances bb ON u.id = bb.user_id
    WHERE u.id = $1;
    `;
    const result = await pgClient.query(query, [id]);

    res.json({
        response: result.rows
    });
});
```

#### Explanation:

- **LEFT JOIN**: This query retrieves data from the `users` table (aliased as `u`) and the `bank_balances` table (aliased as `bb`).
    - It returns **all rows from the `users` table**, including rows that have **no match in the `bank_balances` table**. For rows in `users` that do not have a matching entry in `bank_balances`, it will return `NULL` for the columns from `bank_balances`.
    - Specifically, `u.id = bb.user_id` means it joins on the `id` of the user and the `user_id` from `bank_balances`.
- **`WHERE u.id = $1`**: The `id` query parameter is used to filter users, so it only looks at the records for a specific user with `id = $1`.
- **Response**: The result returns the user details (`id`, `username`, `email`) and, if applicable, the corresponding bank account (`account_number`, `balance`). If no matching bank account exists for the user, `account_number` and `balance` will be `NULL`.

#### Example:
If user `1` exists and has a bank balance, but user `3` has no matching bank balance, the results would look like this:

```json
{
  "response": [
    {
      "id": 1,
      "username": "Alice",
      "email": "alice@mail.com",
      "account_number": "ACC123456",
      "balance": 1000.50
    }
  ]
}
```

For a user without a balance (`user 3`), the response would show:

```json
{
  "response": [
    {
      "id": 3,
      "username": "John",
      "email": "john@mail.com",
      "account_number": null,
      "balance": null
    }
  ]
}
```

---

### 2. `/right-metadata` Endpoint (RIGHT JOIN)

```javascript
app.get("/right-metadata", async (req, res) => {
    const id = req.query.id;

    const query = `
    SELECT u.id, u.username, u.email, bb.account_number, bb.balance
    FROM users u RIGHT JOIN bank_balances bb ON bb.user_id = u.id
    WHERE bb.user_id = $1;
    `;

    const result = await pgClient.query(query, [id]);

    res.json({
        response: result.rows
    });
});
```

#### Explanation:

- **RIGHT JOIN**: This query retrieves all rows from the `bank_balances` table (aliased as `bb`), even if there's no corresponding match in the `users` table.
    - For rows in `bank_balances` that have no matching user in `users`, the user details (`id`, `username`, `email`) will be `NULL`. The `RIGHT JOIN` ensures that every row from `bank_balances` is included in the result.
- **`WHERE bb.user_id = $1`**: This filter limits the query to only those rows where the `user_id` in `bank_balances` matches the provided `id`.
- **Response**: It shows the user details (`id`, `username`, `email`), along with the `account_number` and `balance` from the `bank_balances`. If there is no corresponding user, the user columns will be `NULL`.

#### Example:

Given that `user 1` exists with a bank balance, but `user 3` does not exist in the `users` table:

```json
{
  "response": [
    {
      "id": 1,
      "username": "Alice",
      "email": "alice@mail.com",
      "account_number": "ACC123456",
      "balance": 1000.50
    },
    {
      "id": null,
      "username": null,
      "email": null,
      "account_number": "ACC789101",
      "balance": 250.75
    }
  ]
}
```

---

### 3. `/full-metadata` Endpoint (FULL JOIN)

```javascript
app.get("/full-metadata", async (req, res) => {
    const id = req.query.id;

    const query = `
    SELECT 
        users.id AS user_id, 
        users.username, 
        users.email, 
        bank_balances.account_number, 
        bank_balances.balance
    FROM users
    FULL JOIN bank_balances 
    ON users.id = bank_balances.user_id;
    `;
    const result = await pgClient.query(query);

    res.json({
        response: result.rows
    });
});
```

#### Explanation:

- **FULL JOIN**: This query performs a `FULL JOIN` between the `users` and `bank_balances` tables.
    - It returns **all rows from both tables**, matching where possible. For rows in `users` with no matching `bank_balances`, or vice versa, the non-matching fields will be filled with `NULL`.
    - **`ON users.id = bank_balances.user_id`** specifies that the tables will be joined on this key.
- **Response**: This query returns both users with their bank balance data, and all bank balances whether or not they correspond to an existing user.

#### Example:

If we have a scenario where there are:
- A `user` with an associated bank account.
- A `user` without a bank account.
- A bank account without a corresponding `user`.

The response could look like this:

```json
{
  "response": [
    {
      "user_id": 1,
      "username": "Alice",
      "email": "alice@mail.com",
      "account_number": "ACC123456",
      "balance": 1000.50
    },
    {
      "user_id": 2,
      "username": "Bob",
      "email": "bob@mail.com",
      "account_number": null,
      "balance": null
    },
    {
      "user_id": null,
      "username": null,
      "email": null,
      "account_number": "ACC789101",
      "balance": 250.75
    }
  ]
}
```

---

### General Flow:

1. **GET /left-metadata**: Fetches data for a single user (`users.id`) and shows their bank balance, ensuring that even if they don't have one, the result will show `NULL` for the `bank_balances` fields (left table dominant).
2. **GET /right-metadata**: Fetches a bank account's details (`bank_balances.user_id`) and shows user data where available. If there's no corresponding user, the result shows `NULL` for the user details (right table dominant).
3. **GET /full-metadata**: Combines data from both tables and returns all the rows from `users` and `bank_balances`. If any records don't match in the other table, the unmatched fields will be returned as `NULL`. This represents a **complete set of all data** from both tables.

