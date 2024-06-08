const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const userRouter = express.Router();
const { authMiddleware } = require("./middleware");

// Route to check if user routes are working
userRouter.get("/", async (req, res) => {
    res.status(200).json({
        msg: "/user routes working."
    });
});

// Signup schema
const signupSchema = zod.object({
    username: zod.string().email().toLowerCase(),
    firstName: zod.string().min(3).max(50),
    lastName: zod.string().min(3).max(50),
    password: zod.string().min(6),
});

// Signup route
userRouter.post("/signup", async (req, res) => {
    const body = req.body;

    // Validate request body
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid inputs",
            errors: parsed.error.errors,
        });
    }

    const { username, firstName, lastName, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken",
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const dbUser = await User.create({ username, firstName, lastName, password: hashedPassword });

    // Create account for the user
    const userId = dbUser._id;
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000,
    });

    // Generate JWT token
    const token = jwt.sign({ user_id: userId }, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        token: token,
    });
});

// Signin schema
const signinSchema = zod.object({
    username: zod.string().email().toLowerCase(),
    password: zod.string().min(6),
});

// Signin route
userRouter.post("/signin", async (req, res) => {
    const body = req.body;

    // Validate request body
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid inputs",
            errors: parsed.error.errors,
        });
    }

    const { username, password } = parsed.data;

    // Find user and verify password
    const user = await User.findOne({ username });
    if(!user){
        return res.status(401).json({
            message: "User not found",
        })
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            message: "Incorrect username or password",
        });
    }

    const userId = user._id;
    // Generate JWT token
    const token = jwt.sign({ user_id: userId }, JWT_SECRET);

    res.status(200).json({
        message: "User logged in successfully",
        token: token,
    });
});

// Update schema
const updateSchema = zod.object({
    firstName: zod.string().min(3).max(50).optional(),
    lastName: zod.string().min(3).max(50).optional(),
    password: zod.string().min(6).optional(),
});

// Update route
userRouter.put("/", authMiddleware, async (req, res) => {
    const body = req.body;

    // Validate request body
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid inputs",
            errors: parsed.error.errors,
        });
    }

    const updates = parsed.data;

    // Hash new password if provided
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Update user in the database
    const result = await User.updateOne({ _id: req.user._id }, updates);
    if (result.nModified === 0) {
        return res.status(404).json({
            message: "User not found or no changes made",
        });
    }

    res.status(200).json({
        message: "User updated successfully",
    });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    // Calculating  the number of users to skip
    const skip = (page - 1) * limit;

    // Finding users by first or last name, excluding the current user
    const users = await User.find({
        $and: [
            { _id: { $ne: req.userId } }, // Exclude the current user
            {
                $or: [
                    { firstName: { $regex: filter, $options: "i" } },
                    { lastName: { $regex: filter, $options: "i" } },
                ],
            },
        ],
    }).skip(skip).limit(limit);

    // Getting the total number of users that match the filter, excluding the current user
    const totalUsers = await User.countDocuments({
        $and: [
            { _id: { $ne: req.userId } },
            {
                $or: [
                    { firstName: { $regex: filter, $options: "i" } },
                    { lastName: { $regex: filter, $options: "i" } },
                ],
            },
        ],
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
        totalPages: totalPages,
    });
});


module.exports = userRouter;
