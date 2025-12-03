import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

interface corsOptions{
    origin:string;
}
const corsOptions:CorsOptions = {
    origin: process.env.DEV_FRONTEND_URL
};

app.use(cors(corsOptions));



import authRouter from "./routes/authentication/auth";
import contentRouter from "./routes/content/content";
import shareRouter from "./routes/share/share";


app.use("/api/v1", authRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1/brain", shareRouter);


app.listen(3000, () => {
    console.log("Backend running on port 3000");
})