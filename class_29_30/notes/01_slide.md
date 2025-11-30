### This is project class and the slides are:

[slides](https://petal-estimate-4e9.notion.site/Building-a-second-brain-app-1407dfd1073580c19ac3cbe9afa9ac27)

---

### What are we building, is called Seconds Brain app [Learn More](./02_second_brain.md)

---

### Commands:

#### Backend

```sh
npm init -y

npm i express dotenv bcrypt jsonwebtoken mongoose zod
npm i @types/express @types/jsonwebtoken @types/bcrypt typescript ts-node nodemon --save-dev
npm i crypto
```

- In tsconfig.json make the `"verbatimModuleSyntax": false,` or comment it, i mean off it

#### Frontend

```sh
npm create vite@latest # choose react > typescript
npm install tailwindcss @tailwindcss/vite
npm install @radix-ui/react-icons
npm install @radix-ui/themes

```

- [radix ui library](https://www.radix-ui.com/themes/docs/overview/getting-started) - we are using it for the components and icons