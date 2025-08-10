const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.userId = decoded.id;
        // console.log(req.userId);
        next();
    } 
    catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = isAuth;
