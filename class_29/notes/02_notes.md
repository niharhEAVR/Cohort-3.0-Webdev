To override the types of the Express `Request` object, you can use TypeScript's module augmentation feature. This involves extending the existing `Request` interface to include your custom properties, like `userId`.

### Steps to Override the Express `Request` Object

#### 1. **Create a TypeScript Declaration File**
   Create a new file (e.g., `types.d.ts`) in your project. This file is where you'll augment the existing `Request` type from Express.

   ```typescript
   // types.d.ts
   import 'express';

   declare module 'express' {
       export interface Request {
           userId?: string; // Add custom properties here
       }
   }
   ```

#### 2. **Include the Declaration File in `tsconfig.json`**
   Ensure TypeScript recognizes the declaration file by including its directory in the `tsconfig.json` file under the `typeRoots` or `files` field.

   **Example 1: Using `typeRoots`**
   ```json
   {
     "compilerOptions": {
       "typeRoots": ["./node_modules/@types", "./types"]
     }
   }
   ```

   **Example 2: Using `files`**
   ```json
   {
     "files": ["./types.d.ts"]
   }
   ```

#### 3. **Restart TypeScript Server**
   After adding the `types.d.ts` file, restart your TypeScript server or editor to ensure the new types are recognized.

   - In VS Code: `Ctrl+Shift+P` → `TypeScript: Restart TS Server`.

#### 4. **Middleware Code Using the Extended Type**
   Now, you can safely use your custom properties in the `Request` object.

   ```typescript
   import { NextFunction, Request, Response } from "express";
   import jwt from "jsonwebtoken";
   import { JWT_SECRET } from "./config";

   export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
       const header = req.headers["authorization"];
       
       if (!header) {
           return res.status(403).json({ message: "Authorization header missing" });
       }

       try {
           const decoded = jwt.verify(header, JWT_SECRET) as { id: string }; // Cast to the JWT payload type
           req.userId = decoded.id; // Now TypeScript recognizes `userId`
           next();
       } catch (error) {
           res.status(403).json({ message: "Invalid token" });
       }
   };
   ```

### Debugging Tips
1. **Ensure TypeScript Compilation is Set Up Correctly**:
   - Check that your `tsconfig.json` includes the folder where `types.d.ts` resides.

2. **No Duplicate `types.d.ts`**:
   - Ensure you don't have multiple `types.d.ts` files that could conflict.

3. **Verify Type Augmentation**:
   - Test if TypeScript recognizes the `userId` property by hovering over `req.userId` in your middleware code.

Once these steps are followed, the `userId` property should be seamlessly available on the `Request` object without TypeScript errors.