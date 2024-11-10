const mongoose = require('mongoose')
// https://www.npmjs.com/package/mongoose
// learn more about mongoose here

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users = new Schema({
    author: ObjectId,
    email: String,
    password: String,
    name: String
});
const todos = new Schema({
    author: ObjectId,
    todo: String,
    done: Boolean,
    userId: String
});

const userModel = mongoose.model('todo_app_users',users)
const todoModel = mongoose.model('todos',todos)

module.exports = {
    userModel,
    todoModel
}