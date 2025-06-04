const express = require("express");
const { sendUserMessage, clearHistoryFile, botGreeting } = require("../utils/chatbot-utils");
const { verification } = require('../middleware/tokenVerification')

const router = new express.Router();

router.post('/chatbotai/greeting', verification, async(req, res)=>{
    try {
    res.set({ "Content-Type": "application/json" });

    const botResponse = await botGreeting();
    res.status(200).json({ ...botResponse });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
})

router.post("/chatbotai", verification, async (req, res) => {
  try {
    res.set({ "Content-Type": "application/json" });

    const botResponse = await sendUserMessage(req.body.userResponse, req.body.chatHistory);
    res.status(200).json({ ...botResponse });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

router.put("/chatbotai", verification, async (req, res) => {
  try {
    res.set({ "Content-Type": "application/json" });
    clearHistoryFile();
    res.status(200).json({ msg: "Chat history cleared successfuly" });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

module.exports = router;
