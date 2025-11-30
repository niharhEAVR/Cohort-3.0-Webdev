import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is missing in environment variables");
}
const MONGO_URL: string = process.env.MONGO_URL! // The non-null assertion operator (!) to tell TypeScript that the value will not be undefined.

const JWT_SECRET: string = process.env.JWT_SECRET! 

export { MONGO_URL, JWT_SECRET }