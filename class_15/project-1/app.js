require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());


app.use("/user", userRouter); // hold ctrl on keyboard and hover over one on the route then see a thing
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
// benefits of using these routes in showed on 01_notes.md

(async ()=> {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000, ()=>{
        console.log("server: http://localhost:3000")
    });
})()// we used an async IIFE to connect the mongodb first then do operations