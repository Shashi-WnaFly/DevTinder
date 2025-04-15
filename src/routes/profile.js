const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfile, validatePasswordUpdate} = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

router.post("/profile/edit", userAuth, async (req, res) => {
  
  try{

    if(!validateEditProfile(req))
      throw new Error("Invalid edit field!!!!");

    const user = req.user;
    
    Object.keys(req.body).forEach((key) => user[key] = req.body[key]);

    user.save();
    
    res.send(`${user.firstName}, Your profile updated successfully.`);

  }catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
  
});

router.patch("/profile/password", userAuth, async (req, res) => {
   try{

    if(!validator.isStrongPassword(req.body.newPassword))
      throw new Error("Please Enter A Strong Password As A New Password!!");

    if(!validatePasswordUpdate(req))
      throw new Error("Password was not correct!!!");

    const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
    const user = req.user;
    user.password = passwordHash;
    user.save();
    res.send("Password Updated Successfully.");

   }catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }

});

module.exports = router;
