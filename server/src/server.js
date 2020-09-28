import express from "express";
import http from "http";
import socket from "socket.io";
import ioRedis from "socket.io-redis";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import "./db";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(globalRouter);

const server = http.createServer(app);
const io = socket(server);

const rooms = {};
io.adapter(ioRedis({ host: "localhost", port: 6379 }));
io.on("connect", (socket) => {
  let user = socket.id;
  io.emit("connected", socket.id);
  socket.on("callRequest", (data) => {
    io.emit("callReceived", data);
  });
  socket.on("join-room", (data) => {
    const { roomId, userId = "user" } = data;
    socket.nickname = userId;
    if (!rooms[roomId] || rooms[roomId].length < 2) {
      if (rooms[roomId]) rooms[roomId].push(userId);
      else rooms[roomId] = [userId];
      io.of("/").adapter.remoteJoin(socket.id, roomId, (err) => {
        if (err) console.log(err);
        else {
          io.in(roomId).clients((err, clients) => {
            //console.log(clients, socket.id);
          });
        }
      });

      socket.to(roomId).broadcast.emit("user-connected", { userId }); //send msg to room except me
      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconnected", { userId });
        rooms[roomId] = rooms[roomId].filter((id) => id !== userId);
        socket.leave(roomId);
      });
      socket.on("user-leave", () => {
        socket.to(roomId).emit("user-disconnected", { userId });
        socket.leave(roomId);
      });
      socket.on("user-hangout", () => {
        socket.to(roomId).emit("user-hangout");
      });
    } else {
      socket.emit("request-ignore");
    }
  });
});
io.on("error", (err) => console.error("SocketIO Error", err));
//console.log(peerServer);
server.listen(8080, () => {
  console.log(`🚀 Express Server is Running on PORT:${8080}`);
});
