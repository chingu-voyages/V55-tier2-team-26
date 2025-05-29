import process from "process";

const sendChatResponse = async (e, userResponse) => {
  console.log(e, userResponse);

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "POST",
      headers: {    
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta?.env.VITE_TOKEN || null}`,
      },
      payload: JSON.stringify({
        userResponse: userResponse,
      }),
    }
  );

  console.log(response);
};

export { sendChatResponse };
