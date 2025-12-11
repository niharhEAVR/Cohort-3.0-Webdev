import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;

const client = new Client(process.env.POSTGRES_URL)

async function main() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Failed to connect to the database", err);
    }

    const response = await client.query(

        `CREATE TABLE addresses(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );`
    )

    const response2 = await client.query(

        `CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`
    )

    await client.end();
    console.log(response.command === "CREATE" ? "addresses table created" : "addresses table not created");
    console.log(response2.command === "CREATE" ? "users table created" : "users table not created");
}
main();