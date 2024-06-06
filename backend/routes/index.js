const express = require("express");
const userRouter = require("./user");
const accountsRouter = require("./accounts");

const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/acount", accountsRouter);

module.exports = v1Router;