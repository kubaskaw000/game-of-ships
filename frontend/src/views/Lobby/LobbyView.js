import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";

const joinRoom = (socket, roomId) => {
  socket.emit("join_room", roomId);
};

const initializeSocket = () => {
  return io.connect("http://localhost:3001", {
    transports: ["websocket"],
    reconnection: false,
  });
};

const LobbyView = () => {
  const [link, setLink] = useState("");
  const [players, setPlayers] = useState([]);
  //const socket = initializeSocket();

  const socket = useRef(0);

  useEffect(() => {
    socket.current = initializeSocket();

    socket.current.on("room_created", (id) => console.log(id));

    socket.current.on("room_updated", (data) => setPlayers(data.players));

    socket.current.on("connect", () => {
      const params = new URLSearchParams(window.location.search);
      const roomId = params.get("r");

      if (roomId == null) {
        socket.current.emit("create_room");
        setLink(`${window.location.href}?r=${socket.current.id}`);
      } else {
        joinRoom(socket.current, roomId);
      }
    });

    return () => socket.current.close();
  }, []);

  return (
    <>
      <div>Twoj link do lobby: {link}</div>
      <div>Lista graczy: {players}</div>
      <div>Liczba graczy: {players.length}</div>
    </>
  );
};

export default LobbyView;
