const waitForToken = async () => {
  await import.meta.env;
  return import.meta.env.VITE_TOKEN;
};

const sendChatResponse = async (userResponse, chatHistory) => {
  const TOKEN = await waitForToken();
  const URL = import.meta.env.DEV
    ? "http://localhost:3000/chatbotai"
    : "https://v55-tier2-team-26.onrender.com/chatbotai";

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN || null}`,
    },
    body: JSON.stringify({
      userResponse: userResponse,
      chatHistory: chatHistory,
    }),
  });

  return await response.json();
};

const clearChatHistory = async (e = null) => {
  const TOKEN = await waitForToken();
  const URL = import.meta.env.DEV
    ? "http://localhost:3000/chatbotai"
    : "https://v55-tier2-team-26.onrender.com/chatbotai";

  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN || null}`,
    },
  });

  return await response.json();
};

const getBotGreeting = async () => {
  const TOKEN = await waitForToken();
  const URL = import.meta.env.DEV
    ? "http://localhost:3000/chatbotai/greeting"
    : "https://v55-tier2-team-26.onrender.com/chatbotai/greeting";

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN || null}`,
    },
  });

  const { chatHistory } = await response.json();

  return chatHistory;
};

export { sendChatResponse, clearChatHistory, waitForToken, getBotGreeting };
