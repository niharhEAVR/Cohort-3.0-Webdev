const mongoose = require('mongoose')

const Schema = mongoose.Schema
const objectId = Schema.ObjectId

const user = {
    author: objectId,
    email: { type: String, unique: true }, //dont think that this unique will ckeck the email type, it will stop the server if another person tries to singup again with the same email
    password: String,
    name: String
}
const todo = {
    author: objectId,
    todo: String,
    done: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todo_app_user",
        required: true,
    }
}

const userModel = mongoose.model("todo_app_user", user)
const todoModel = mongoose.model("todos", todo)

module.exports = {
    userModel,
    todoModel
}