const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "courses" 
    }]
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
});

const userModel = mongoose.model("users",userSchema)
const courseModel = mongoose.model("courses",courseSchema)

module.exports = {
    userModel,
    courseModel
}