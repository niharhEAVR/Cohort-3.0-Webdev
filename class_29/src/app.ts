import {Request, Response } from "express";
import  express  from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const app = express()
import { UserModel, ContentModel } from "./database";
app.use(express.json())
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";

app.post("/api/v1/signup", async(req, res)=>{
    // zod validation
    try {
        const {username, password} = req.body;
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            messege: "Signed Up"
        })
    } catch (error) {
        res.status(403).json({
            messege: "User already exists with this username"
        })
    }
})

app.post("/api/v1/signin", async(req, res)=>{
        const {username, password} = req.body;

        const user = await UserModel.findOne({
            username: username,
            password: password
        })
        if(user){
            const userToken = jwt.sign({
                userTokenId: user._id
            },JWT_SECRET)
            res.json({
                Token: userToken
            })

        }else{
            res.status(403).json({
                messege: "User not exists"
            })
        }
})

app.post("/api/v1/content", userMiddleware, async (req:Request, res:Response) => {
    const userId = (req as Request & {userId: string}).userId
    try {
        const { link, type, title } = req.body;

        await ContentModel.create({
            link,
            type,
            title,
            userId:userId, // Should now be recognized
            tags: []
        });

        res.json({ message: "Content added" });
    } catch (error) {
        res.status(500).json({ message: "Error adding content", error });
    }
    
})

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})