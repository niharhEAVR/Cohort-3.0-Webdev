### This is project class and the slides are:

[slides](https://petal-estimate-4e9.notion.site/Building-a-second-brain-app-1407dfd1073580c19ac3cbe9afa9ac27)

---

### What are we building, is called Seconds Brain app [Learn More](./02_second_brain.md)

---

### Commands:

#### 1. Backend

```sh
npm init -y

npm i express dotenv bcrypt jsonwebtoken mongoose zod
npm i @types/express @types/jsonwebtoken @types/bcrypt typescript ts-node nodemon --save-dev
npm i crypto
npm i cors # because we are building a project so we need to resolve cors error.
npm i --save-dev @types/cors
```

- In tsconfig.json make the `"verbatimModuleSyntax": false,` or comment it, i mean off it

#### 2. Generic_components

```sh
npm create vite@latest # choose react > typescript
# Either install tailwind seperately or in the Shadcn/ui library installation there will be step for installing the tailwind with it.
# Must install the shadcn/ui library as from their installation doc, step by step
# Then install Lucide-react for icons
```

- [tailwind css](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/ui library](https://ui.shadcn.com/docs/installation) - we are using it for the components and icons

> We will need a Icons library for different different components. Either you will choose the **lucide-react** or **radix ui** or **Heroicons** icons. In my opinion lucide is best becasue it has more varity and prebuilt functions, radix is more low level and heroicons gives only svgs its not dynamic as a user developer point of view.

1. [lucide-react manual](https://lucide.dev/guide/packages/lucide-react) - for icons
1. [radix-ui icons](https://www.radix-ui.com/icons) - for icons not for large projects
1. [heroicons by tailwind](https://heroicons.com/) - for icons not for large projects


#### 3. Frontend

```sh
npm create vite@latest # choose react > typescript
# install Shadcn/ui library with tailwind.
# install Lucide-react
```

1. [tailwind css](https://tailwindcss.com/docs/installation/using-vite)
2. [shadcn/ui library](https://ui.shadcn.com/docs/installation)
3. [lucide-react manual](https://lucide.dev/guide/packages/lucide-react) 
4. [radix-ui icons](https://www.radix-ui.com/icons) 
5. [heroicons by tailwind](https://heroicons.com/) 


---

## More things to do

1. finish all the pages
2. use recoil and atom for stop huge bunch of rerendering and storing inputs and responses
3. instead of axios try use fetch or try both
4. after finishing the pages make a good ui for dashboard for user and shared user