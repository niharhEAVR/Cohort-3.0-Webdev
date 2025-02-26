const express = require('express');
const app = express();

app.use(express.json());

const users = []; // global variable

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
    // Add new user
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

    // Find user with matching credentials
    const findUser = users.find(user => user.User_Name === userName && user.Password === password);
    // if the user not found then this valriable will store undefined, which means in js undefined is false
    // but if you still confusing in this portion (signin) of the code then read 01_signin_protion.md

    if (findUser) {
        const userToken = generateToken();
        console.log(findUser)
        findUser.Token = userToken;

        res.json({
            Token: userToken
        });
        console.log(findUser)
    } else {
        return res.status(403).send({
            message: "Invalid username or password"
        });
    }
});

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});