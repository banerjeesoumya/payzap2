const express = require("express");
const v1Router = require("./routes/index");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express();
const { JWT_SECRET } = require("./config");

app.use(cors());

app.use(express.json());

app.use("/api/v1", v1Router)

app.listen(3000);

