const express = require("express");
const aiRouter = require("./routers/aichat.js"); 
const cors = require('cors')
const corsOptions = {
  origin: "https://app.netlify.com/projects/celebrated-bienenstitch-a518bd",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["POST", "PUT"],
};
const app = express();

app.use(cors(corsOptions))
app.options("/chatbotai", cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(aiRouter);

module.exports = app;
