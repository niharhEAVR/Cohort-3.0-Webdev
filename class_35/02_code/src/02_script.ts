import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function createTodo() {
    await prisma.todo.create({
        data: {
            title: "finish college work",
            done: true,
            userId: 3
        }
    })
}

createTodo();

async function findUser() {
    const user = await prisma.users.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    })

    console.log(user);
}

// findUser();