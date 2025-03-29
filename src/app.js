const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const app = express();

app.use("/", (err, req, res, next) => {
  if(err){
    res.send("Something is wrong contact support team.");
  }
})

app.get("/getUserData", (req, res) => {
  try{
    // throw new Error("viral photo");
    res.send("All the user Data");
  }
  catch(err){
    res.send("Something is wrong");
  }
})

// app.use("/", (err, req, res, next) => {
//   if(err){
//     res.send("Something is wrong contact support team.");
//   }
// })

app.listen(7777, () => {
  console.log("Server is successfully running....");
});
