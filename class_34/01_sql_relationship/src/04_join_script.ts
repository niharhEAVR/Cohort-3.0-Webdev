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


app.get("/without/join", async (req, res) => {
    const id = req.query.id; // http://localhost:3000/without/join?id=3

    const userQuery = 'SELECT * FROM users WHERE id = $1'; // Never do the (SELECT *) option because this will expose the users password also, better do this (SELECT username, email, id)
    const userResponse = await pgClient.query(userQuery, [id]);


    const addressQuery = 'SELECT * FROM addresses WHERE user_id = $1';
    const addressResponse = await pgClient.query(addressQuery, [id]);

    res.json({
        user: userResponse.rows[0], 
        addresses: addressResponse.rows // a single can have multiple addresses.
    })

    // This request is actually running two queries one after other, to showcasing what we want. As this will load our database calling at large scale. That's why we need the JOINS. 
})


app.get("/with/joins", async (req, res) => {
    const id = req.query.id; // http://localhost:3000/with/joins?id=3

    const query = `
    SELECT users.id, users.username, users.email, addresses.id, addresses.city, addresses.country, addresses.street, addresses.pincode
    FROM users JOIN addresses ON users.id = addresses.user_id
    WHERE users.id = $1;
    `;
    const result = await pgClient.query(query, [id]);

    res.json({
        response: result.rows
    })
    // joins is very expensive
})

// this doesnot mean that everytime we should use join, because some cases we could have milion users and the address have 20k rows then join will tryna ceate n*m mapping and will tryna create million* 20k rows 

// read 03_joins.md to better understand

app.listen(3000)
