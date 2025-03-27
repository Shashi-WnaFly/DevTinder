const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello World");
});

app.get("/user", (req, res) => {
  res.send({firstName: "Shashi", secondName: "Anand"});
});

app.delete("/user", (req, res) => {
  res.send("Data is deleted successfully from the database.");
});

app.post("/user", (req, res) => {
  res.send("Data saved successfully to the database.");
})

app.listen(7777, () => {
  console.log("Server is successfully running....");
});
