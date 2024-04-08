import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AllMessageForm from "./AllMessageForm";
import MessageContainer from "./MessageContainer"; // Import the MessageContainer component
import ConnectedUsers from "./ConnectedUsers";
import "./Chat.css";
const Chat = ({
  messages,
  sendMessage,
  users,
  closeConnection,
  connection,
  selectedRoom,
}) => {
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    connection.on("UserTyping", (userName) => {
      setTypingUsers((prevTypingUsers) => {
        if (!prevTypingUsers.includes(userName)) {
          return [...prevTypingUsers, userName];
        }
        return prevTypingUsers;
      });
    });

    connection.on("UserStoppedTyping", (userName) => {
      setTypingUsers((prevTypingUsers) => {
        return prevTypingUsers.filter((user) => user !== userName);
      });
    });

    return () => {
      connection.off("UserTyping");
      connection.off("UserStoppedTyping");
    };
  }, [connection]);

  return (
    <div>
      <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>
          Leave Room
        </Button>
        <ConnectedUsers users={users} />
      </div>
      <div className="chat">
        {/* Display messages and typing indication using MessageContainer */}
        <MessageContainer
          messages={messages}
          typingUsers={typingUsers}
          userName={users}
        />
        {/* Form for sending messages */}
        <AllMessageForm
          sendMessage={sendMessage}
          connection={connection}
          selectedRoom={selectedRoom}
        />
      </div>
    </div>
  );
};

export default Chat;
