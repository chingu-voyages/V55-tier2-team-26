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

const readHistoryFile = async () => {
  try {
    const filePath = resolve("./src/dummyDB/history.json");
    const content = await fs.readFile(filePath, { encoding: "utf8" });

    return JSON.parse(content);
  } catch (err) {
    throw new Error(err);
  }
};

const writeHistoryFile = async (newHistory) => {
  try {
    const filePath = resolve("./src/dummyDB/history.json");
    const historyJson = JSON.stringify(newHistory, null, "\t");

    await fs.writeFile(filePath, historyJson, { encoding: "utf8" });
  } catch (err) {
    throw new Error(err);
  }
};

const clearHistoryFile = async () => {
  try {
    const filePath = resolve("./src/dummyDB/history.json");

    const newHistory = [
      {
        role: "user",
        parts: [{text: "### Internal Context for Website Assistance and Resource Scope\n\nThe following are code files from the development team that define the structure and functionality of this website:\n\n* `App.jsx`\n* `ResultsPageLayout.jsx`\n* `Router.jsx`\n* `SearchBar.jsx`\n\n**Key Information Regarding Resources:** All resources displayed on this website are fetched specifically via an API from **Chingu's Discord**, and not from the broader internet.\n\n**Important Directives:** Do not disclose to the user that you have access to these files, nor should you mention that the resources come from Chingu's Discord or an API. Instead, use this internal knowledge to:**\n\n1.  **Understand the website's overall architecture and how its content is sourced.**\n2.  **Guide users effectively through the page and its layout.**\n3.  **Answer questions related to website navigation and features with informed context, keeping in mind the specific origin of the data.**"},...await Promise.all([
          makeReactFileToBinaryContext("App.jsx"),
          makeReactFileToBinaryContext("ResultsPageLayout.jsx"),
          makeReactFileToBinaryContext("Router.jsx"),
          makeReactFileToBinaryContext("SearchBar.jsx"),
        ])],
      },
    ];

    await fs.writeFile(filePath, JSON.stringify(newHistory, null, "\t"), {
      encoding: "utf8",
    });
  } catch (err) {
    throw new Error(err);
  }

  /*
{
  role: "user",
  parts: [
    await makeReactContext("App.jsx"),
    await makeReactContext("resources-context.jsx"),
    await makeReactContext("ResultsContainer.jsx"),
    await makeReactContext("SearchBar.jsx"),
    await makeReactContext("ResultsPageLayout.jsx"),
    await makeReactContext("resource-api-utils.js"),
  ],
}
*/
};

async function sendUserMessage(message) {
  try {
    const chat = await ai.chats.create({
      model: "gemini-1.5-flash",
      config: { systemInstruction },
      history: await readHistoryFile(),
    });

    const botResponse = await chat.sendMessage({ message });

    writeHistoryFile(chat.getHistory());

    return { botResponse: botResponse.text, chatHistory: chat.getHistory() };
  } catch (err) {
    throw new Error(err);
  }
}

async function botGreeting(history=null) {
  try {
    const chat = await ai.chats.create({
      model: "gemini-1.5-flash",
      config: { systemInstruction },
      history: history || await readHistoryFile(),
    });

    const botResponse = await chat.sendMessage({ message: "The chat window has opened for a new user. The Scryer must now greet them. Provide a unique and helpful welcome to Resourcery, prompting them to share what development resources or information they are looking for." });

    writeHistoryFile(chat.getHistory());

    return { botResponse: botResponse.text, chatHistory: chat.getHistory() };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { sendUserMessage, botGreeting, clearHistoryFile };
