const express = require("express");

const app = express();

app.get("/user", (req, res, next) => {
  console.log("1st route handler");
  next();
  // res.send("1st response!!!");
})

app.post("/user", (req, res, next) => {
  console.log("2nd route handler");
  res.send("2nd response!!!");
})

app.listen(7777, () => {
  console.log("Server is successfully running....");
});
