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

app.get("/inner/join", async (req, res) => {

    const query = `
        SELECT 
            u.id AS user_id, 
            u.username, 
            u.email, 
            a.city, 
            a.country,
            a.street, 
            a.pincode
        FROM users u
        INNER JOIN addresses a
        ON u.id = a.user_id;
        `;
    const result = await pgClient.query(query);


    res.json({
        response: result.rows
    })
})


app.get("/left/join", async (req, res) => {
    const id = req.query.id; // http://localhost:3000/left/join?id=3

    const query = `
    SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u LEFT JOIN addresses a ON u.id = a.user_id
    WHERE u.id = $1;
    `;
    const result = await pgClient.query(query, [id]);


    res.json({
        response: result.rows
    })
})

app.get("/right/join", async (req, res) => {
    const id = req.query.id; // http://localhost:3000/right/join?id=3

    const query = `
    SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u RIGHT JOIN addresses a ON a.user_id = u.id 
    WHERE a.user_id = $1;
    `;

    const result = await pgClient.query(query, [id]);

    res.json({
        response: result.rows
    });
});

app.get("/full/join", async (req, res) => {

    const query = `
        SELECT 
            u.id AS user_id, 
            u.username, 
            u.email, 
            a.city, 
            a.country,
            a.street, 
            a.pincode
        FROM users u
        FULL JOIN addresses a
        ON u.id = a.user_id;
        `;
    const result = await pgClient.query(query);


    res.json({
        response: result.rows
    })
})


app.listen(3000)