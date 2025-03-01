const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    author: ObjectId,
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
    }
});

const Account = mongoose.model('Account', accountSchema, "Account");
const User = mongoose.model('User', userSchema, "User");

module.exports = {
    User,
    Account
};
