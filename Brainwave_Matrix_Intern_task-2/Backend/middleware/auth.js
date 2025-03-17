const jwt = require("jwt-simple");
const User = require("../models/user");

const protect = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Extract token from "Bearer <token>" format
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);  // Remove "Bearer " from token
    } else {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = protect;
