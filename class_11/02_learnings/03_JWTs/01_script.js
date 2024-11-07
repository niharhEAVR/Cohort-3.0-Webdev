const express = require('express');
const JWT = require('jsonwebtoken')
const app = express();

app.use(express.json());

const users = [];

const JWT_SECRET = "You can Write any random text over here";

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

app.post("/signin", (req, res) => {
    const { userName, password } = req.body;

    const findUser = users.find(user => user.User_Name === userName && user.Password === password);

    if (findUser) {
        const userToken = JWT.sign({
            username: findUser.User_Name
        },JWT_SECRET);

        res.json({
            Token: userToken,
            messege: "This is our encoded username that has been converted into JWT"
        });
        console.log(users)
    } else {
        return res.status(403).send({
            message: "Invalid username or password"
        });
    }
});


// Okay after signed in we need to copy that token and paste that token in headers section on the postman app by a key name as 'token' and the value of that key will be our generated token after signing in,, Other wise the get method will not work if you are doing an postman request

app.get("/dashboard", (req, res) => {
    const token = req.headers.token;
    const decodedJWT = JWT.verify(token,JWT_SECRET)
    const decodedJWTUsername = decodedJWT.username 

    const checkUser = users.find(user => user.User_Name === decodedJWTUsername)
    if (checkUser) {
        res.json({
            username: decodedJWTUsername,
            Github_URL: `https://github.com/${decodedJWTUsername}`
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