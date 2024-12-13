import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;

const client = new Client(process.env.POSTGRES_URL)

async function main() {
    await client.connect();


    const result = await client.query('SELECT * FROM users');

    console.log(result);

}
main()
