import express from "express";
import http from "http";
import { connectPeerServer } from "./peer";
const app = express();
const server = http.createServer(app);
const peerServer = connectPeerServer(server);

app.use("/peer", peerServer);

server.listen(9000, () => {
  console.log(`🚀 Express PeerServer is Running on PORT:${9000}`);
});
