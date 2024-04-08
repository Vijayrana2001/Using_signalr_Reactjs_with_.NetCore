import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Lobby from "./components/Lobby";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./components/Chat";

function HomePage() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const storedConnection = localStorage.getItem("chatConnection");
    if (storedConnection) {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44382/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setMessages([]);
        setUsers([]);
      });

      setConnection(connection);
      connection.start();
    }
  }, []);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44382/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
      setSelectedRoom(room);
      localStorage.setItem("chatConnection", "connected");
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
      localStorage.removeItem("chatConnection");
      setConnection(null);
      setSelectedRoom(null); 
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    window.location.href = "/login";
  };

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />
      {selectedRoom ? (
        <Chat
          sendMessage={sendMessage}
          messages={messages}
          users={users}
          closeConnection={closeConnection}
          connection={connection}
          selectedRoom={selectedRoom}
        />
      ) : (
        <Lobby joinRoom={joinRoom} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default HomePage;
