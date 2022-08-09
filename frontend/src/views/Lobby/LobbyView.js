import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import LobbyPlayersList from "../../components/LobbyPlayersList/LobbyPlayersList";
import GameBoard from "../../components/GameBoard/GameBoard";

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
      {link !== "" && <div>Twoj link do lobby: {link}</div>}

      <LobbyPlayersList players={players}></LobbyPlayersList>
      <div>Liczba graczy: {players.length}</div>
      <GameBoard></GameBoard>
    </>
  );
};

export default LobbyView;
