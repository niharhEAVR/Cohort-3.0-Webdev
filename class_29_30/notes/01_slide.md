### This is project class and the slides are:

[slides for the class](https://petal-estimate-4e9.notion.site/Building-a-second-brain-app-1407dfd1073580c19ac3cbe9afa9ac27)

[Helping Codes from 100xdevs-cohort-3](https://github.com/100xdevs-cohort-3/brainly-fe-2)

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

---

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

---

#### 3. Simple_Login_Page - same as Generic_components.

---

#### 4. Frontend

```sh
npm create vite@latest # choose react > typescript
npm install react-router-dom
npm install zustand # because recoil is closed, the developer are not active
# install Shadcn/ui library with tailwind.
# install Lucide-react
```

1. [tailwind css](https://tailwindcss.com/docs/installation/using-vite)
2. [shadcn/ui library](https://ui.shadcn.com/docs/installation)
3. [lucide-react manual](https://lucide.dev/guide/packages/lucide-react) 
4. [radix-ui icons](https://www.radix-ui.com/icons) 
5. [heroicons by tailwind](https://heroicons.com/) 


---

### The skill i learned from this is :

1. Zustand for state management

---

## There is some tasks lefts to do

1. Add stop sharing functionality for frontend only, 
2. For both frontend and backned add a sync feature, Where another user can sync the shared users brain contents into his/her own dashboard, 
3. For frontend-developer side use axios instead of fetch and see which one is better, 
4. Create a 404 Page for unknown routes, 
5. (Optional) Handle all the edge-cases where the response gives statuses like 400's, 500's. 
6. There we calling the backend too many time for each page, instead create a useBackend Hook which take necessary inputs and call the backent simultaneously aslong the pages. 
7. use Filter options on contents for sidebar and downbar, 
8. Lastly the Logout Functionality and a loding page with loading button for handle the waiting of the backend calls responses, and , 
9. (Optioanl) Make the Intro page more brought and fill with more detail add animations.