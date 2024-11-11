const JWT_USERS_SECRET = process.env.JWT_USERS_SECRET
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET


// it is better practice to put these jwt secrets in .env file but for now we are using it  


module.exports = {
    JWT_ADMIN_SECRET,
    JWT_USERS_SECRET
}