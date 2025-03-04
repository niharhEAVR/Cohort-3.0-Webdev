Here’s a refined version of your instructions:  

---

# Using *JWT_SECRET* in Both `http-backend` and `ws-backend`  

To share *JWT_SECRET* across both backends, we will initialize it in a global package folder.  

## 1. Create a `backend-common` Folder  

Navigate to the global package folder and create the `backend-common` package:  

```bash
cd ./packages/backend-common
pnpm init 
pnpm add @types/node # this is for using the .env file
npx tsc --init
```

## 2. Update `tsconfig.json`  

Replace the contents of `tsconfig.json` with:  

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

## 3. Modify `package.json`  

Update the package name:  

```json
{
  "name": "@repo/backend-common"
}
```

Then, add the following:  

```json
{
  "exports": {
    "./config": "./src/index.ts"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```

---

## 4. Link `backend-common` in `http-backend` and `ws-backend`  

In both `http-backend/package.json` and `ws-backend/package.json`, add:  

```json
{
  "devDependencies": {
    "@repo/backend-common": "workspace:*"
  }
}
```

To access the `JWT-SECRET` write this in the app:

```ts
import { JWT_SECRET } from '@repo/backend-common/config';
```

---

## 5. Install Dependencies  

After completing the setup, navigate to the root of `draw-app` and run:  

```bash
pnpm install
```

This ensures all dependencies are properly linked and installed globally.