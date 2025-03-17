const express = require("express");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.encode({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.encode({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

router.post("/logout", (req, res) => {
    // If you store JWT in cookies, you can invalidate the cookie here:
    res.clearCookie("token");  // Assuming "token" is the cookie name.
    
    // Send a success response to the client
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
