const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountsRouter = express.Router()

accountsRouter.get("/balance", authMiddleware , async (req, res) => {
    const account = await Account.findOne({
        userID : req.userID
    });

    return res.status(200).json({
        balance : account.balance
    })
})

accountsRouter.post("/transfer", authMiddleware, async (req, res) => {
    const currentSession = await mongoose.startSession();

    currentSession.startTransaction();

    const { recipient, amount } = req.body;

    const account = await Account.findOne({
        userID : req.userID
    }).session(currentSession);

    if (!account || account.balance < amount) {
        await currentSession.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }

    const recipientAccount = await Account.findOne({
        userID : recipient
    }).session(currentSession);

    if (!recipientAccount) {
        await currentSession.abortTransaction();
        return res.status(400).json({
            message : "Invalid Account"
        })
    }

    await Account.updateOne({
        userID : req.userID
    }, {
        $inc : {
            balance : -amount
        }
    }).session(currentSession);

    await Account.updateOne({
        userID : recipient
    }, {
        $inc : {
            balance : amount
        }
    }).session(currentSession);

    await currentSession.commitTransaction();

    return res.status(200).json({
        message : "Transaction succesfull..!!"
    })
})

module.exports = accountsRouter;