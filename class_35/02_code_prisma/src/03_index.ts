import express from "express";
const app = express()

import { prismaClient } from "./lib/prisma.js"

app.get("/user/:id", async (req, res) => {
    try { // http://localhost:3000/user/3
        const id = req.params.id
        const user = await prismaClient.users.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                todos: true,
                username: true
            }
        })
        res.json({
            user
        })
    } catch (error) {
        console.log(error);

    }
})


app.get("/todo/:id", async (req, res) => {
    try { // http://localhost:3000/todo/3
        const id = req.params.id
        const todo = await prismaClient.todos.findMany({
            where: {
                userId: Number(id)
            }
        })
        res.json({
            todo
        })
    } catch (error) {
        console.log(error);

    }
})

app.listen(3000)