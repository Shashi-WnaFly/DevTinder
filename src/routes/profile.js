const express = require("express");
const router = express.Router();
const {userAuth, validateEditProfile} = require("../middlewares/auth");

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
    
    res.send(`${user.firstName}, Your profile updated successfully.`);

  }catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
  
})

module.exports = router;
