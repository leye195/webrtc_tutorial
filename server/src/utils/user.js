import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const saltRound = 10;
const myPlain = process.env.PLAIN_TEXT;

const hashPassword = (password) => {
  bcrypt.genSalt(saltRound, (err, salt) => {
    bcrypt.hash(myPlain, salt, (err, hash) => {});
  });
};
