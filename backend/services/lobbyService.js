import { io } from "../index.js";

const getRoomInfo = (room) => ({ players: [...room] });

const createRoom = (socket) => {
  socket.join(socket.id);

  const room = io.sockets.adapter.rooms.get(socket.id);

  socket.emit("room_created", socket.id);
  socket.emit("room_updated", getRoomInfo(room));
};

const joinRoom = (roomId, socket) => {
  const room = io.sockets.adapter.rooms.get(roomId);

  if (!room) {
    return socket.emit("failed", "Room doesn't exist");
  }

  socket.join(roomId);

  socket.to(roomId).emit("player_joined");
  socket.to(roomId).emit("room_updated", getRoomInfo(room));

  socket.emit("room_updated", getRoomInfo(room));
  socket.emit("room_joined");
};

const leaveRoom = (socket) => {
  for (let roomId of socket.rooms) {
    const room = io.sockets.adapter.rooms.get(roomId);

    socket.leave(roomId);
    socket.to(roomId).emit("room_updated", getRoomInfo(room));
  }
};

export { createRoom, joinRoom, leaveRoom, getRoomInfo };
