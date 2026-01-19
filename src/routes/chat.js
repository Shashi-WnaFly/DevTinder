const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/request");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const loggedUserId = req.user._id;

    let chat = await Chat.findOne({
      participants: {
        $all: [loggedUserId, targetUserId],
      },
    });

    if (!chat) return res.json({success: true, data: []});

    res.json({
      success: true,
      data: chat?.messages,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = chatRouter;
