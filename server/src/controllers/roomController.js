import Room from "../models/room";
import User from "../models/user";

export const createRoom = (req, res, next) => {
  const { userId } = req.body;
  User.findOne({ userId }, (err, user) => {
    if (!err) {
      const newRoom = new room();
      newRoom.participants.push(user);
      newRoom.save();
      return res.json({ success: true });
    }
    return res.json({ success: false });
  });
};

export const joinRoom = async (req, res, next) => {
  const { userId, roomId } = req.body;
  const user = await User.findOne({ userId });
  Room.findByIdAndUpdate(
    roomId,
    { $push: { participants: user } },
    (err, room) => {
      if (err) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true });
    }
  );
};

export const leaveRoom = async (req, res, next) => {
  const { userId, roomId } = req.body;
  const user = await User.findOne({ userId });
  const room = await Room.findById(roomId);
  if (room) {
    if (room.participants.length === 1) {
      Room.findByIdAndDelete(roomId, (err, room) => {
        if (!err) return res.status(200).json({ success: true });
        return res.status(400).json({ success: false });
      });
    } else {
      Room.findByIdAndUpdate(
        roomId,
        { $pull: { participants: { user } } },
        (err, room) => {
          if (!err) return res.status(200).json({ success: true });
          return res.status(400).json({ success: false });
        }
      );
    }
  }
};
