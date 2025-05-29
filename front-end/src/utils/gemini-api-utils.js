import process from "node:process";

const sendChatResponse = async (e, userResponse) => {
  console.log(e, userResponse);

  const response = await fetch(
    "https://v55-tier2-team-26.onrender.com/chatbotai",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.OGQyN2YwNDItZGIzOC00Y2VkLTgzZTktYjE0Y2MyNjY0Yzdk.e1I8CSskBdxI4lmz41iEyH-HpWygH0r85KUmaDfMWVY`,
      },
      payload: JSON.stringify({
        userResponse: userResponse,
      }),
    }
  );

  console.log(response);
};

export { sendChatResponse };
