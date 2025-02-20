const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: objectId
});

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const purchaseSchema = new Schema({
    userId: objectId,
    courseId: objectId
});

const userModel = mongoose.model("users", userSchema);
const courseModel = mongoose.model("courses", courseSchema);
const adminModel = mongoose.model("admin", adminSchema, "admin"); // here is a slight bug that when i was signing up in admin route then a new collection got created automatically in my data base, even i am asigining it with admin, but admins collection got created (read 04_admin_mongodb.md)

const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}