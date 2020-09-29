import Peer from "peerjs";
//import { getSocket } from "./socket";
//let peer: Peer;
type peerType = {
  host?: string;
  port?: number;
  path?: string;
};
/*const initPeer = () => {
  peer = new Peer(undefined, {
    host: "localhost",
    port: 9000,
    path: "/peer/video",
  });
};
//initPeer();
//export const getPeerId = () => peer.id;
//export const getPeer = () => peer;*/

export const getPeer = ({
  host = "localhost",
  port = 9000,
  path = "/peer/video",
}: peerType) => {
  const peer = new Peer(undefined, {
    host,
    port,
    path,
  });
  return peer;
};
