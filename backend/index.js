import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getObjectByValue } from "./helpers/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("create_room", () => createRoom(socket));

  socket.on("join_room", (roomId) => joinRoom(roomId, socket));

  socket.on("disconnecting", () => leaveRoom(socket));
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
