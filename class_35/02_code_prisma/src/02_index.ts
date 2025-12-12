import { prismaClient } from './lib/prisma.js'

async function main() {
    const todo = await prismaClient.todos.create({
        data: {
            title: "finish college work",
            done: true,
            userId: 3
        },
    })
    console.log('Created todo:', todo)


    const allTodos = await prismaClient.todos.findMany()
    console.log('All Todos:', JSON.stringify(allTodos, null, 2))

    const user = await prismaClient.users.findFirst({
        where: {
            id: 3
        },
        include: {
            todos: true
        }
    })
    console.log(user);
    
}

main()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })