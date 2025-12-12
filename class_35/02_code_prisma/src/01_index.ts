import { prismaClient } from './lib/prisma.js'

async function main() {
    const user = await prismaClient.users.create({
        data: {
            username: 'noname',
            email: 'noname@prisma.io',
            password: 'securepassword',
            age: 30,
        },
    })
    console.log('Created user:', user)


    const allUsers = await prismaClient.users.findMany()
    console.log('All users:', JSON.stringify(allUsers, null, 2))
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