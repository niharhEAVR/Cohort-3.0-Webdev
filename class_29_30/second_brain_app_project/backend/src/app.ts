import express from "express";
import authRouter from "./routes/authentication/auth";
import contentRouter from "./routes/content/content";
import shareRouter from "./routes/share/share";
const app = express();
app.use(express.json());

app.use("/api/v1",authRouter);
app.use("/api/v1",contentRouter);
app.use("/api/v1/brain",shareRouter);


app.listen(3000, () => {
    console.log("Backend running on port 3000");
})