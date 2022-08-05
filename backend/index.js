import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createRoom, joinRoom, leaveRoom } from "./services/lobbyService.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("create_room", () => createRoom(socket));

  socket.on("join_room", (roomId) => joinRoom(roomId, socket));

  socket.on("disconnecting", () => leaveRoom(socket));
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
