const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
  res.send("All the admin data");
});
app.get("/admin/updatedata", (req, res) => {
  res.send("All the admin data updated");
});
app.get("/admin/removedata", (req, res) => {
  res.send("All the admin data removed");
});

app.listen(7777, () => {
  console.log("Server is successfully running....");
});
