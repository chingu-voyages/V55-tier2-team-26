const waitForToken = async () => {
  await import.meta.env;
  return import.meta.env.VITE_TOKEN;
};

const sendChatResponse = async (userResponse) => {
  const TOKEN = await waitForToken();
  const URL = import.meta.env.DEV
    ? "http://localhost:3000/chatbotai"
    : "https://v55-tier2-team-26.onrender.com/chatbotai";

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/x-www-form-urlencoded",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${TOKEN || null}`,
    },
    body: new URLSearchParams({
      userResponse: userResponse,
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
      Accept: "application/x-www-form-urlencoded",
      "Content-Type": "application/x-www-form-urlencoded",
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
  return await response.json();
};

export { sendChatResponse, getBotGreeting, clearChatHistory, waitForToken };
