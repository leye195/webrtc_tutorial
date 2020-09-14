import User from "../models/user";

export const logIn = (req, res, next) => {
  const { userId, password } = req.body;
  User.findOne({ userId }, (err, user) => {
    if (err) return res.json({ loginSuccess: false });
    user.comparePassword(password).then((isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false });
      user
        .generateToken()
        .then((user) => {
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            id: user._id,
            userId: user.userId,
          });
        })
        .catch((err) => res.status(400).json({ loginSuccess: false, err }));
    });
  });
};

export const signUp = (req, res, next) => {
  const { userId, password } = req.body;
  const user = new User({ userId, password });
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

export const checkUser = (req, res, next) => {
  const { user } = req;
  return res.status(200).json({
    id: user._id,
    userId: user.userId,
  });
};

export const logOut = (req, res, next) => {};
