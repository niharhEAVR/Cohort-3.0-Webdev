import { type Request, type Response, Router } from "express";
const authRouter = Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "../../assets/config";
import { userModel } from "../../db/database";
import { signupSigninSchema, usernameOnlySchema, resetPasswordSchema } from "../../assets/inputCheck";
import crypto from "crypto";

authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const parseResult = signupSigninSchema.safeParse(req.body);

        if (!parseResult.success) {
            const errors = parseResult.error.issues.map((i) => i.message);
            return res.status(411).json({ message: "Error in inputs", errors });
        }

        const { username, password } = parseResult.data;

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(403).json({ message: "User already exists with this username" });
        }
        const hashed = await bcrypt.hash(password, 10);
        await userModel.create({ username, password: hashed });
        return res.status(200).json({ message: "Signed Up" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
    /* input for signup
    {
        "username":"foolcude",
        "password":"Fool@2004"
    }
    */
})


authRouter.post("/signin", async (req: Request, res: Response) => {
    try {

        const parseResult = signupSigninSchema.safeParse(req.body);

        if (!parseResult.success) {
            const errors = parseResult.error.issues.map((i) => i.message);
            return res.status(411).json({ message: "Error in inputs", errors });
        }


        const { username, password } = parseResult.data;

        const user = await userModel.findOne({
            username: username,
        })

        if (!user) {
            return res.status(403).json({ message: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password!);

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Invalid username or password" });
        }

        const userToken = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        return res.status(200).json({ message: "Logged in", token: userToken });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }

    /* input for signin
    {
        "username":"foolcude",
        "password":"Fool@2004"
    }
    */
})


authRouter.put("/forgotpass", async (req: Request, res: Response) => {
    try {
        const parseResult = usernameOnlySchema.safeParse(req.body);

        if (!parseResult.success) {
            const errors = parseResult.error.issues.map((i) => i.message);
            return res.status(411).json({ message: "Error in inputs", errors });
        }


        const { username } = parseResult.data;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

        // Save in database
        await userModel.updateOne(
            { username },
            {
                $set: {
                    resetToken,
                    resetExpiry
                }
            }
        );

        // SEND EMAIL → (fake for now)
        console.log("Reset link:", `https://yourapp.com/resetpass?token=${resetToken}`);

        return res.json({ message: "Password reset link sent to your email and it will valid for net 15 minutes only." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }

    /* input for forgotpass
    {
        "username":"foolcude"
    }
    */
})


authRouter.put("/resetpass", async (req: Request, res: Response) => {
    try {
        const parseResult = resetPasswordSchema.safeParse(req.body);

        if (!parseResult.success) {
            const errors = parseResult.error.issues.map((i) => i.message);
            return res.status(411).json({ message: "Error in inputs", errors });
        }

        const { token, newPassword } = parseResult.data;

        const user = await userModel.findOne({
            resetToken: token,
            resetExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        await userModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashed
                },
                $unset: { resetToken: "", resetExpiry: "" } // delete token
            }
        );

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }


    /* input for resetpass
    {
        "token":"8304ef16ad981d6aeb356fbe74b3f3e05532deda5e6c29112df7927808d83597",
        newPassword:"fOOl#1cude"
    }
    */
});

export default authRouter;