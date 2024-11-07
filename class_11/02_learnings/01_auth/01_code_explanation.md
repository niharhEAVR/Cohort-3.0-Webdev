Let's go through this code step by step.

### 1. Import and Setup Express
```javascript
const express = require('express');
const app = express();
```
- `express` is required to create a web server. `require('express')` imports the Express library.
- `app` is an instance of Express, used to configure and run the server.

### 2. Middleware to Parse JSON
```javascript
app.use(express.json());
```
- `app.use(express.json())` is middleware that allows Express to automatically parse incoming JSON request bodies. This makes `req.body` accessible as a JavaScript object, useful for handling JSON input in routes.

### 3. Global Variables
```javascript
const users = []; // global variable
```
- `users` is an array used to store user data (like username and password) temporarily in memory.
- This array will store new users' data upon signup.

### 4. Token Generation Function
```javascript
function generateToken() {
    let options = ['a', 'b', ..., '9'];
    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}
```
- `generateToken` creates a 32-character random alphanumeric token.
- `options` is an array containing lowercase letters, uppercase letters, and numbers.
- The `for` loop runs 32 times, each time appending a random character from `options` to the `token` string.
- This function returns the `token`, which is used for user authentication in the `signin` route.

### 5. Signup Route (`/signup`)
```javascript
app.post("/signup", (req, res) => {
    const { userName, password } = req.body;

    users.push({
        User_Name: userName,
        Password: password
    });

    res.json({
        message: "Signed up successfully"
    });
    console.log(users);
});
```
- This route handles user signup.
- `req.body` extracts `userName` and `password` from the request's JSON body.
- A new user object with `User_Name` and `Password` is added to the `users` array.
- `res.json()` responds with a success message, and `console.log(users)` outputs the current list of users in the console.

### 6. Signin Route (`/signin`)
```javascript
app.post("/signin", (req, res) => {
    const { userName, password } = req.body;

    const findUser = users.find(user => user.User_Name === userName && user.Password === password);

    if (findUser) {
        const userToken = generateToken();
        findUser.Token = userToken;

        res.json({
            Token: userToken
        });
        console.log(users)
    } else {
        return res.status(403).send({
            message: "Invalid username or password"
        });
    }
});
```
- This route handles user signin.
- It extracts `userName` and `password` from `req.body`.
- `users.find(...)` searches for a user in the `users` array with a matching `User_Name` and `Password`.
  - If a matching user is found, `findUser` contains the user object; otherwise, it’s `undefined`.
- If the user is found:
  - `generateToken` is called to create a new token.
  - This token is added to `findUser` as `Token`.
  - A response with the token is sent back to the client.
- If the user is not found:
  - A `403` status code is returned with a message indicating invalid credentials.

### 7. Starting the Server
```javascript
app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});
```
- `app.listen(3000, ...)` starts the server on port `3000`.
- `console.log(...)` outputs the server URL to the console.

### Summary of Flow
1. **Signup**: Adds user details to `users` and confirms signup.
2. **Signin**: Checks if user details match an entry in `users`, then generates and returns a token if valid.