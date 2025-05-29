const waitForToken = async () => {
  await import.meta.env;
  return import.meta.env.VITE_TOKEN;
};

const sendChatResponse = async (userResponse) => {
  const VITE_TOKEN = await waitForToken();

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "POST",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${VITE_TOKEN || null}`,
      },
      body: new URLSearchParams({
        "userResponse": userResponse
      }),
    }
  );

  return await response.json();
};

const clearChatHistory = async (e = null) => {
  const VITE_TOKEN = await waitForToken();

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${VITE_TOKEN || null}`,
      },
    }
  );

  return await response.json()
};

export { sendChatResponse, clearChatHistory };
