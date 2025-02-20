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
const zod = require("zod");
const bcrypt = require("bcrypt");
const { JWT_USERS_SECRET } = require("../config")
const { userMiddleware } = require("../middleware/user");


userRouter.post("/signup", async (req, res) => {
    const requiredInput = zod.object({
        email: zod.string().min(7).max(100).email(),
        password: zod.string().min(6).max(100),
        firstName: zod.string(),
        lastName: zod.string()
    });

    const inputChecking = requiredInput.safeParse(req.body)
    if (!inputChecking.success) {
        return res.status(403).json({
            messege: "Invalid Inputs",
            error: inputChecking.error.errors
        })
    }


    const { email, password, firstName, lastName } = req.body;

    let hashedPassword = await bcrypt.hash(password, 5)

    try {
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.json({
            message: "Signup succeeded"
        })
    } catch (error) {
        res.status(403).json({
            message: "An user with the same email address already exists"
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const requiredInput = zod.object({
        email: zod.string().min(7).max(100).email(),
        password: zod.string().min(6).max(100)
    });
    let inputChecking = requiredInput.safeParse(req.body)
    if(!inputChecking.success){
        return res.status(403).json({
            messege: "Invalid Inputs",
            error: inputChecking.error.errors
        })
    }

    const { email, password } = req.body;

    const finduser = await userModel.findOne({
        email: email
    });
    if(!finduser){
        return res.status(403).json({
            messege: "Wrong Crendentials!"
        })
    }

    const checkPassword = await bcrypt.compare(password, finduser.password)

    if (checkPassword) {
        const token = jwt.sign({
            id: finduser._id,
        }, JWT_USERS_SECRET);

        // Do cookie logic (later we will learn about this but for now do some window shopping)

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Password"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });


    const coursesData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    }) // if you dont understood this then read the 05_note in notes folder

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}