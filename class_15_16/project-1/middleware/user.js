const jwt = require("jsonwebtoken");
const { JWT_USERS_SECRET } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USERS_SECRET);

    if (decoded) {
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

module.exports = {
    userMiddleware: userMiddleware
}