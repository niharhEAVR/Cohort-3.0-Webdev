import { type Request, type Response, Router } from "express";
const contentRouter = Router();
import { contentModel, tagModel } from "../../db/database";
import { userMiddleware } from "../../middleware/middleware";
import { contentSchema } from "../../assets/inputCheck";
import { Types } from "mongoose";
import th from "zod/v4/locales/th.js";



contentRouter.get("/content", userMiddleware, async (req: Request, res: Response) => {
    const userId = (req as Request & { userId: string }).userId
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
        .populate("tags", "title")
    res.status(200).json({
        content
    })

    // must put token in the header file.
})


contentRouter.post("/content", userMiddleware, async (req: Request, res: Response) => {
    const userId = (req as Request & { userId: string }).userId
    try {
        const parseResult = contentSchema.safeParse(req.body);
        if (!parseResult.success) {
            const errors = parseResult.error.issues.map((i) => i.message);
            return res.status(411).json({ message: "Error in inputs", errors });
        }

        const { link, type, title, tags } = parseResult.data;

        let tagIds: Types.ObjectId[] = [];
        if (tags && tags.length > 0) {
            tagIds = await Promise.all(
                tags.map(async (tagTitle) => {
                    const existingTag = await tagModel.findOne({ title: tagTitle });
                    if (existingTag) return existingTag._id;
                    const newTag = await tagModel.create({ title: tagTitle });
                    return newTag._id;
                })
            );
        }

        const content = await contentModel.create({
            link,
            type,
            title,
            userId,
            tags: tagIds,
        });

        if (!content) throw new Error("Content creation failed");
        const populatedContent = await contentModel.findById(content._id)
            .populate("tags", "title")

        res.status(201).json({ message: "Content added", content: populatedContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding content", error });
    }

    /* input for adding content
    {
        "link":"https://example.com/article",
        "type":"article",
        "title":"An Interesting Article",
        "tags":["tech","news"]
    }
    */
})


contentRouter.delete("/content", userMiddleware, async (req, res) => {
    try {
        if (!Types.ObjectId.isValid(req.body.contentId)) {
            return res.status(400).json({ message: "Invalid contentId" });
        }
        const { contentId } = req.body;

        const deleted = await contentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId!
        });

        if (!deleted) return res.status(403).json({ message: "Trying to delete a doc you don’t own" });

        res.status(200).json({
            message: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "server error", error
        });
    }
})




export default contentRouter;