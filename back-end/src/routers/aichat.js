const express = require("express");
const { sendUserMessage, clearHistoryFile } = require("../utils/chatbot-utils");
const cors = require('cors')

const corsOptions = {
  origin: "https://celebrated-bienenstitch-a518bd.netlify.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["POST", "PUT"],
};

const router = new express.Router();

router.use(cors(corsOptions))
router.options("/chatbotai", cors(corsOptions))
router.post("/chatbotai", cors(corsOptions), async (req, res) => {
  try {
    res.set({ "Content-Type": "application/json" });
    console.log(req.body.userResponse);

    const botResponse = await sendUserMessage(req.body.userResponse);
    res.status(200).json({ ...botResponse });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

router.put("/chatbotai", cors(corsOptions), async (req, res) => {
  try {
    res.set({ "Content-Type": "application/json" });
    clearHistoryFile();
    res.status(200).json({ msg: "Chat history cleared successfuly" });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

module.exports = router;
