## So we are building a something close to a Excalidraw clone, or a canvas where everyone can come a and do stuffs

## And also include a chat app

---

## the commands that are using in this class:

```bash
npx create-turbo@latest draw-app
```
choose `pnpm` as a package manager

```bash
cd draw-app

pnpm install

pnpm run dev
```


one more thing is that remove the `.git` folder for no external git commits


---

## For setting the monorepo in this class we have did all these things:

```html
1. Initializes An Turborepo
2. Deleted Docs app
3. Added http-backend, ws-backend in the apps folder
4. Addes package.json in both the places
5. Added tsconfig.json in both the places, and imported it from @repo/typescript-config/base.json
6. Added @repo/typescript-config as a dependency in both ws-server and http-server
    <!-- To understand the point 4,5,6 read the 03_very_imp_settings.md file -->
```

```html
7. Added a build, dev and start script to both the projects (http and ws server)
8. Update the turbo-config in both projects (http and ws server) means the rootDir and outDir
9. Initialize a http server, initialize a websocket server
```

```bash
pnpm add express # for the http-backend
pnpm add -D @types/express
```

```bash
pnpm add ws # for the ws-backend
pnpm add -D @types/ws
```

```html
10. Write signup, signin, create-room endpoint
11. Write the middlewares that decode the token and get the create-room endpoint
12. Decode the token in the websocket server as well, Send the token to the websocket server in query param for now
```
```bash
pnpm add jsonwebtoken  @types/jsonwebtoken # for the http-backend
```

```bash
pnpm add jsonwebtoken  @types/jsonwebtoken # for the ws-backend
```

```html
13. Initialize a backend-common package for `JWT_SECRET` and common package for `zod`. Where you write the secret of the jwt and schema of userInput
    <!-- A very important thing is that whenever we are adding something in global package folder and access it in the apps>http-backend or ws-backend, we have to globally run the `pnpm install` for accessing it with no issue-->
    <!-- Read 04_Pckage_setup.md for learn more -->
```

---
---
---

```html
14. Initialize a new `db` package where you write the schema of the project
15. Defining the Schema in prisma.schema
16. Import the db package in the http layer and start putting things in the Database
```

```bash
cd .\packages\db
pnpm init
npx tsc --init
pnpm add prisma @prisma/client
npx prisma init
```
after doing these we will get a prisma.schema
and when we write all of our table logic there, we will prompt this command:
```bash
npx prisma migrate dev --name init_schema
npx prisma generate
```
After doing this we set the database like we did for jwt_secret and zod on 04_Package_setup.md

```html
17. Complete the HTTP backend
18. WS layer, room management, broadcast messages
19. HTTP route for GET/chats?room=1,2,3
20. Frontend
```