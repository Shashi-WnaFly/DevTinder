const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/request");
const USER_SAFE_DATA = "firstName lastName photoUrl age skills gender about";
const User = require("../models/user");

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data Fetched Successfully.",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString())
        return row.toUserId;
      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const page = parseInt(req.query.page) || 1;
    let limit = req.query.limit; 
    limit = limit > 50 ? 50 : limit;
    
    const connections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUserId }, { fromUserId: loggedInUserId }],
    })
    .select("toUserId fromUserId");
    
    let hiddenUsers = new Set();
    hiddenUsers.add(loggedInUserId);

    connections.forEach((row) => {
      hiddenUsers.add(row.fromUserId.toString());
      hiddenUsers.add(row.toUserId.toString());
    })

    const feedUsers = await User.find({
      _id: { $nin : Array.from(hiddenUsers)}
    }).select(USER_SAFE_DATA).skip((page-1) * limit).limit(limit);

    res.send(feedUsers);
  } catch (error) {
    res.send("" + error);
  }
});

module.exports = router;
