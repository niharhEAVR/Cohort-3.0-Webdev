const { Router } = require("express")
const userRouter = Router()

const { userModel, courseModel } = require("../02_database");

userRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    await userModel.create({
        username: username,
        password: password,
    })
    res.json({
        message: "Signed up"
    })
})

userRouter.get("/coursePreview", async (req, res) => {
    const allCourses = await courseModel.find({})
    res.json({
        allCourses
    })
})


userRouter.put("/courseBuy/:courseId", async (req, res) => {
    const { courseId } = req.params
    const username = req.headers.username

    await userModel.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
        // read 02_notes.md in 01_notes folder
    })
    res.json({
        message: "course purchased succesfully"
    })
})


userRouter.get("/purchases", async (req, res) => {
    const username = req.headers.username

    const user = await userModel.findOne({
        username: username
    });


    const coursesData = await courseModel.find({
        _id: { $in: user.purchasedCourses }
        // if you dont understand this then read 02_notes.md in 01_notes folder
    })

    res.json({
        coursesData
    })
})

module.exports = {
    userRouter
}