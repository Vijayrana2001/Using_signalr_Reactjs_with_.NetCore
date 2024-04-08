// Lobby.js
import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Alert } from "react-bootstrap";

const Lobby = ({ joinRoom, handleLogout }) => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = decodeAuthToken(authToken);
      if (decodedToken && decodedToken.unique_name) {
        setUser(decodedToken.unique_name.split('@')[0]);
      }
    }
    const storedRoomList = localStorage.getItem("roomList");
    if (storedRoomList) {
      setRoomList(JSON.parse(storedRoomList));
    }
  }, []);

  // Function to decode authentication token
  const decodeAuthToken = (token) => {
    try {
      const decodedToken = atob(token.split(".")[1]);
      return JSON.parse(decodedToken);
    } catch (error) {
      console.error("Error decoding auth token:", error);
      return null;
    }
  };

  // Function to handle joining a room
  const handleJoinRoom = () => {
    if (roomList.includes(room)) {
      setErrorMessage("Room with the same name already exists");
      return;
    }
    joinRoom(user, room);
    setRoomList([...roomList, room]);
    localStorage.setItem("roomList", JSON.stringify([...roomList, room]));
  };

  // Function to handle room selection
  const handleRoomSelect = (selectedRoom) => {
    setRoom(selectedRoom);
    joinRoom(user, selectedRoom);
  };

  // Function to handle logout
  const handleLogoutClick = () => {
    setLoggingOut(true);
    handleLogout();
  };

  return (
    <div className="lobby">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleJoinRoom();
        }}
      >
        {/* Display logged-in user's name */}
        <Form.Group>
          <Form.Control
            placeholder="name"
            value={user}
            readOnly
            style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
          />
          <Form.Control
            placeholder="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ marginTop: "1rem" }}
          />
        </Form.Group>
        {!loggingOut && errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage("")}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Select Room
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {roomList.map((roomItem) => (
              <Dropdown.Item
                key={roomItem}
                onClick={() => handleRoomSelect(roomItem)}
              >
                {roomItem}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex justify-content-between align-items-center m-2">
          <Button variant="success" type="submit" disabled={!room}>
            Join
          </Button>
          <button
            className="newlogoutbutton text-black"
            onClick={handleLogoutClick} // Use handleLogoutClick instead
            style={{ marginLeft: "1rem", marginTop: "1px" }}
          >
            Logout
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Lobby;