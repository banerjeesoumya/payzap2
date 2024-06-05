const express = require("express")
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const userRouter = express.Router()

const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string()
})

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

const updateSchema = zod.object({
    password : zod.string().min(8).optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

userRouter.post("/signup", async (req, res) => {
    const correctSignUpBody = signUpSchema.safeParse(req.body);
    if (!correctSignUpBody.success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const userExists = User.findOne({
        username: req.body.username
    });

    if (userExists) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    } else {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        const user_ID = user._id;

        const token = jwt.sign({
            user_ID
        }, JWT_SECRET);

        res.json({
            message: "User created successfully",
	        token: token
        }).status(200)
    }
});

userRouter.post("/signin", async (req, res) => {
    const correctSignInBody = signInSchema.safeParse(req.body);
    if (!correctSignInBody.success) {
        return res.json({
            message : "Please enter a valid e-mail address and password"
        }).status(411);
    } 

    const user = await User.findOne({
        username: req.body.username
    })

    if(!user) {
        return res.json({
            msg: "Error while logging in"
        }).status(411)
    }

    const token = jwt.sign({
        userID: user._id
    }, JWT_SECRET);

    res.json({
        token: token
    }).status(200)
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const updateBody = updateSchema.safeParse(req.body);

    if(!updateBody.success) {
        return res.status(411).json({
            message: "Password is too small"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body);

    return res.status(200).json({
        message: "Updated succesfully"
    })

})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter

    const users = await User.find({
        $or: [{
            firstName: { "$regex": filter}
        }, {
            lastName: { "$regex": filter}
        }]
    })

    res.status(200).json({
        users: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    })
})

module.exports = userRouter;