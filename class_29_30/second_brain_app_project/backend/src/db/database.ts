import mongoose, { Schema, model, Types, Document } from "mongoose"; // mongoose is the root object, and anythings is inside the {} is inside the mongoose, here we are destructuring it.
import { MONGO_URL } from "../assets/config";

(async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
})();

interface IUser extends Document {
    username: string;
    password: string;
    resetToken?: string | null;
    resetExpiry?: number | null;
    shareLink?: string | null;
    isShared?: boolean | false;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
    resetExpiry: { type: Number, default: null },
    shareLink: { type: String, default: null },
    isShared: { type: Boolean, default: false }
});

interface ITag extends Document {
    title: string;
}

const TagSchema = new Schema<ITag>({
    title: { type: String, required: true, unique: true },
});

type ContentType = "image" | "video" | "article" | "audio"; // Extend as needed
interface IContent extends Document {
    link: string;
    type: ContentType;
    title: string;
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
}

const contentSchema = new Schema<IContent>({
    link: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'article', 'audio'], required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const userModel = model("User", UserSchema); // In mongodb compass the collection name will be users (it makes it plural automatically by mongoose)
export const contentModel = model("Content", contentSchema);
export const tagModel = model("Tag", TagSchema);