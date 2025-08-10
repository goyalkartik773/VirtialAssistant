const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const geminiResponse = async (userPrompt, AssistantName, userName) => {
try {
// const prompt =` You are a virtual assistant named ${AssistantName}, created by ${userName}.
// You are **not Google**. You will now behave like a **voice-enabled assistant**.
// Your task is to understand the user's natural language input and respond with a **strictly formatted JSON** object like this:
// {
//   "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
//    "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
//     "instagram_open" | "facebook_open" | "weather_show",
//     "userinput": "<original user input>" (only remove your name from userinput if it exists) and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only wo search wala text jaye,
//     "response": "<a short spoken response to read out loud to the user>"
// }
// ### Instructions:
// You must understand the user's natural language input and return a **strictly formatted JSON object** like below:
// {
//   "type": "<intent of the user>",
//   "userInput": "<original sentence the user spoke (remove your name if mentioned)>",
//   "response": "<short voice-friendly reply like: 'Sure, playing it now', 'Here’s what I found', 'Today is Tuesday'>"
// }
// ---
// ### Type meanings:
// - "general": for factual or informational questions agar koi question puchta hai jiska tumhe answer pata hai usko bhi genral ki category mai rakhi bas short answer dena
// - "google_search": if user wants to search something on Google give short answer on same page means speak out then open related article
// - "youtube_search": if user wants to search something on YouTube.
// - "youtube_play": if user wants to directly play a video or song.
// - "calculator_open": if user wants to open a calculator.
// - "instagram_open": if user wants to open Instagram.
// - "facebook_open": if user wants to open Facebook.
// - "weather_show": if user asks about the weather.
// - "get_time" / "get_date" / "get_day" / "get_month": if user asks about time or date.
// If the user says something like "open YouTube and search for music", your response might look like:
// {
//   "type": "youtube_search",
//   "userinput": "search for music",
//   "response": "Sure, searching music on YouTube for you."
// }
// If someone asks a general question or gives a statement, use "type": "general".
// Only include valid types listed above. Do not add extra keys or explanations.
// Make sure your response is in valid JSON format. No markdown, no extra text.
// Important:
// - use ${userName} agar koi puche ki tumhe kisne bnaya
// - only respond with the JSON OBJECT , NOTHING ELSE
// User input: "${userPrompt}"
// ;`
const prompt = `
You are a virtual assistant named ${AssistantName}, created by ${userName}.

You are **not Google**. You behave like a voice-enabled assistant.

Your task: understand the user's input and respond with strictly formatted JSON:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
  "userInput": "<original user input, without assistant name>",
  "response": "<short voice-friendly reply>"
}

 If someone says something like "open YouTube", use:
 {
   "type": "youtube_play",
  "userInput": "open YouTube",
  "response": "Opening YouTube"
 }
If the user asks "Who created you?" or "Who made you?", respond exactly:

{
  "type": "general",
  "userInput": "Who created you?",
  "response": "I was created by ${userName}."
}

Respond only with the JSON object. No explanation or extra text.

Userinput: "${userPrompt}"
`;

        const result = await axios.post(
            gemini_url,
            {
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }
        );

        return result.data.candidates[0].content.parts[0].text;
    } catch (err) {
        console.error("Gemini API Error:", err.response?.data || err.message);
        throw err;
    }
};

module.exports = geminiResponse;