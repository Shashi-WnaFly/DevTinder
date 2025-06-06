const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
    const { token } = req.cookies;

    if(!token)
      throw new Error("Invalid token!!!");

    const decodedObj = jwt.verify(token, "DEV@tinder$242", (err, obj) => {
      if(obj)
        return obj;
      throw new Error(err);
    })

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if(!user)
      throw new Error("user not found!!");

    req.user = user;
    next();
  }
  catch(err){
    res.status(400).send("ERROR : " + err.message);
  }

}

module.exports = {
    userAuth,
}
