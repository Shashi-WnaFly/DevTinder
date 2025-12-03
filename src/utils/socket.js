const socket = require("socket.io");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const getSecretRoomId = (loggedUserId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([loggedUserId, targetUserId].sort().join("_"))
    .digest("hex");
};

const getToken = (cookie) => {
  const parts = cookie.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const token = getToken(socket.request.headers.cookie);

    socket.on("joinChat", ({ loggedUserId, targetUserId }) => {
      try {
        if (!token) {
          throw new Error("Credentials are invalid!!");
        }

        const { _id } = jwt.verify(
          token,
          process.env.SECRET_JWT,
          (err, obj) => {
            if (obj) return obj;
            throw new Error(err);
          }
        );

        if (_id) {
          if (loggedUserId.toString() !== _id.toString())
            throw new Error("Credentials are invalid!!");

          const roomId = getSecretRoomId(loggedUserId, targetUserId);
          console.log(roomId);
          socket.join(roomId);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("sendMessage", ({ loggedUserId, targetUserId, text }) => {
      const roomId = getSecretRoomId(loggedUserId, targetUserId);
      io.to(roomId).emit("messageReceived", { sender: loggedUserId, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
