import socketClient from "socket.io-client";
let socket: SocketIOClient.Socket;
let id: String = "";
const initSocket = (url = "http://localhost:8080") => {
  socket = socketClient.connect(url);
  socket.on("connected", (data: any) => {
    id = data;
  });
};
initSocket();
export const getSocket = (): SocketIOClient.Socket => {
  return socket;
};
export const getSocketId = (): String => id;
