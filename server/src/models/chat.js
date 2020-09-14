import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  to: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Room",
  },
});
const roomModel = mongoose.model("Chat", chatSchema);
export default roomModel;
