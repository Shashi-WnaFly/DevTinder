const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateConnectionRequestStatus} = require("../utils/validation");
const User = require("../models/user");
const ConnectionRequest = require("../models/request");

router.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const {status, userId} = req.params;
    if(!validateConnectionRequestStatus(status))
      throw new Error(`${status} is incorrect status type 2.`);
    
    const fromUserId = req.user._id;
    if(fromUserId == userId)
      throw new Error("You are already friend to that person.");

    const toUserId = await User.findById(userId);

    if(!toUserId)
      throw new Error("User was not found!");

    const curConnectionRequest = new ConnectionRequest({
      fromUserId : fromUserId,
      toUserId : toUserId,
      status : status
    });

    await curConnectionRequest.save();

    res.send(`${req.user.firstName} your connection request has send successfully.`);

  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

module.exports = router;