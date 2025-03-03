## the commands that are using in this class:

```bash
npx create-turbo@latest draw-app

cd draw-app

pnpm install

pnpm run dev
```


one more thing is that remove the .git folder for no external git commits


---

## For setting the monorepo in this class we have did all these things:

```text
1. Initializes An Turborepo
2. Deleted Docs app
3. Added http-backend, ws-backend in the apps folder
4. Addes package.json in both the places
5. Added tsconfig.json in both the places, and imported it from @repo/typescript-config/base.json
6. Added @repo/typescript-config as a dependency in both ws-server and http-server
---
7. Added a build, dev and start script to both the projects (http and ws server)
8. Update the turbo-config in both projects (http and ws server) means the rootdir and outdir
9. Initialize a http server, initialize a websocket server
---
10. Write signup, signin, create-room endpoint
11. Write the middlewares that decode the token and get the create-room ep
12. Decode the token in the websocket server as well, Send the token to the websocket server in query param for now
13. Initialize a new `db` package where you write the schema of the project
14. Import the db package in the http layer and start putting things in the DB
---
15. Add a `backend-common` package where we add the zod schema and the JWT-secret
```