import Peer from "peerjs";

type peerType = {
  host: string;
  port: number;
  path: string;
};

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
