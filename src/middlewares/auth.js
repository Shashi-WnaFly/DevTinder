const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Invalid token!!!");

    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);

    const user = await User.findById(decodedToken._id);

    if (!user) throw new Error("user not found!!");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
