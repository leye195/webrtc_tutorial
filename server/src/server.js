import express from "express";
import http from "http";
import socket from "socket.io";
const app = express();
const server = http.createServer(app);
const io = socket(server);

const rooms = {};
io.on("connect", (socket) => {
  //console.log("wow");
  socket.on("join-room", (data) => {
    //console.log(rooms);
    const { roomId, userId = "user" } = data;
    if (!rooms[roomId] || rooms[roomId].length < 2) {
      if (rooms[roomId]) rooms[roomId].push(userId);
      else rooms[roomId] = [userId];
      socket.join(roomId);
      //socket.to(roomId).emit("user-list", { userList });
      socket.to(roomId).broadcast.emit("user-connected", { userId }); //send msg to room except me
      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconnected", { userId });
        rooms[roomId] = rooms[roomId].filter((id) => id !== userId);
      });
      socket.on("user-leave", () => {
        socket.to(roomId).emit("user-disconnected", { userId });
      });
      socket.on("user-hangout", () => {
        socket.to(roomId).emit("user-hangout");
      });
    } else {
      socket.emit("request-ignore");
    }
  });
});
//console.log(peerServer);
server.listen(8080, () => {
  console.log(`🚀 Express Server is Running on PORT:${8080}`);
});
