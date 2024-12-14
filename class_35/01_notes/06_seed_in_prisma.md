### When the new developer comes in the team then we have to give him some seed to know about the database data storing

---


### **What is Seeding in Prisma?**

**Seeding** in Prisma refers to the process of populating your database with **initial data**. This is useful for setting up a default state in your database, such as adding default users, configuration settings, or mock data for testing and development purposes.

---

### **Why is Seeding Important?**

1. **Default Setup**:
   - Populate the database with default values required for the application to work.
   - For example, admin users, categories, or predefined roles.
   
2. **Testing**:
   - Create mock data to test application features locally or in CI/CD pipelines.
   
3. **Development**:
   - Developers can work with a predefined set of records, enabling faster development without manually inserting data.

---

### **How Does Prisma Handle Seeding?**

Prisma offers a flexible way to seed data by letting you write custom scripts in JavaScript or TypeScript. These scripts interact with the database using the `PrismaClient`.

---

### **Steps for Seeding in Prisma**

#### 1. **Set Up the `prisma/seed.ts` or `prisma/seed.js` File**
Create a file for your seed script under the `prisma/` directory (you can also use any other location).

#### Example: `prisma/seed.ts`
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    await prisma.users.createMany({
        data: [
            { username: 'user1', password: 'pass1', age: 25, email: 'user1@example.com' },
            { username: 'user2', password: 'pass2', age: 30, email: 'user2@example.com' },
        ],
    });

    // Seed todos
    await prisma.todos.createMany({
        data: [
            { title: 'Learn Prisma', completed: false, userId: 1 },
            { title: 'Build an app', completed: true, userId: 2 },
        ],
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
```

---

#### 2. **Configure Prisma to Use the Seed Script**
Update the `prisma` section in your `package.json` file to specify the seeding command:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

If you're using plain JavaScript:
```json
"prisma": {
  "seed": "node prisma/seed.js"
}
```

> Note: Make sure you install `ts-node` (`npm install -D ts-node`) if you're writing the seed script in TypeScript.

---

#### 3. **Run the Seed Command**
Execute the seed script with Prisma:
```bash
npx prisma db seed
```

---

### **What Happens When You Seed?**

1. **Database Connection**:
   - The seed script establishes a connection to your database using `PrismaClient`.

2. **Inserts Data**:
   - The script adds or updates data in the database as defined in the seed logic.

3. **Message or Exit**:
   - Once complete, it logs a success message or exits with an error if something goes wrong.

---

### **Seeding with Migrations**
You typically seed your database after running migrations:
```bash
npx prisma migrate dev
npx prisma db seed
```

This ensures the database structure matches the schema before inserting initial data.

---

### **Example Use Cases for Seeding**

1. **Admin User Creation**:
   Add a default admin account:
   ```typescript
   await prisma.users.create({
       data: { username: 'admin', password: 'securepassword', age: 35, email: 'admin@example.com' },
   });
   ```

2. **Testing with Mock Data**:
   Add 100 mock users using `faker.js` or similar libraries:
   ```typescript
   import { faker } from '@faker-js/faker';

   const mockUsers = Array.from({ length: 100 }).map(() => ({
       username: faker.internet.userName(),
       password: faker.internet.password(),
       age: faker.datatype.number({ min: 18, max: 65 }),
       email: faker.internet.email(),
   }));

   await prisma.users.createMany({ data: mockUsers });
   ```

3. **Predefined Categories**:
   ```typescript
   await prisma.categories.createMany({
       data: [
           { name: 'Technology' },
           { name: 'Health' },
           { name: 'Education' },
       ],
   });
   ```

---

### **Good Practices for Seeding**

1. **Idempotent Scripts**:
   - Ensure the seed script does not insert duplicate entries if re-run.
   - You can use `upsert` or check if records already exist.

   Example with `upsert`:
   ```typescript
   await prisma.users.upsert({
       where: { email: 'admin@example.com' },
       update: {}, // If it exists, don't update anything
       create: { username: 'admin', password: 'securepassword', age: 35, email: 'admin@example.com' },
   });
   ```

2. **Environment-Specific Seeding**:
   - Use different seed data for development, testing, and production environments.

   Example:
   ```typescript
   if (process.env.NODE_ENV === 'development') {
       // Add mock users for development
   } else if (process.env.NODE_ENV === 'production') {
       // Add minimal production-specific data
   }
   ```

3. **Avoid Sensitive Data**:
   - Avoid hardcoding sensitive information like real passwords in seed scripts.

---

### **Benefits of Prisma Seeding**
1. Automates the process of initializing the database.
2. Reduces manual effort to add testing or development data.
3. Ensures consistency in all environments (e.g., local, staging, production).
4. Enhances productivity by allowing developers to focus on actual code rather than setup.

---

By setting up seeding, you can streamline database initialization, maintain a clean and reliable development workflow, and enhance testing capabilities with ease.