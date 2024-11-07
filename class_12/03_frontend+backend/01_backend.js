const express = require('express');
const JWT = require('jsonwebtoken');
const path = require('path');
const app = express();

app.use(express.json());
const users = [];

const JWT_SECRET = "Secret Key";


app.use(express.static(path.join(__dirname, 'public')));
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

// function loginCheck(req, res, next) {
//     const token = req.headers.token;
//     const decodedJWT = JWT.verify(token, JWT_SECRET)
//     const checkUser = users.find(user => user.Username === decodedJWT.username)

//     if (checkUser) {
//         req.username = decodedJWT.username
//         next()
//     } else {
//         res.status(401).json({
//             message: "Unauthorized user"
//         })
//     }

// }

// app.get("/dashboard", loginCheck, (req, res) => {
//     let finduser = users.find(user => user.Username === req.username)

//     res.json({
//         username: finduser.username,
//         Github_URL: `https://github.com/${finduser.username}`
//     })
// })

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});