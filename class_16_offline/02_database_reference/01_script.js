require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const app = express()
app.use(express.json())



app.use("/user", userRouter)
app.use("/course", courseRouter)

app.listen(3000, () => {
    console.log("server: http://localhost:3000")
});