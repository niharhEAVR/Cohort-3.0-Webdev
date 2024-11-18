In a TypeScript project, you need to install `@types/express` because Express itself is written in JavaScript, which does not include TypeScript type definitions. 

TypeScript relies on type definitions to provide static type checking, autocompletion, and documentation in your editor. Since Express doesn't come with its own TypeScript types, the `@types/express` package provides these types. Here's why it's important:

### Why Install `@types/express`?
1. **Type Definitions for Express Objects:**
   The package provides type definitions for the Express library, such as:
   - `Request`, `Response`, `NextFunction`, etc.
   - Type annotations for middleware and routing functions.

2. **Improved Development Experience:**
   - **Autocompletion:** Helps your editor suggest methods and properties for Express objects.
   - **Error Checking:** Allows TypeScript to catch potential type mismatches or incorrect usage of Express features.
   - **Documentation:** Provides inline documentation for Express APIs in your IDE.

3. **Compatibility with TypeScript:**
   TypeScript can't infer types from JavaScript files unless they are explicitly defined or imported from a type definitions package like `@types/express`.

### Example Without `@types/express`:
If you don't install `@types/express`, you'll get errors or no type information when working with Express objects:

```typescript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!'); // TypeScript will not know the types of `req` and `res`
});
```

Without `@types/express`, TypeScript treats `req` and `res` as `any` type, disabling type safety.

### How `@types/express` Fixes This:
With `@types/express` installed:

```typescript
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!'); // TypeScript knows `req` and `res` are Express objects
});
```

Here, `Request` and `Response` are properly typed, ensuring safety and helping catch errors like using non-existent properties.

---

**In Summary:**  
You install `@types/express` in a TypeScript Express app to enable type support for Express-related objects and improve your development experience with type safety, autocompletion, and better error checking.