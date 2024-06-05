const mongoose = require ("mongoose");
const { mongoUrl } = require("./config");

mongoose.connect(mongoUrl)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        lowercase: true,
        minLength: 4,
        maxLength: 14
    },
    password: {
        type: String,
        reqiure: true,
        unique: true,
        minLength: 8
    },
    firstName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 20
    },
    middleName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 20
    }
})

const User = mongoose.model("User", userSchema);

module.exports = ({
    User
})