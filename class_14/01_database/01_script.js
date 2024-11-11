const bcrypt = require("bcrypt")
const express = require("express")
const mongoose = require("mongoose")
const zod = require("zod")
require('dotenv').config();
const { userModel, todoModel } = require("./02_database")
const { auth, JWT_SECRET } = require("./03_authentication")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())

async function databaseConnection(req, res, next) {
    await mongoose.connect(process.env.MONGO_URL)
    next()
}
app.use(databaseConnection)

app.post("/signup", async (req, res) => {
    const requiredInput = zod.object({
        email: zod.string().min(7).max(100).email(),
        password: zod.string().min(6).max(100),
        name: zod.string()
    }); // (i think you are smart enough to understand what is going on here and if you not the read 03_input_validation.md)

    // const parsedData = requiredInput.parse(req.body) // the downside of this parse is that we need to implement try-catch if we are using it, because it will parse or it will through error

    // thats why safeParse is better and safeParse gives us and object like
    /*
        {
            success: true || false,
            data: {}
            errors: {}
        } 
    */

    const parsedDataWithSuccess = requiredInput.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        return res.status(403).json({
            message: "Invalid format of email or minimum password is 6 characters",
            errors: parsedDataWithSuccess.error.errors  // Gives details about validation errors
        });
    }

    const { email, password, name } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 5)
        // read 02_notes.md to understand the upper line

        await userModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        res.json({
            messege: "Signed up succesfully."
        })
    } catch (error) {
        res.json({
            messege: "an user with a same email id already exists"
        })
    }
    // the try-catch is using here is because if any other user tries to signup with an email that already exists in the server database then server backend will crash automatically, for stopping this crash we use try catch here (and i think you are smart enough to know what try-catch is doing here.)
})

app.post("/signin", async (req, res) => {
    const { email, password } = req.body
    const findUser = await userModel.findOne({
        email: email,
    })
    if (!findUser) {
        return res.status(403).json({
            messege: "The user doesnot exists"
        })
    }

    const passwordCheck = await bcrypt.compare(password, findUser.password)

    if (passwordCheck) {
        const userToken = jwt.sign({
            userID: findUser._id
        }, JWT_SECRET)
        res.json({
            token: userToken
        })
    } else {
        res.status(403).json({
            messege: "wrong credential"
        })
    }
})
app.post("/todo", auth, async (req, res) => {

})
app.get("/my_todos", auth, async (req, res) => {

})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})