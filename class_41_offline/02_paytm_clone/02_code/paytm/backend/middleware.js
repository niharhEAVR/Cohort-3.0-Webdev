const { User } = require("./db")
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Token missing or unauthorized"
        });
    }

    try {
        const decodedJWT = jwt.verify(token, "secret");

        console.log(decodedJWT)

        const checkUser = await User.findOne({
            _id: decodedJWT.userID
        });

        if (checkUser) {
            req._id = checkUser._id
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

module.exports = {
    auth
}