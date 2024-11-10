const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { userModel, todoModel } = require("./02_database")
const { auth, JWT_SECRET } = require("./03_authentication")
const app = express()

async function databaseConnections(req, res, next) {
    await mongoose.connect("<MongoDB connection url here>")
    next()
}

app.use(express.json());
app.use(databaseConnections);

app.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    const findUser = await userModel.findOne({
        email:email
    })

    if(!findUser){

    await userModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        messege: "You are signed up"
    })
    }else{
        return res.status(403).send({
            messege: "An user already exists with the same email"
        });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({
        email: email,
        password: password
    })
    if (findUser) {
        const userToken = jwt.sign({
            userID: findUser._id
        }, JWT_SECRET);

        res.json({
            Token: userToken,
            name: findUser.name
        });
    } else {
        return res.status(403).send({
            messege: "Invalid email or password"
        });
    }
});

app.post("/todo", auth, async (req, res) => {
    const {todo, done} = req.body;
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

app.get("/my_todos", auth, async (req,res)=>{
    const userID = req._id.toString();
    const allTodos = await todoModel.find({})
    const specificUserTodos = allTodos.filter(todo => todo.userId === userID)

    res.json({
        specificUserTodos
    });
})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});
