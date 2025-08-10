// create the app server
const express = require("express");
const app = express();

// import the port no from env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// use the body parser middleware
app.use(express.json());

// use cors middleware also
const cors = require("cors");
app.use(cors({
    origin:"https://virtialassistant-1.onrender.com",
    credentials:true
}));
// using the cookieparser middleware also
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// mount the routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
app.use("/api/auth", authRouter);
app.use("/api/user",userRouter);

// app.get("/", async (req, res) => {
//   const prompt = req.query.prompt;

//   if (prompt) {
//     try {
//       const data = await geminiResponse(prompt);
//       return res.json(data);
//     } catch (err) {
//       return res.status(500).json({ error: "Gemini failed", details: err.message });
//     }
//   }

//   return res.send("Hello from the server!");
// });


// import the database
const connectdb = require("./config/database");
const geminiResponse = require("./gemini");

// listen the server
app.listen(PORT, () => {
    connectdb();
    console.log(`server started on the port no ${PORT}`);
})
