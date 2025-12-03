const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
    const { token } = req.cookies;

    if(!token)
      throw new Error("Invalid token!!!");

    const { _id } = jwt.verify(token, process.env.SECRET_JWT, (err, obj) => {
      if(obj)
        return obj;
      throw new Error(err);
    })

    const user = await User.findById(_id);

    if(!user)
      throw new Error("user not found!!");

    req.user = user;
    next();
  }
  catch(err){
    res.status(401).send("ERROR : " + err.message);
  }

}

module.exports = {
    userAuth,
}
