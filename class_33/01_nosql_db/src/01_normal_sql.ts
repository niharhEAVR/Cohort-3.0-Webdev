import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;

const client = new Client(process.env.POSTGRES_URL)

async function main() {
    try {
        await client.connect();
        console.log("db connected");

        const insertResult = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', ['john_doe', 'john@example.com', 'password123']);
        console.log(insertResult.rows[0]);

        const selectResult = await client.query('SELECT * FROM users');

        console.log(selectResult.rows);

        await client.end();
    } catch (error) {
        console.log(error);
    }
}
main()
