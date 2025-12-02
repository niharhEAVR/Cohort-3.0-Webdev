import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies to be sent
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


// const allowedOrigins = [
    //     "http://localhost:5173",
    // ];
    
    // app.use(cors({
    //     origin: function (origin, callback) {
    //         console.log(origin);
            
    //         if (!origin || allowedOrigins.includes(origin)) {
    
    //             return callback(null, true);
    //         }
    
    //         callback(new Error("Not allowed by CORS"));
    
    //     },
    //     credentials: true
    // }));