const express = require('express');
const JWT = require('jsonwebtoken')
const app = express();

app.use(express.json());
const users = [];

const JWT_SECRET = "Secret Key";
//In your code, JWT_SECRET is a secret key used to sign and verify JSON Web Tokens (JWTs). This key is crucial for securing the tokens, as it ensures that only those who have the secret can generate or validate tokens. When you create a token, the server uses this secret to sign it, making it tamper-proof. Later, when a token is received, the server uses the same secret to verify its authenticity.

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    let userCheck = users.find(user => user.Username === username && user.Password === password)

    if(userCheck){
        res.json({
            messege: "The user already exists"
        })
    }else{
        users.push({
            Username: username,
            Password: password
        });
    
        res.json({
            message: "Signed up successfully"
        });
        console.log(users)
    }
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const findUser = users.find(user => user.Username === username && user.Password === password);

    if (findUser) {
        const userToken = JWT.sign({
            username: findUser.Username
        },JWT_SECRET);
        
        res.header("token",userToken)
        // However, just setting the token in the response header doesn't automatically send the token to the client for future requests. You need to ensure that the client (e.g., Postman, frontend application) stores the token and sends it back in the headers when making requests to protected routes (e.g., /dashboard).
        // Means we stil have to manually store that token in headers section in postman

        res.json({
            Token: userToken,
            messege: "This is our encoded username that has been converted into JWT"
        });
        console.log(`${findUser.Username} is signed in`)
    } else {
        return res.status(403).send({
            message: "Invalid username or password"
        });
    }
});

app.get("/dashboard", (req, res) => {
    const token = req.headers.token;
    const decodedJWT = JWT.verify(token,JWT_SECRET) 

    const checkUser = users.find(user => user.Username === decodedJWT.username)
    if (checkUser) {
        res.json({
            username: decodedJWT.username,
            Github_URL: `https://github.com/${decodedJWT.username}`
        })
    } else {
        res.status(401).send({
            message: "Unauthorized user"
        })
    }
})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});