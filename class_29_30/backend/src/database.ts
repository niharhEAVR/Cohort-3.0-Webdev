import mongoose, { model, Schema } from "mongoose";
import { MONGO_URL } from "./config";

mongoose.connect(MONGO_URL)

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
})

export const UserModel = model("users", UserSchema);





const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
})

export const ContentModel = model("contents", ContentSchema);