import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
    await prisma.users.create({
        data: {
            username: "subhash",
            password: "bhashu",
            age: 32,
            email: "subhash@smail.com"
        }
    })
}

// createUser();


async function findUser() {
    const user = await prisma.users.findFirst({
        where: {
            id: 1
        }
    })

    console.log(user);
}

findUser()

// read the 05_code_explanation.md