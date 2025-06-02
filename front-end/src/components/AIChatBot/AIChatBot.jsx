import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Message from "./Message";
import "./styles.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const AIChatBot = () => {
  const [input, setInput] = useState();
  const [responseText, setResponseText] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const responseEndRef = useRef(null);

  useEffect(() => {
    if (responseEndRef.current) {
      const headerHeight = window.innerHeight * 0.09; // 7vh - The height of the header + the top margin

      const elementPosition =
        responseEndRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [responseText]);

  const fetchData = async (input) => {
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(
        input + "keep response to under 150 words"
      );
      const resultText = result.response.text() || "No response text found";
      setLoading(false);
      setResponseText(resultText);
      setInput("");
      const aiResponse = { sender: "ai", text: resultText };
      setMessages((prev) => [...prev, aiResponse]);
      return resultText;
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseText(null);
      return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchData();
  };

  return (
    <div className="flex flex-col items-end">
      {!showChat ? (
        <div className="flex item-center justify-center">
          <button
            className="p-2 w-[6vw] border-2 bg-gray-600 text-white rounded-lg mr-10 cursor-pointer"
            onClick={() => {
              setShowChat(true);
            }}
          >
            ChatBot
          </button>
        </div>
      ) : null}
      {!showChat ? null : (
        <div className="w-[30vw] p-10 flex flex-col items-center justify-center bg-gray-600 rounded-lg">
          <div className="w-[26vw] flex flex-row items-end justify-end">
            <button
              className="w-[3vw] h-[2.2vh] bg-black text-white cursor-pointer rounded-lg"
              onClick={() => setShowChat(false)}
            >
              Close
            </button>
          </div>
          <div
            ref={responseEndRef}
            className="overflow-y-auto h-80 p-4 w-[26vw] mt-2 border-4 border-gray-400 bg-white"
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                sender={msg.sender}
                text={msg.text}
                loading={loading}
              />
            ))}
            {loading && <LoadingIndicator />}
          </div>
          {/* <div className="mt-4 flex flex-row items-center justify-center align-center"> */}
          <div className="input-area">
            <textarea
              className="w-[20vw] h-16 p-2 bg-white rounded-md"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="w-[6vw] h-16 bg-red-800 text-white p-2 cursor-pointer rounded-md"
              onClick={() => {
                fetchData(input);
              }}
            >
              Ask Gemini
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
