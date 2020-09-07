import express from "express";
import socketIO from "socket.io";
import { v4 } from "uuid";
const app = express();
const io = socketIO(app);

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${v4()}`);
});
app.get("/:room", (req, res) => {
  const {
    params: { room },
  } = req;
  res.render("room", { roomId: room });
});

app.listen(8080, () => {
  console.log(`🚀 Express Server is Running on PORT:${8080}`);
});
