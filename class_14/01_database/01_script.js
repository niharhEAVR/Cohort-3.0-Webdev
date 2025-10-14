const bcrypt = require("bcrypt")
const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const zod = require("zod")
require('dotenv').config();

const { userModel, todoModel } = require("./02_database")
const { auth, JWT_SECRET } = require("./03_authentication")

const app = express()
app.use(express.json())


app.use(async (req, res, next) => {
    await mongoose.connect(process.env.MONGO_URL)
    next()
});

app.post("/signup", async (req, res) => {
    const requiredInput = zod.object({
        email: zod.string().min(7).max(100).email(),
        password: zod.string().min(6).max(100),
        name: zod.string()
    }); // (i think you are smart enough to understand what is going on here and if you not the read 04_input_validation.md)

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
        const hashedPassword = await bcrypt.hash(password, 15)
        // read 03_notes.md to understand the upper line
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
    // the try-catch is using here is because if any other user tries to signup with an email that already exists (email: {type: String, unique: true}) in the server database then server backend will crash automatically, for stopping this crash we use try catch here (and i think you are smart enough to know what try-catch is doing here.)
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
    const { todo, done } = req.body;
    const userID = req._id;

    await todoModel.create({
        todo: todo,
        done: done,
        userId: userID
    })
    res.json({
        messege: "Your todo had created."
    })
})

// bad way without relationship
// app.get("/my_todos", auth, async (req, res) => {
//     const userID = req._id.toString();
//     const allTodos = await todoModel.find({})
//     const specificUserTodos = allTodos.filter(todo => todo.userId === userID)
//     res.json({
//         specificUserTodos
//     });
// })

// good way using relationships
app.get("/my_todos", auth, async (req, res) => {
    try {
        // Get all todos for the logged-in user
        const todos = await todoModel.find({ user: req._id });

        res.json({ todos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})