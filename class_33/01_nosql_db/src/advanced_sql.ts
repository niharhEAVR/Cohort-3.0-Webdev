import dotenv from 'dotenv';
import pg from 'pg';
import express from 'express';

dotenv.config();

const { Client } = pg;
const app = express();
app.use(express.json());

const client = new Client(process.env.POSTGRES_URL)


async function main() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

main();

// @ts-ignore
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3);
    `;
    await client.query(insertQuery, [username, email, password]);
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (err) {
    console.error("Error inserting data into the database:", err);
    res.status(500).json({ message: "An error occurred while signing up." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
