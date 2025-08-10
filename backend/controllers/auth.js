const User = require("../models/user");
const bcrypt = require("bcryptjs");
const getToken = require("../config/token");

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = getToken(newUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false,
        });

        return res.status(200).json({
            message: "Signup successful",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: `Signup error: ${err.message}` });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User with this email does not exist.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
            });
        }

        const token = getToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false,
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: `Login error: ${err.message}`,
        });
    }
};

const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
        });

        return res.status(200).json({
            message: "Successfully logged out.",
        });

    } catch (err) {
        return res.status(500).json({
            message: `Logout error: ${err.message}`,
        });
    }
};
module.exports = {
    signUp,
    login,
    logOut
};
