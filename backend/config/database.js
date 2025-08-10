const mongoose = require("mongoose");
require("dotenv").config();

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

module.exports = connectdb;
