/*
    const express = require("express")
    const Router = express.Router

    >this two line of code exactly same ad this:

    const { Router } = require("express");

    ---
    const userRouter = Router();
     
    this line means as when we do 'const app = express()', its exactly the same thing happening here

    ---
    The benefit of using this is that we no need to everytime use user/singup, we can only use signup and the /user will automatically get attached because of the express route
*/
const { Router } = require("express");
const userRouter = Router(); // and this thing we will export


const { userModel, purchaseModel, courseModel } = require("../database");

const jwt = require("jsonwebtoken");
const  { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");


userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB

    // TODO: Put inside a try catch block
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    
    res.json({
        message: "Signup succeeded"
    })
})

userRouter.post("/signin",async (req, res) => {
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email,
        password: password
    }); //[]

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}