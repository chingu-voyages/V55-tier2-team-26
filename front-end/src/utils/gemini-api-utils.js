const waitForToken = async () =>{
  await import.meta.env
  return import.meta.env.VITE_TOKEN
}

const sendChatResponse = async (e, userResponse) => {
  const VITE_TOKEN = await waitForToken()

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${VITE_TOKEN || null}`,
      },
      payload: JSON.stringify({
        userResponse: userResponse,
      }),
    }
  );

  console.log(response);
};

const clearChatHistory = async (e=null) => {
  const VITE_TOKEN = await waitForToken()

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "PUT",
      headers: {
        "Accept": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${VITE_TOKEN || null}`,
      },
    }
  );

  console.log(response);
};


export { sendChatResponse, clearChatHistory };
