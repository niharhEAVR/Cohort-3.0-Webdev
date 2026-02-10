### Todays class slide link:

- [official notes](https://projects.100xdevs.com/tracks/monorepo/monorepo-1)

- class formed upto slide no 11 to 

- if the notes website doesnt opens then use this [notion note](https://petal-estimate-4e9.notion.site/Monorepos-b40e9c44a2ee4fe3badc3883841fc2c0)



---

### Steps of todays class

1. **first initialized a turborepo**

```sh
npx create-turbo@latest
? Where would you like to create your Turborepo? .
? Which package manager do you want to use? npm
```

2. **then from apps folder delete default projects and created a new next app and a http app and a ws app (simple)**

```sh
cd apps

npx create-next-app@latest web # with default settings

mkdir http-server
cd .\http-server
touch turbo.json
npm init -y # make the package.json "type": "module",
npm i express @types/express
npm i typescript -D

mkdir ws-server
cd .\ws-server
touch turbo.json
npm init -y # make the package.json "type": "module",
npm i ws @types/ws
npm i typescript -D
# both the http & ws server's package.json files add a dev and a build script
# for both the backend server add a turbo.json file individually and read this 13_individual_turbo.json.md
```

- `turbo.json`

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

- as we can see these two ws and http server uses the same tsconfig file. to merge it in one file read the 05_shared_tsconfig.md

- your configuration should looks like this

- `packages\typescript-config\backend.json`

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "types": [],

    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,


    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

- `apps\http-server\tsconfig.json`

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "extends":"@repo/typescript-config/backend.json",
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",

  }
}
```

- `apps\ws-server\tsconfig.json`

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "extends":"@repo/typescript-config/backend.json",
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",

  }
}
```

3. **so the backends servers setup is done now the setup need for the next app**

- we already initialized it, now inside page.tsx file we need to use of external components from the packages/ui folder 

- for that read the 06_how_to_access_ui.md

- there is 2 steps only

- 1st change package.json

```json
"dependencies": {
    "@repo/ui": "*",
```

- then

```sh
apps\web> npm install 
# after that you can import components from the ui folder
```

- this way we can access of any components wherewvwe we wants
- if there is 100 next js projects in the apps folder then that 100 next js projects can use the same button for its own workings


---


4. **After all these setup of you run the `npm run dev`**

- then all the projects will run simultaneouly