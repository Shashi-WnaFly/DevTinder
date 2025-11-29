const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (loggedUserId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([loggedUserId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ loggedUserId, targetUserId }) => {
      const roomId = getSecretRoomId(loggedUserId, targetUserId);
      console.log(roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ loggedUserId, targetUserId, text }) => {
      const roomId = getSecretRoomId(loggedUserId, targetUserId);
      io.to(roomId).emit("messageReceived", { sender: loggedUserId, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
