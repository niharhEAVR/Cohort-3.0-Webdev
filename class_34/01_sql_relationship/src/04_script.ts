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


app.get("/normal-metadata", async (req, res) => {
    const id = req.query.id;

    const userQuery = 'SELECT id, username, email, password FROM users WHERE id = $1'; // we should not request for the password, better-metadata will not shows the password

    const userResponse = await pgClient.query(userQuery, [id]);  // to retrieve from the SQL injection we are passing id this way

    const addressQuery = 'SELECT city, country, street, pincode FROM addresses WHERE user_id = $1';
    const addressResponse = await pgClient.query(addressQuery, [id]);


    res.json({
        user: userResponse.rows[0], // user is single, thats why we are only showing the 0th position of the row 
        addresses: addressResponse.rows // a single user can have multiple address, thats why we showed all the rows, if you are thinking how we get to now that this row is address then log the  'addressResponse' to see why we are chosing it
    })

})

// normal-metadata request is actually running two querys one after other 

app.get("/better-metadata", async (req, res) => {
    const id = req.query.id;

    const query = `
    SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
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
