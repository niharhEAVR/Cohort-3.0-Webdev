const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../database");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_SECRET } = require("../config")
const { adminMiddleware } = require("../middleware/admin");


adminRouter.post("/signup", async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(password, 5)

    try {
        await adminModel.create({
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

adminRouter.post("/signin", async (req, res) => {
    const requiredInput = zod.object({
        email: zod.string().min(7).max(100).email(),
        password: zod.string().min(6).max(100)
    });
    let inputChecking = requiredInput.safeParse(req.body)
    if (!inputChecking.success) {
        return res.status(403).json({
            messege: "Invalid Inputs",
            error: inputChecking.error.errors
        })
    }

    const { email, password } = req.body;

    const finduser = await adminModel.findOne({
        email: email
    });
    if (!finduser) {
        return res.status(403).json({
            messege: "Wrong Crendentials!"
        })
    }

    const checkPassword = await bcrypt.compare(password, finduser.password)

    if (checkPassword) {
        const token = jwt.sign({
            id: finduser._id,
        }, JWT_ADMIN_SECRET);

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        creatorId: adminId, // this is for , if in db there is too many admins
        _id: courseId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}