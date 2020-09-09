import { v4 } from "uuid";
import { ExpressPeerServer } from "peer";

const customGeneration = () => v4();

export const connectPeerServer = (server) => {
  const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: "/video",
    generateClientId: customGeneration,
    //allow_discovery: true,
  });
  peerServer.on("connection", (client) => {
    console.log("connected ", client.getId);
  });
  peerServer.on("disconnect", (client) => {
    console.log("disconnected ");
  });
  return peerServer;
};
