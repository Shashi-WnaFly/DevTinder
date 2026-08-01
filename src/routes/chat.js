const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/request");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const loggedUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    const chat = await Chat.findOne({
      participants: {
        $all: [loggedUserId, targetUserId],
      },
    });

    if (!chat) return res.json({ success: true, data: [] });

    const msg = chat.messages;
    const start = Math.max(msg.length - page * limit, 0);
    const end = msg.length - (page - 1) * limit;

    res.json({
      success: true,
      data: msg.slice(start, end),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = chatRouter;
