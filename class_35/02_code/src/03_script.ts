import express from "express";
const app = express()

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.get("/user", async (req, res) => {
    const user = await prisma.users.findFirst({
        where: {
            id: 1
        },
        select: {
            todos: true,
            username: true
        }
    })

    res.json({
        user
    })

})


app.get("/todo/:id", async (req, res) => {
    const id = req.params.id
    const todo = await prisma.todo.findMany({
        where:{
            userId: Number(id)
            
        }
    })
    res.json({
        todo
    })
})

app.listen(3000)