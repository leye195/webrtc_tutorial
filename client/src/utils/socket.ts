import socketClient from "socket.io-client";
let socket: SocketIOClient.Socket;
const initSocket = (url = "http://localhost:8080") => {
  socket = socketClient.connect(url);
};
initSocket();
export const getSocket = (): SocketIOClient.Socket => {
  return socket;
};
