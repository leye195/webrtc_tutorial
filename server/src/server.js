import express from "express";
import http from "http";
import socket from "socket.io";
import { v4 } from "uuid";
const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on("connect", (socket) => {
  //console.log("wow");
  socket.on("join-room", (data) => {
    const { roomId, userId = "user" } = data;
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", { userId }); //send msg to room except me
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", { userId });
    });
    socket.on("user-leave", () => {
      socket.to(roomId).emit("user-disconnected", { userId });
    });
    socket.on("user-hangout", () => {
      console.log("///");
      socket.to(roomId).emit("user-hangout");
    });
  });
});
server.listen(8080, () => {
  console.log(`🚀 Express Server is Running on PORT:${8080}`);
});
