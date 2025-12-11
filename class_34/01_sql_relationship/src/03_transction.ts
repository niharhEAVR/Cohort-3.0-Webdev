import { Pool } from 'pg'

import express from "express"
const app = express()
app.use(express.json())

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.POSTGRES_URL })

app.post("/without/transaction", async (req, res) => {
    const { username, email, password } = req.body;
    const { city, country, street, pincode } = req.body;

    const signupQuery = `INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id;`

    const addressQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1,$2,$3,$4,$5)`



    try {
        const signupResponse = await pool.query(signupQuery, [username, email, password]);

        const user_id = signupResponse.rows[0].id

        throw new Error("Hehe ('_')");

        const addressResponse = await pool.query(addressQuery, [city, country, street, pincode, user_id]);
        res.status(201).json({ message: "User signed up successfully!" });
    } catch (error) {
        console.log("Transfer failed (ckeck databse there might be user added but not the address):", error);
    }
})

app.post("/with/transaction", async (req, res) => {
    const { username, email, password } = req.body;
    const { city, country, street, pincode } = req.body;

    const signupQuery = `INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id;`

    const addressQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1,$2,$3,$4,$5)`



    try {
        await pool.query("BEGIN;");
        const signupResponse = await pool.query(signupQuery, [username, email, password]);

        const user_id = signupResponse.rows[0].id

        throw new Error("Hehe ('_')");

        const addressResponse = await pool.query(addressQuery, [city, country, street, pincode, user_id]);
        await pool.query("COMMIT;");
        res.status(201).json({ message: "User signed up successfully!" });
    } catch (error) {
        await pool.query('ROLLBACK;');
        console.log("Transfer failed (ckeck databse, both the user and address haven't added):", error);
    }
})



app.listen(3000)
/* input
{
    "username": "ubrguoijbrg",
    "email": "giugeruigberoug",
    "password": "123'); DROP TABLE users; --",
    "city": "ebvb",
    "country": "vbeuojb",
    "street": "ifbeujbf",
    "pincode": 785234724
}
*/