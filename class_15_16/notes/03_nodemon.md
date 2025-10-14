Nodemon is a utility that helps with developing Node.js applications by automatically restarting the server whenever it detects file changes in the directory. It watches files in your project for changes and, when it detects a change, it stops and restarts the server automatically. This makes it especially useful during development, as you don't have to manually restart your server every time you make a code change.

To install Nodemon globally, you can use:

```bash
npm install nodemon
```
after installing do little edit inside the script dependency on the package.json
```json
{
  "name": "project-1",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js" // this is the change
    // when we are developing our app then we will use `npm run dev` and after our app succesfully developed then we will `npm run start`
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.1",
    "nodemon": "^3.1.7"
  }
}
```
In the `package.json` file you shared, both `node` and `nodemon` are used to start your application, but they serve slightly different purposes:

### Node (`node`)
- **Function**: `node` is the JavaScript runtime that executes your application code.
- **Usage in `package.json`**: The `start` script (`"start": "node app.js"`) uses `node` to start the application by running the `app.js` file.
- **Behavior**: When you run `node app.js`, the application starts but will not restart if you make any changes to your code. If you modify your code, you’ll need to manually stop the server and restart it to see the changes.

### Nodemon (`nodemon`)
- **Function**: `nodemon` is a development tool that monitors your application files for any changes and automatically restarts the server when changes are detected.+-.json`**: The `dev` script (`"dev": "nodemon app.js"`) uses `nodemon` to run the application.
- **Behavior**: When you run `nodemon app.js` (or `npm run dev` based on your script), `nodemon` will start the server and continue monitoring your files for any changes. When you modify a file and save it, `nodemon` detects the change, stops the current server, and restarts it automatically. This is particularly useful for development, as it saves time and effort by not requiring manual restarts.

In summary:
- Use `node` for a production environment where you don’t expect to change code frequently.
- Use `nodemon` for development, where automatic restarts improve productivity.