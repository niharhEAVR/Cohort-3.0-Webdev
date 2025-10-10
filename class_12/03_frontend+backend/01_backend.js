const express = require('express');
const JWT = require('jsonwebtoken');
const path = require('path');
const app = express();

app.use(express.json());
const users = [];

const JWT_SECRET = "Secret Key";

app.use(express.static(path.join(__dirname, 'public')));
// if you dont understand what these two line of code is doing then read 02_notes.md in notes folder

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '01_frontend.html'));
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    console.log("Received signup request:", username, password);

    let userCheck = users.find(user => user.Username === username && user.Password === password)

    if (userCheck) {
        console.log("User already exists:", username);
        return res.status(403).send({
            messege: "The user already exists"
        })
    } else {
        users.push({
            Username: username,
            Password: password
        });
        console.log("User signed up:", username);
        res.status(201).json({
            messege: "Signed up succesfully"
        })
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
            user: findUser.Username
        });
        console.log(`${findUser.Username} is signed in`)
    } else {
        return res.status(403).send({
            messege: "Invalid username or password"
        });
    }
});

function loginCheck(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Token missing or unauthorized"
        });
    }
    try {
        const decodedJWT = JWT.verify(token, JWT_SECRET);

        console.log(decodedJWT) //Once the user is signed in you will get to see a output  { username: 'name', iat: 1731052646 } something like this at your terminal.
        // if you dont understand what is 'iat' then read 03_notes.md at notes folder

        const checkUser = users.find(user => user.Username === decodedJWT.username);

        if (checkUser) {
            req.username = decodedJWT.username;
            req.iat = decodedJWT.iat;
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized user"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

app.get("/dashboard", loginCheck, (req, res) => {
    let finduser = users.find(user => user.Username === req.username)

    const iat = req.iat;
    const date = new Date(iat * 1000);

    if (finduser) {
        res.json({
            username: finduser.Username,
            Github_URL: `https://github.com/${finduser.Username}`,
            loginAt: date.toLocaleString()
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});