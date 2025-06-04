const express = require("express");
const aiRouter = require("./routers/aichat.js"); 
const cors = require('cors')
const corsOptions = {
  origin: (origin, callback) => {
    if (
      origin?.endsWith(".netlify.app") ||
      origin === "http://localhost:5173" || origin === "http://localhost:80"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["POST", "PUT"],
};
const app = express();

app.use(cors(corsOptions))
app.options("/chatbotai", cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(aiRouter);

module.exports = app;
