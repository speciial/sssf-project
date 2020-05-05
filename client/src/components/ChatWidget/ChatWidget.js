import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import "./ChatWidget.css";

function ChatWidget({ socket }) {
  const username =
    sessionStorage.getItem("username") ||
    localStorage.getItem("username") ||
    "guest";
  useEffect(() => {
    socket.on("message", (data) => {
      const message = `${data.Username} : ${data.Message}`;
      addResponseMessage(message);
    });
  }, [socket]);

  const handleNewUserMessage = (newMessage) => {
    // Now send the message throught the backend API
    socket.emit("newmessage", {
      Username: username,
      Message: newMessage,
      Time: Date.now(),
    });
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Global chat"
      subtitle="This is the chat box for the global chat !"
    />
  );
}

export default ChatWidget;
