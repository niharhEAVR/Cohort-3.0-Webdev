## if you dont understand how to setup the monorepo then rewatch the class > 22.1 | End to End - Project #1 - Excalidraw > from 00:00 to 27:10 minutes


### **Setting Up TypeScript in a PNPM Turbo Monorepo**  

In our PNPM-based monorepo, we need to use TypeScript for both `http-backend` and `ws-backend`.  

### **1️⃣ Installing TypeScript in `http-backend`**  
First, navigate to the `http-backend` directory and set up the package:  

```bash
cd apps/http-backend/

pnpm init  # to initilize the package.json  

npx tsc --init   # to initialize the tsconfig.json
```
This initializes a `tsconfig.json` file.  

---

### **2️⃣ Using a Shared TypeScript Config**  
Since both `http-backend` and `ws-backend` require TypeScript, we avoid repeating the `tsconfig.json` configuration in each service. Instead, we create a shared configuration file:  

Path:  
```
draw-app/packages/typescript-config/base.json
```

Now, in `http-backend/tsconfig.json`, replace its contents with:  
```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

---

### **3️⃣ Linking the Shared Config in `package.json`**  
To use the shared TypeScript config, add the dependency inside `http-backend/package.json`:  

```json
"dependencies": {
    "@repo/typescript-config": "workspace:*"
}
```
> 🔹 **Note:** If using NPM, we would use `"*"` instead of `"workspace:*"`, but since we're using PNPM, `"workspace:*"` is required.  

---

### **4️⃣ Installing Dependencies in the Root Turbo App**  
Once everything is set up, return to the root of the Turbo repo (`draw-app`) and run:  

```bash
pnpm install
```
This ensures that all dependencies, including the shared TypeScript config, are properly linked.  

---

### **5️⃣ Repeat the Same Steps for `ws-backend`**  
Follow the exact same process for `ws-backend`:   
- Add the dependency in `package.json`  
- Extend the shared `tsconfig.json`  