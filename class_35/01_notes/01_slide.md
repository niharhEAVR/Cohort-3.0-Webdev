### Todays class slide link

```
https://projects.100xdevs.com/tracks/gZf9uBBNSbBR7UCqyyqT/prisma-1
```

---

### Install this extension from vscode market for using prisma

```link
https://marketplace.visualstudio.com/items?itemName=Prisma.prisma
```

---

### All the commands that is used in todays class:

- There is a Huge changes in Prisma 7 so do follow this [Docs](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres).

```bash
npm init -y
npm install typescript @types/express --save-dev
npm install express dotenv
npx tsc --init
npx tsc -b # for compiling ts files


npm install prisma @types/node @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg dotenv
npx prisma init # This will inject these file in my project: prisma/schema.prisma, .env, .gitignore, prisma.config.ts
# All you need to put your databse url inside the .env file and dont change anything.

# At first we have to set the table then we have to migrate
npx prisma migrate dev --name <migration_name>

npx prisma generate

# And next time if we update the table, we again have to migrate
npx prisma migrate dev 
```

For the new version the prisma.config.ts file in on the root folder that why typescript will give error because the all .ts file should inside the ./src folder thats why we have to manually add this in the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    //...
  },
  "include": ["src/**/*"]
}
```


---
---
---



### Flow of Prisma

1. First User table

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
}
```

```sh
> npx prisma migrate dev --name init

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "neondb", schema "public" at "ep-billowing-smoke-ahk9ej3t-pooler.c-3.us-east-1.aws.neon.tech"

Applying migration `20251211103428_init`

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20251211103428_init/
    └─ migration.sql

Your database is now in sync with your schema.
```

---

2. Update User table

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
  email    String @unique
}
```

```sh
> npx prisma migrate dev --name updated_users
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "neondb", schema "public" at "ep-billowing-smoke-ahk9ej3t-pooler.c-3.us-east-1.aws.neon.tech"


⚠️  Warnings for the current datasource:

  • A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

√ Are you sure you want to create and apply this migration? ... yes
Applying migration `20251211104034_updated_users`

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20251211104034_updated_users/
    └─ migration.sql

Your database is now in sync with your schema.
```

---

3. Update User table

```prisma
model users {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
  email    String @unique
  todos    todos[]
}

model todos {
  id     Int     @id @default(autoincrement())
  title  String
  done   Boolean @default(false)
  userId Int
  user   users   @relation(fields: [userId], references: [id])
}
```

```sh
> npx prisma migrate dev --name updated_users
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "neondb", schema "public" at "ep-billowing-smoke-ahk9ej3t-pooler.c-3.us-east-1.aws.neon.tech"


⚠️  Warnings for the current datasource:

  • A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

√ Are you sure you want to create and apply this migration? ... yes
Applying migration `20251211104034_updated_users`

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20251211104034_updated_users/
    └─ migration.sql

Your database is now in sync with your schema.
```

---

4. Client Generation


```sh
> npx prisma generate
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (7.1.0) to .\src\generated\prisma in 39ms

```