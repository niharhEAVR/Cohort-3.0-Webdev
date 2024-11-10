const { userModel, todoModel } = require("./02_database")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Secret Key";

async function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Token missing or unauthorized"
        });
    }

    try {
        const decodedJWT = jwt.verify(token, JWT_SECRET);

        console.log(decodedJWT)

        const checkUser = await userModel.findOne({
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

module.exports={
    auth,
    JWT_SECRET
}