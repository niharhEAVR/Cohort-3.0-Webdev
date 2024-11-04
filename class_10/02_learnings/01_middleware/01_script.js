const express = require("express")
const app = express()

function logRequest(req, res, next) {
    console.log(`Request made to: ${req.url}`);
    next();
}

//In this Express code, req.url is part of the req (request) object, which represents the HTTP request made by a client. Specifically, req.url holds the URL path that the client used to access the server, excluding the host and port. This path includes everything from the root of the application (e.g., /special) and any query strings that might be attached.


app.get('/special', logRequest, (req, res) => {
    res.send('This route uses route-specific middleware!');
});

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})