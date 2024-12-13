// MongoDB client is mongoose
// and PostGres client is pg


import pg from 'pg'
const { Client } = pg

import express from "express"
const app = express()
app.use(express.json())

import dotenv from 'dotenv';
dotenv.config();


const client = new Client(process.env.POSTGRES_URL)


async function main() {
    await client.connect();
}

main()


app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    

    const insertQuery = `
        INSERT INTO users (username, email, password) 
        VALUES ('${username}','${email}','${password}');
    ` // In SQL, string values must be enclosed in single quotes (') instead of double quotes ("). Using double quotes is for identifiers like table or column names.

    // but putting data like this is very bad or you can say that code will increase the risk of sql injection, (read 06_SQL_Injection.md)
    
    const response = await client.query(insertQuery);
    res.status(201).json({ message: "User signed up successfully!" });

})

app.listen(3000)
