import { PrismaClient } from '@prisma/client'

// @ts-ignore 
const prisma = globalThis.prisma ?? new PrismaClient()

// @ts-ignore 
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma



// the reason of creating this prisma file on a separate file is because open the database for only one time for every savings of total files

// learn it from here: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// or read the 05_singleton_prisma.md