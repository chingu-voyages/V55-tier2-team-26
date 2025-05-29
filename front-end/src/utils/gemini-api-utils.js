import process from "process";

const sendChatResponse = async (e, userResponse) => {
  console.log(e, userResponse);

  console.log(import.meta.env);

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "POST",
      headers: {
        Origin: "https://deploy-preview-27--celebrated-bienenstitch-a518bd.netlify.app/",
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
