import pg from 'pg'
const { Client } = pg

import express from "express"
const app = express()
app.use(express.json())

import dotenv from 'dotenv';
dotenv.config();

const pgClient = new Client(process.env.POSTGRES_URL)

async function main() {
    await pgClient.connect();
}
main()


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
    })
})

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
    })
    // inner join is that if a row in two tables matches the condition then give the output.
    // full joins means any row matches the condition give output
})


app.listen(3000)


// read 04_join_types.md for understanding the join types

// and read 05_code_exlanation to know how is this code is working