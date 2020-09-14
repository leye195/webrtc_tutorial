import mongoose from "mongoose";
const roomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);
const roomModel = mongoose.model("Room", roomSchema);
export default roomModel;
