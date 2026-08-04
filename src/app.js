require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
require("./utils/emailSchedule");
const port = process.env.PORT || 7777;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat");
const initializeSocket = require('./utils/socket');

const server = http.createServer(app);

initializeSocket(server);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

connectDB()
  .then(() => {
    console.log("database is successfully connected.");
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server is successfully running on port ${port}....`);
    });
  })
  .catch(() => {
    console.log("database is not connected.!!!!");
    process.exit(1); // Exit the process with a failure code
  });
