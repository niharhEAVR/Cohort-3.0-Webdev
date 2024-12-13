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
    const { city, country, street, pincode } = req.body;
    

    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1,$2,$3);`
    
    await pgClient.query(insertQuery, [username,email,password]);

    
    res.status(201).json({ message: "User signed up successfully!" });

})

app.listen(3000)
