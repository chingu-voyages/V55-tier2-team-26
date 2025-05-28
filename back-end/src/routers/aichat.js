const express = require("express");
const { sendUserMessage, clearHistoryFile } = require("../utils/chatbot-utils");
const htmlSend = (botResponse) => `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>${botResponse}</h1>
  </body>
</html>
`;

const router = new express.Router();

router.post("/chatbotai", async (req, res) => {
  console.log(req.body.userResponse);

  const botResponse = await sendUserMessage(req.body.userResponse);
  res.status(200).send(htmlSend(botResponse));
});

router.patch("/chatbotai", async (req, res) => {
    clearHistoryFile()
    console.log('Chat history cleared successfuly')
    res.status(200).send()
});

module.exports = router;
