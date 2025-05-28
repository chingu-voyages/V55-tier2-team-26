const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");
const { resolve } = require("node:path");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const makeReactContext = async (filename) => {
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

    await fs.writeFile(
      filePath,
      JSON.stringify([]),
      { encoding: "utf8" }
    );
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
      config: {
        systemInstruction:
          "You are a chatbot assistant to help users navigate a resource website at https://celebrated-bienenstitch-a518bd.netlify.app/. Always interact with the user as if you were a virtual assistant, you don't have to explicitly tell them this website either, just ask them what they need. Help the user with issues related to this page and its results. The user is only going to need help with the Front-end aspect of the page so just focus on that (they'll use their web browser to get to the page, so focus on helping them navigate the website elements or results). The resources are going to be send to you at some point when the user interacts with you too(unless you can see them already maybe?). All the resources come from a discord server from a organization called Chingu and all of them are related to web dev and software development, so don't deviate or offer any other topic of discussion other than those from the resources you'll get or just software development in general). The page name is called resourcery too. There's a searchbar for the user to type keywords and then there's going to be tags available for the user to filter his searchs",
      },
      history: await readHistoryFile(),
    });

    const botResponse = await chat.sendMessage({ message });

    writeHistoryFile(chat.getHistory());

    return { botResponse: botResponse.text, chatHistory: chat.getHistory() };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { sendUserMessage, clearHistoryFile };
