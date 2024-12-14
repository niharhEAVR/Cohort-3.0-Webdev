// The problem with the two or more sql querys one after other is that what if backend server crashes after the the first query run, server can crashes for many reasons, thats why we have to wrap two or more query in a single query, means that if the server crashes then either everything stored in the database or nothing will store in the database


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

app.post("/signup/address", async (req, res) => {
    const { username, email, password } = req.body;
    const { city, country, street, pincode } = req.body;

    const signupQuery = `INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id;`

    const addressQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1,$2,$3,$4,$5)`


    
    await pgClient.query("BEGIN");
    const signupResponse = await pgClient.query(signupQuery, [username, email, password]);

    const user_id = signupResponse.rows[0].id

    // throw new Error("Hehe"); // if you uncomment this then the backend will not gonna store the user, because we have throw an error before the addressResponse

    const addressResponse = await pgClient.query(addressQuery, [city, country, street, pincode, user_id]);
    await pgClient.query("commit");


    res.status(201).json({ message: "User signed up successfully!" });

})

app.listen(3000)
