const { Router } = require("express");
const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
    res.status(200).json({
        adminRoutes:{
            signup: {
                method: "post",
                link: "http://localhost:3000/admin/signup"
            },
            signin: {
                method: "post",
                link: "http://localhost:3000/admin/signin"
            },
            course: {
                method: "put",
                link: "http://localhost:3000/admin/course"
            },
            courseBulk: {
                method: "get",
                link: "http://localhost:3000/admin/course/bulk"
            },
        }
    })
})

module.exports = {
    homeRouter: homeRouter
}