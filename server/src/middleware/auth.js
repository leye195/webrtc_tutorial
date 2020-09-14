import user from "../models/user";

export const auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  user
    .findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, error: true });
      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      throw err;
    });
};
