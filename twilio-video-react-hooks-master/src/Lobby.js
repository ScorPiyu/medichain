import React, {useRef, useEffect} from "react";

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  const joinRef = useRef<import("react").ButtonHTMLAttributes>(null);
  useEffect(() => {
    document.getElementById('joinButton').click();

  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          readOnly
          required
        />
      </div>

      {/* <div>
        <label htmlFor="room">Room name:</label>
        <input
        readOnly
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div> */}

      <button id = "joinButton" type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </button>
    </form>
  );
};

export default Lobby;
