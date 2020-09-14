import express from "express";
import { logIn, signUp, checkUser } from "../controllers/userController";
import { auth } from "../middleware/auth";
const app = express.Router();

app.post("/login", logIn);
app.post("/register", signUp);
app.get("/auth", auth, checkUser);
