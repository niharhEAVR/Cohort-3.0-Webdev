import { type Request, type Response, Router } from "express";
const shareRouter = Router();
import { userMiddleware } from "../../middleware/middleware";
import crypto from "crypto";
import { userModel, contentModel } from "../../db/database";


shareRouter.post("/share", userMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { share } = req.body;

        if (share !== true) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const result = await userModel.findOne({
            _id: userId!,
        })
        if (result?.isShared === true) {
            return res.status(400).json({ message: "The link is already sharing." });
        }

        const shareId = crypto.randomUUID();

        await userModel.findByIdAndUpdate(userId, {
            shareLink: shareId,
            isShared: true
        });

        res.status(200).json({ shareId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

shareRouter.get("/share/:shareId", async (req, res) => {
    try {
        const shareId = req.params.shareId;

        const user = await userModel.findOne({ shareLink: shareId });

        if (!user || !user.isShared) {
            return res.status(404).json({ message: "Link not found" });
        }

        const brainData = await contentModel.find({ userId: user._id })
            .populate("userId", "-_id username")
            .populate("tags", " title");

        // Want to Remove _id from populated fields
        // Use a minus sign (-) to exclude fields:

        res.status(200).json({ content: brainData,userName:user.username });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

shareRouter.put("/stopsharing", userMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { share } = req.body;

        if (share !== false) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const result = await userModel.findOne({
            _id: userId!,
        })
        if (!result?.isShared) {
            return res.status(400).json({ message: "Sharing is already stopped" });
        }

        await userModel.findByIdAndUpdate(userId, {
            isShared: false, shareLink: null
        }); // doing $unset will be bad as we may want to share again later, so just setting to null

        res.status(200).json({ message: "Sharing stopped" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

shareRouter.get("/checkshare", userMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const result = await userModel.findOne(
            { _id: userId! },
            { shareLink: 1, isShared: 1, _id: 0 }
        );

        console.log(result);

        if (result?.isShared !== true) {
            return res.status(200).json({ linkSharing: false });
        }

        return res.status(200).json({ message: "The link is already sharing.", linkSharing: true, link: result?.shareLink });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});



export default shareRouter;