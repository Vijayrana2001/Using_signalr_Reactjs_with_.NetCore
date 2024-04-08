// AllMessageForm.js
import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import EmojiPicker from "emoji-picker-react";
import "./emojimart.css";

const AllMessageForm = ({ sendMessage, onTyping, userName, connection, selectedRoom }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [choosenEmoji, setChoosenEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleTyping = (e) => {
    const typedMessage = e.target.value;
    setMessage(typedMessage);
    if (typedMessage.trim() !== "") {
      connection.invoke("SendTyping", selectedRoom); // Send typing event
    } else {
      connection.invoke("StopTyping", selectedRoom); 
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      sendMessage(message);
    }
    setMessage("");
    connection.invoke("StopTyping", selectedRoom); // Stop typing when message is sent
  };

  const handleEmojiClick = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setMessage(message + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <Form onSubmit={handleMessageSubmit} className="message-form">
      <div className="input-group">
        <FormControl
          type="text"
          placeholder="Message..."
          value={message}
          onChange={handleTyping}
          className="form-control"
        />
        <Button
          className="send-button"
          variant="primary"
          type="submit"
          disabled={!message.trim()}
        >
          Send
        </Button>
        <Button
          className="emoji-button"
          variant="secondary"
          onClick={toggleEmojiPicker}
        >
          😊 {/* Emoji icon for the button */}
        </Button>
        {showEmojiPicker && (
          <div className="emoji-app">
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          </div>
        )}
      </div>
    </Form>
  );
};

export default AllMessageForm;
