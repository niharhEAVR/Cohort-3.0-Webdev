In a TypeScript project, the `tsconfig.json` file is used to configure the TypeScript compiler. Two important properties in this file are `outDir` and `rootDir`, which control the structure and output of your compiled JavaScript files.

### 1. **`outDir`**
- Specifies the directory where TypeScript will place the compiled JavaScript files.
- Example:
  ```json
  {
    "compilerOptions": {
      "outDir": "./dist"
    }
  }
  ```
  - When you compile your TypeScript files, the `.js` files (along with `.d.ts` files, if generated) will be placed in the `dist` directory.

### 2. **`rootDir`**
- Specifies the root directory of your source files. TypeScript uses this as a base to resolve file paths.
- Example:
  ```json
  {
    "compilerOptions": {
      "rootDir": "./src"
    }
  }
  ```
  - This tells TypeScript to treat `src` as the root directory for your project.
  - The directory structure in `src` will be mirrored in the `outDir`.

---

### Using Both Together
Here's how these options work together:

#### Example `tsconfig.json`
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```
#### Example Folder Structure
Before compilation:
```
project
├── src
│   ├── app.ts
│   └── utils
│       └── helper.ts
├── tsconfig.json
```

After compilation:
```
project
├── dist
│   ├── app.js
│   └── utils
│       └── helper.js
├── src
│   ├── app.ts
│   └── utils
│       └── helper.ts
├── tsconfig.json
```

### Key Notes:
1. **Why `rootDir`?**  
   Ensures TypeScript only includes files under the `src` directory in the `outDir`. Without `rootDir`, files outside `src` (like in `tests`) might also be compiled into `outDir`.

2. **Relative Paths:**  
   Both `rootDir` and `outDir` are relative to the `tsconfig.json` file's location.

3. **Best Practices:**  
   - Place all your source files in a directory like `src` and set it as `rootDir`.
   - Use `outDir` for all generated output, like `dist`.

These configurations help maintain a clean, organized project structure, especially in larger applications.