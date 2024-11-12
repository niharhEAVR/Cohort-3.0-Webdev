const {Router} = require("express")
const courseRouter = Router()
const {courseModel} = require("../02_database")


courseRouter.post('/createCourses', async (req, res) => {
    const {title, description, price} = req.body;

    const newCourse = await courseModel.create({
        title,
        description,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});


module.exports = {
    courseRouter
}