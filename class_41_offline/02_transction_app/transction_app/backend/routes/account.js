const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');

const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

router.get("/balance", auth, async (req, res) => {
    const account = await Account.findOne({
        userId: req._id
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", auth, async (req, res) => { // read 03_transfer_endpoint.md
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req._id }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance or Invalid account."
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid reciever account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req._id }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;