# 🌱 **What is Seeding in Prisma?**

**Seeding** means inserting *initial* or *dummy* data into your database — usually right after the schema/migrations are applied.

It is used when:

* New developers join the project
* You want default admin users
* You want test data
* You need pre-filled categories/products
* You need something to test the app without manually creating data

Prisma offers a built-in seeding system.

---

# 🗂 **Where does the seed file live?**

Typical structure:

```
prisma/
   schema.prisma
   seed.ts         ← here
   migrations/
```

---

# 💡 WHAT DOES A SEED FILE DO?

A `prisma/seed.ts` file:

* Creates sample users
* Creates sample posts
* Inserts required system data
* Ensures the database has the necessary initial records

Example:

```ts
import { prisma } from '../src/lib/prisma'   // change path depending on your project

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      posts: {
        create: {
          title: 'Welcome to the project!',
        },
      },
    },
  })
}

main()
  .then(() => console.log("Database seeded!"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
```

---

# 📌 **How Prisma knows how to run the seed file?**

In your `package.json`, Prisma adds this automatically when you run:

```bash
npx prisma init
```

You will see:

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

This tells Prisma:

* When someone runs `npx prisma db seed`,
* Execute `tsx prisma/seed.ts`.

---

# 🚀 **How to run the seed script**

Very simple:

```bash
npx prisma db seed
```

Prisma will:

1. Connect to your database
2. Run the code inside `seed.ts`
3. Insert the initial data
4. Log “Database seeded!”

---

# 🔁 **Seed runs automatically inside `prisma migrate reset`**

This is the part you asked earlier:

When a new developer runs:

```bash
npx prisma migrate reset
```

Prisma will:

✔ Drop the DB
✔ Apply all migrations
✔ **Then automatically run the seed file**

Example output:

```
Applying migration...
Running seed command...
Database seeded!
```

So seeds are **automatic** for new contributors.

---

# 🧠 WHY SEEDING IS IMPORTANT FOR OPEN SOURCE PROJECTS

Imagine a new contributor clones your project.

Without seeds:

* Database is empty
* No admin user
* No sample posts
* No categories
* App may break due to missing records

With seeds:

* They instantly get sample data
* App works immediately
* They can start debugging real features
* No need to manually insert anything

---

# 🧪 Example Full Seed (More Advanced)

```ts
async function main() {
  // Create users
  const user = await prisma.user.create({
    data: {
      email: "test@user.com",
      name: "Test User"
    }
  })

  // Create many categories
  await prisma.category.createMany({
    data: [
      { name: "Tech" },
      { name: "Science" },
      { name: "Sports" }
    ]
  })

  // Create posts for the user
  await prisma.post.createMany({
    data: [
      { title: "Prisma is awesome", userId: user.id },
      { title: "Hello world", userId: user.id }
    ]
  })
}
```

---

# 🧩 Summary (Simple)

| Term                   | Meaning                                               |
| ---------------------- | ----------------------------------------------------- |
| **Seed file**          | Script to insert initial/sample data                  |
| **Location**           | `prisma/seed.ts`                                      |
| **Execute manually**   | `npx prisma db seed`                                  |
| **Runs automatically** | After `npx prisma migrate reset`                      |
| **Purpose**            | Help new developers + create default database records |
