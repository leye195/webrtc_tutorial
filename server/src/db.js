import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
/*const u = process.env.PRODUCTION
  ? process.env.PROD_MONGO_DB
  : process.env.LOCAL_DB;*/
const u = process.env.LOCAL_DB;

mongoose.connect(
  u, //process.env.PRODUCTION ? process.env.PROD_MONGO_DB : process.env.LOCAL_DB,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log(`Connected to mongodb server ${u}`);
});
