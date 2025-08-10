const { response } = require("express");
const uploadOnCloudinary = require("../config/cloudinary");
const geminiResponse = require("../gemini");
const User = require("../models/user");
const moment = require("moment");
const userAuth = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(404).json({
                message: "User ID not found in request",
            });
        }

        const foundUser = await User.findById(userId).select("-password");

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found in database",
            });
        }

        return res.status(200).json(foundUser);
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const updateAssistant = async (req, res) => {
    try {
        const { AssistantName, imageUrl } = req.body;
        let AssistantImage;
        // when user select its own image from its storage
        if (req.file) {
            AssistantImage = await uploadOnCloudinary(req.file.path);
        } else {
            AssistantImage = imageUrl;
        }

        const apnaUser = await User.findByIdAndUpdate(
            req.userId,
            { AssistantName, AssistantImage },
            { new: true }
        ).select("-password");

        return res.status(200).json(apnaUser);
    } catch (err) {
        console.error("Update assistant error:", err);
        return res.status(500).json({
            message: "Update Assistant error",
        });
    }
};

const askToAssistant = async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // console.log(userPrompt);
    const user = await User.findById(req.userId);
    user.history.push(userPrompt);
    user.save();
    const userName = user.name;
    const AssistantName = user.AssistantName;

    const result = await geminiResponse(userPrompt, AssistantName, userName);
    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(400).json({ response: "sorry, i cannot understand" });
    }

    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mmA")}`,
        });
      case "get_day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Month is ${moment().format("MMMM")}`,
        });
      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });
      default:
        return res.status(400).json({
          type: "error",
          response: "Sorry, I couldn't understand that.",
        });
    }
  } catch (err) {
    console.error("askToAssistant Error:", err);
    return res.status(400).json({
      response: "ask assistant error",
    });
  }
};

module.exports = {
    userAuth, updateAssistant , askToAssistant
};
