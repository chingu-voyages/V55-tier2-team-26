const { GoogleGenAI } = require("@google/genai");
const { resolve } = require("node:path");
const fs = require("node:fs/promises");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    await fs.writeFile(filePath, JSON.stringify([]), { encoding: "utf8" });
  } catch (err) {
    throw new Error(err);
  }
};

async function sendUserMessage(message) {
  const chat = await ai.chats.create({
    model: "gemini-1.5-flash",
    history: await readHistoryFile(),
  });

  const botResponse = await chat.sendMessage({message});

  writeHistoryFile(chat.getHistory());

  return botResponse.text
}

module.exports = { sendUserMessage, clearHistoryFile };
