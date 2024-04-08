import React, { useEffect, useRef } from "react";

const MessageContainer = ({ messages, typingUsers, userName }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages, typingUsers]);

  return (
    <div className="message-container">
      {messages.map((m, index) => (
        <div key={index} className="user-message">
          <div className="message bg-primary">{m.message}</div>
          <div className="from-user">{m.user}</div>
        </div>
      ))}
      {/* Display typing indication within the message container */}
      {typingUsers.map((user, index) => (
        <div key={index} className="typing-indication">
          {user} is typing...
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
