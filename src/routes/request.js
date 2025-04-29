const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/request");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const {status, toUserId} = req.params;

    if(!["ignore", "interested"].includes(status))
      throw new Error(`${status} is incorrect status type.`);
    
    const fromUserId = req.user._id;

    const toUser = await User.findById(toUserId);

    if(!toUser)
      throw new Error("User not found!");

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or : [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    });

    if(existingConnectionRequest)
      return res.json({message: "Connection Request Already Exist!!!"});

    const curConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await curConnectionRequest.save();

    res.send({
      message: "Your connection request send successfully.",
      data: data
    });

  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

router.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try{
    const loggedInUser = req.user;
    const {status, requestId} = req.params;

    if(!["accepted", "rejected"].includes(status))
      throw new Error(`${status}, is not valid`);

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    })

    if(!connectionRequest)
      return res.status(400).json({message: "Connection Request Not Found!!"});

    connectionRequest.status = status;

    const data = await ConnectionRequest.save();

    res.json({message : "The Connection Request is " + status, data});
  }
  catch(err){
    res.send("ERROR : " + err.message);
  }
})


module.exports = router;