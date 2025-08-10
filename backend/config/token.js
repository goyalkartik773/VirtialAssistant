const jwt = require("jsonwebtoken");
require("dotenv").config();

const getToken = (userId) => {
    try {
        // if (!process.env.JWT_SECRET) {
        //     throw new Error("JWT_SECRET is not defined in environment variables");
        // }
        const payload = { id:userId };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" });
        return token;
    } catch (err) {
        console.error("Error generating JWT:", err);
        return null; // or throw err;
    }
};

module.exports = getToken;
