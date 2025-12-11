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

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const signupQuery = `INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id;`

    const signupResponse = await pgClient.query(signupQuery, [username, email, password]);

    console.log(signupResponse); // from this logging we can find the id of the user, as this returns created user things.

    const user_id = signupResponse.rows[0].id

    res.status(201).json({ message: "User signed up successfully!", id: user_id });

})


app.post("/address", async (req, res) => {
    const { city, country, street, pincode, id } = req.body;


    const addressQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1,$2,$3,$4,$5)`

    const addressResponse = await pgClient.query(addressQuery, [city, country, street, pincode, id]);


    res.status(201).json({ message: "Address added!" });

})

app.listen(3000)
