import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import "./styles.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { sendChatResponse, getBotGreeting } from "../../utils/gemini-api-utils";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import ScryerBackground from "../../images/scryer-background.PNG";
import ScryerImg from "../../images/scryer.png";

const AIChatBot = () => {
  const [isFetchingApi, setIsFetchingApi] = useState(false);
  const [input, setInput] = useState();
  const [responseText, setResponseText] = useState(null);
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("messages");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const messageRef = useRef(null);

  useEffect(() => {
    const waitForBotResponse = async () => {
      try {
        setIsFetchingApi(true);
        const response = await getBotGreeting();
        setMessages(response);
        setIsFetchingApi(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (messages.length === 0) {
      waitForBotResponse();
    }

    localStorage.setItem("messages", JSON.stringify(messages));
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowChat(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const fetchData = async (input="") => {
    console.log(input)
    const userMessage = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      setIsFetchingApi(true);
      const savedLocalHistory = JSON.parse(localStorage.getItem("messages"));
      const responseObj = await sendChatResponse(input, savedLocalHistory);
      const resultText = responseObj.botResponse;
      const chatHistory = responseObj.chatHistory;
      // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      // const genAI = new GoogleGenerativeAI(apiKey);
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      // const result = await model.generateContent(
      //   input + "keep response to under 120 words"
      // );
      // const resultText = result.response.text() || "No response text found";

      console.log(responseObj);
      setLoading(false);
      setResponseText(resultText);
      setInput("");
      //const aiResponse = { sender: "ai", text: resultText };
      //setMessages((prev) => [...prev, aiResponse]);
      setMessages(chatHistory);
      setIsFetchingApi(false);
      return resultText;
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseText(null);
      return null;
    }
  };

  const handleClearMessages = () => {
    localStorage.removeItem("messages");
    setMessages([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchData(input);
  };

  return (
    <div className="flex flex-col items-end">
      {!showChat ? (
        <div className="chat-button flex item-center justify-center">
          <button
            className="p-2 w-[120px] h-[120px] border-2 bg-[#998675] text-black font-bold rounded-lg mr-10 cursor-pointer"
            style={{ backgroundImage: `url(${ScryerImg})` }}
            onClick={() => {
              setShowChat(true);
            }}
          >
            AI Helper
          </button>
          {/* <ScryerImg /> */}
        </div>
      ) : null}
      {!showChat ? null : (
        <div className="chat-modal w-[300px] md:w-[400px] flex flex-col items-center justify-center border-2 border-gray-400 bg-[#998675] rounded-lg">
          <div className="w-[300px] md:w-[400px] h-[40px] p-4 flex flex-row align-center items-center justify-between">
            <button
              className="w-[80px] flex text-[24px] text-black cursor-pointer rounded-lg"
              onClick={() => setShowChat(false)}
            >
              <ClearIcon />
            </button>
            <h1 className="w-[120px] flex text-center items-center justify-center font-bold text-[18px]">
              The Scryer
            </h1>
            <h1 className="w-[80px] flex items-center align-center justify-end group">
              <button
                className={`fa fa-solid fa-broom ${
                  isFetchingApi
                    ? "hover:cursor-progress contrast-50"
                    : "hover:cursor-pointer"
                }`}
                disabled={isFetchingApi}
                onClick={() => {
                  handleClearMessages();
                }}
              />
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-[#2E4057] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                Clear Chat History
              </div>
            </h1>
          </div>
          <div
            className="overflow-y-auto h-80 p-4 w-[298px] md:w-[398px] mt-2 bg-cover"
            style={{ backgroundImage: `url(${ScryerBackground})` }}
          >
            {messages.map((msg, index) => {
              const isLast = index === messages.length - 1;
              return (index === 0 && msg.parts.length > 1) ||
                index === 1 ? null : (
                <div key={index} ref={isLast ? messageRef : null}>
                  <Message
                    key={index}
                    sender={msg.role}
                    text={msg.parts[0].text}
                    loading={loading}
                  />
                </div>
              );
            })}
            {loading && <LoadingIndicator />}
          </div>
          {/* <div className="mt-4 flex flex-row items-center justify-center align-center"> */}
          <div className="input-wrapper w-[300px] md:w-[400px]">
            <input
              placeholder="Ask the Scryer"
              className="placeholder-italic w-[290px] h-10 p-2 bg-white rounded-4xl"
              disabled={isFetchingApi}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* <button
              className="mr-11 text-[10px] h-16 text-black cursor-pointer"
              onClick={() => {
                setInput("");
              }}
            >
              <ClearIcon className={`${
                  isFetchingApi
                    ? "hover:cursor-progress contrast-20"
                    : "hover:cursor-pointer"
                }`}/>
            </button> */}
            <button
              className="flex items-center mr-3 text-black"
              disabled={isFetchingApi}
              onClick={() => {
                fetchData(input);
              }}
            >
              <ExpandCircleDownIcon
                fontSize="large"
                className={`rotate-270 text-[#2E4057] hover:text-blue-400 ${
                  isFetchingApi
                    ? "hover:cursor-progress contrast-20"
                    : "hover:cursor-pointer"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
