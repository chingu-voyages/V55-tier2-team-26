const express = require("express");
const aiRouter = require("./routers/aichat.js"); 
const {generateAuthToken} = require("./middleware/tokenVerification.js")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(aiRouter);

module.exports = app;
