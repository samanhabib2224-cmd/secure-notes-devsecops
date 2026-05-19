const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
try {
const { name, email, password } = req.body;


    // Check user exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User registered successfully",
        user
    });

} catch (error) {
    res.status(500).json({
        message: error.message
    });
}


});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
try {


    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.status(200).json({
        message: "Login successful",
        token
    });

} catch (error) {
    res.status(500).json({
        message: error.message
    });
}


});

// ================= PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {

try {

    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] }
    });

    res.json(user);

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


});

module.exports = router;
