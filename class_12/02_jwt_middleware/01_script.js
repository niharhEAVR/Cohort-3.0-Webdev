const express = require('express');
const JWT = require('jsonwebtoken')
const app = express();

app.use(express.json());
const users = [];

const JWT_SECRET = "Secret Key";

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    let userCheck = users.find(user => user.Username === username && user.Password === password)

    if (userCheck) {
        res.json({
            messege: "The user already exists"
        })
    } else {
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
        }, JWT_SECRET);

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

function loginCheck(req, res, next) {
    const token = req.headers.token;
    const decodedJWT = JWT.verify(token, JWT_SECRET)
    const checkUser = users.find(user => user.Username === decodedJWT.username)

    if (checkUser) {
        req.username = decodedJWT.username
        // if you not understand how it tranfer to the next route then read 02_notes.md

        // alternative i can do this also
        // req.user = decodedJWT
        // here we are sending the whole object

        next()
    } else {
        res.status(401).json({
            message: "Unauthorized user"
        })
    }

}

app.get("/dashboard", loginCheck, (req, res) => {
    let finduser = users.find(user => user.Username === req.username)

    res.json({
        username: finduser.username,
        Github_URL: `https://github.com/${finduser.username}`
    })
})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});