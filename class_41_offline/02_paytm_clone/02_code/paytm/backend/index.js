const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');
const { User, Account } = require("./db");
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const {auth} = require("./middleware")

async function databaseConnection() {
    try {
        mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log("Error connecting to the database!");
    }
}

databaseConnection()

app.post("/signup", async (req, res) => {
    const { username, password, firstName, lastName } = req.body
    const user = await User.create({ username: username, password:password, firstName:firstName, lastName:lastName })
    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    res.json({
        messege: "You are signed up"
    })

})

app.post("/signin", async (req, res) => {
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
            name: findUser.name
        });
    } else {
        return res.status(403).send({
            messege: "Invalid email or password"
        });
    }

})


app.get("/balance", auth, async (req, res) => {
    const account = await Account.findOne({
        userId: req._id
    });    

    res.json({
        balance: account.balance
    })
});

// restart again the video

// app.post("/transfer", auth, async (req, res) => {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req._id }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Insufficient balance"
//         });
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Invalid account"
//         });
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     res.json({
//         message: "Transfer successful"
//     });
// });




app.listen(3000)