import React, { useState } from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import "./styles.css";

function Message({ sender, text, loading }) {
  const isUser = sender === "user";
  return (
    <div className={`message ${isUser ? "user" : "ai"}`}>
      <div className="bubble">{text}</div>
      {/* {loading ? <LoadingIndicator /> : null} */}
    </div>
  );
}

export default Message;
