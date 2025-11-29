const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({loggedUserId, targetUserId}) => {
      const roomId = [loggedUserId, targetUserId].sort().join('_');
      console.log(roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({loggedUserId, targetUserId, text}) => {
      const roomId = [loggedUserId, targetUserId].sort().join('_');
      io.to(roomId).emit("messageReceived", {sender: loggedUserId, text});
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
