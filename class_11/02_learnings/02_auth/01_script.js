const express = require('express');
const app = express();

app.use(express.json());

const users = [];

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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

app.get("/dashboard", (req, res) => {
    const token = req.headers.authorization;

    // once the user succesfully signin and have the token, now we will verify that token and show our user their dashboard of the website once its verified

    const user = users.find(user => user.token === token);
    if (user) {
        res.json({
            username: user.User_Name,
            Github_URL: `https://github.com/${user.User_Name}`
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