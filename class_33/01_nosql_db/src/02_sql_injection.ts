import { Pool } from 'pg'

import express from "express"
const app = express()
app.use(express.json())

import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({ connectionString: process.env.POSTGRES_URL, })


async function main() {
    try {
        const insertResult = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', ['namard', 'na@mard.com', 'ouweu']);
        console.log(insertResult.rows[0]);

        const selectResult = await pool.query('SELECT * FROM users');

        console.log(selectResult.rows);
    } catch (error) {
        console.log(error);
    }
}
main() // This function is adding some initial data to the database


app.post("/sql/injection", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const insertQuery = `
            INSERT INTO users (username, email, password) 
            VALUES ('${username}','${email}','${password}');
        `;
        const response = await pool.query(insertQuery);
        if (response) res.status(201).json({ message: "All Data gone!! Bye Bye! ('_')" });
    } catch (error) {
        console.log(error);
    }

})

/* end user might sends some data like this:
{
  "username": "hacker",
  "email": "x",
  "password": "123'); DROP TABLE users; --"
}

- To delete the whole table, in sql editor it will run like

INSERT INTO users (username, email, password)
VALUES ('hacker','x','123'); DROP TABLE users; --');


or

{
  "username": "dummy",
  "email": "dummy",
  "password": "'); DELETE FROM users; --"
}

- To delete the all the users from the table, in sql editor it will run like

INSERT INTO users (username, email, password)
VALUES ('dummy','dummy',''); DELETE FROM users; --');
*/




// To prevent these Vulnerabilities we should use the 
app.post("/prevent/sql/injection", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const insertQuery = `
        INSERT INTO users (username, email, password) 
        VALUES ($1, $2, $3)
        RETURNING *;
    `

        const response = await pool.query(insertQuery, [
            username,
            email,
            password,
        ]);
        if (response) res.status(201).json({ message: "Fuck you hacker" });
    } catch (error) {
        console.log(error);
    }

})

/* Even if the user sends data like this:
{
  "username": "hacker",
  "email": "x",
  "password": "123'); DROP TABLE users; --"
}

- PostgreSQL treats it as a string, not SQL code.
- It becomes 

password = "'); DROP TABLE users; --"
*/

app.listen(3000)


// read the 17_sql_injection.md for more.