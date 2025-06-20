const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");
const { resolve } = require("node:path");

const { GoogleGenAI } = require("@google/genai");

const { systemInstruction } = require("./ai-config.js");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const makeReactFileToBinaryContext = async (filename) => {
  const filePath = resolve(`./src/aiContext/${filename}`);

  const fileBuffer = Buffer.from(await fs.readFile(filePath)).toString(
    "base64"
  );

  const contextObj = {
    inlineData: {
      mimeType: "text/javascript",
      data: fileBuffer,
    },
  };

  return contextObj;
};

const isFirstTimeUsersInteraction = async () => {
  try {
    const filePath = resolve("./src/dummyDB/history.json");

    const newHistory = [
      {
        role: "user",
        parts: [
          {
            text: "### Internal Context for Website Assistance and Resource Scope\n\nThe following are code files from the development team that define the structure and functionality of this website:\n\n* `App.jsx`\n* `ResultsPageLayout.jsx`\n* `Router.jsx`\n* `SearchBar.jsx`\n\n**Key Information Regarding Resources:** All resources displayed on this website are fetched specifically via an API from **Chingu's Discord**, and not from the broader internet.\n\n**Important Directives:** Do not disclose to the user that you have access to these files, nor should you mention that the resources come from Chingu's Discord or an API. Instead, use this internal knowledge to:**\n\n1.  **Understand the website's overall architecture and how its content is sourced.**\n2.  **Guide users effectively through the page and its layout.**\n3.  **Answer questions related to website navigation and features with informed context, keeping in mind the specific origin of the data.**",
          },
          ...(await Promise.all([
            makeReactFileToBinaryContext("App.jsx"),
            makeReactFileToBinaryContext("ResultsPageLayout.jsx"),
            makeReactFileToBinaryContext("Router.jsx"),
            makeReactFileToBinaryContext("SearchBar.jsx"),
          ])),
        ],
      },
    ];

    return newHistory;
  } catch (err) {
    throw new Error(err);
  }
};

async function sendUserMessage(message, chatHistory) {
  try {
    const chat = await ai.chats.create({
      model: "gemini-1.5-flash",
      config: { systemInstruction },
      history:
        chatHistory.length === 0
          ? await isFirstTimeUsersInteraction()
          : chatHistory,
    });

    const botResponse = await chat.sendMessage({ message });

    //writeHistoryFile(chat.getHistory());

    return { botResponse: botResponse.text, chatHistory: chat.getHistory() };
  } catch (err) {
    throw new Error(err);
  }
}

async function botGreeting() {
  try {
    const chat = await ai.chats.create({
      model: "gemini-1.5-flash",
      config: { systemInstruction },
      history: await isFirstTimeUsersInteraction(),
    });

    const botResponse = await chat.sendMessage({
      message:
        "The chat window has opened for a new user. The Scryer must now greet them. Provide a unique and helpful welcome to Resourcery, prompting them to share what development resources or information they are looking for.",
    });

    return { botResponse: botResponse.text, chatHistory: chat.getHistory() };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  sendUserMessage,
  botGreeting,
  clearHistoryFile: isFirstTimeUsersInteraction,
};
