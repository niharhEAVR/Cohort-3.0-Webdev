# ✅ **Scenario**

Your open-source project **already contains multiple migration files** inside:

```
/prisma
  /migrations
    202401010101_init
    202402050921_add_posts
    202403120855_add_comments
  schema.prisma
```

A *new developer* wants to clone the repo and run the project locally.

---

# ⭐ **WHAT THE NEW DEVELOPER MUST DO**

There are **only 4 steps** they need to follow to set up *the database schema* from your existing migrations.

---

# 1️⃣ **Clone the repository**

```bash
git clone <repo-url>
cd <project-name>
```

---

# 2️⃣ **Install dependencies**

```bash
npm install
```

---

# 3️⃣ **Create a `.env` file with a DATABASE_URL**

If you use PostgreSQL / Neon / Prisma Postgres:

Example:

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

If you are using **Prisma Postgres serverless**, the URL is generated when they run:

```bash
npx prisma init --db
```

But in most open-source projects, you simply provide a `.env.example`.

Example:

```
cp .env.example .env
```

---

# 4️⃣ **Run the migrations into their local DB**

This is the MOST IMPORTANT PART.

The new dev should run:

```bash
npx prisma migrate reset
```

### What this does:

✔ Drops the entire local DB
✔ Applies **all existing migrations in your repo** in correct order
✔ Recreates schema EXACTLY as your project expects
✔ Seeds data if a seed script exists (optional)

Confirm prompt → Type **y**.

---

### Why NOT `prisma migrate dev`?

Because:

* `migrate dev` **creates new migration files**
* we **do NOT want new developers generating migrations**
* we ONLY want them to apply existing migrations

So the best practice is:

👉 **Use `migrate reset` for fresh setup**

---

# 5️⃣ (Optional) Run seeds

If you have a `prisma/seed.ts` file:

```bash
npx prisma db seed
```

---

# What Happens Internally?

Prisma runs:

1. migration 1
2. migration 2
3. migration 3
4. ... all the way to latest

This re-creates the **exact schema** your project uses in production.

That’s why open-source projects MUST commit migrations.

---

# 🧠 **What if a new developer modifies schema?**

If they change `schema.prisma`, they must run:

```bash
npx prisma migrate dev --name some-change
```

This generates a NEW migration file, which they commit via PR.

---

# 🧩 Summary (What new developers do)

| Task              | Command                    |
| ----------------- | -------------------------- |
| Install project   | `npm install`              |
| Environment setup | Create `.env`              |
| Create DB schema  | `npx prisma migrate reset` |
| Optional seed     | `npx prisma db seed`       |
| Run project       | `npm run dev`              |

---

# 🚀 **Example instructions to put in README.md**

Here’s what you should include in README:

````md
## Local Setup

1. Clone the project  
```bash
git clone https://github.com/your/repo.git
cd repo
````

2. Install dependencies

```bash
npm install
```

3. Copy environment file

```bash
cp .env.example .env
```

4. Apply database migrations

```bash
npx prisma migrate reset
```

5. Start development server

```bash
npm run dev
```

```yaml
Put that in your README and every new developer will be able to start instantly.
```