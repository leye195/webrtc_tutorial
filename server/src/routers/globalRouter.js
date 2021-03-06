import express from "express";
import {
  logIn,
  signUp,
  checkUser,
  logOut,
} from "../controllers/userController";
import { auth } from "../middleware/auth";
import { joinRoom, createRoom } from "../controllers/roomController";
const app = express.Router();

app.post("/login", logIn);
app.post("/register", signUp);
app.get("/auth", auth, checkUser);
app.post("/logout", auth, logOut);

app.post("/room/create", createRoom);
app.post("/room/join", joinRoom);

export default app;
