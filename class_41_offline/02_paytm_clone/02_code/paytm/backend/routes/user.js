const express = require('express');

const router = express.Router();
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');
const { User, Account } = require("../db");
const jwt = require('jsonwebtoken')

const { auth } = require("../middleware")

async function databaseConnection() {
    try {
        mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log("Error connecting to the database!");
    }
}

databaseConnection()

router.post("/signup", async (req, res) => {
    const { username, password, firstName, lastName } = req.body
    const user = await User.create({ username: username, password: password, firstName: firstName, lastName: lastName })
    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    res.json({
        messege: "You are signed up"
    })

})

router.post("/signin", async (req, res) => {
    const { username, password } = req.body
    const findUser = await User.findOne({
        username: username,
        password: password
    })

    if (findUser) {
        const userToken = jwt.sign({
            userID: findUser._id
        }, "secret");

        res.json({
            Token: userToken,
            name: findUser.firstName
        });
    } else {
        return res.status(403).send({
            messege: "Invalid email or password"
        });
    }

})


router.get("/bulk", async (req, res) => { // read the 02_bulk_endpoint.md
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;