const express = require("express");

const app = express();

app.use("/data", (req, res) => {
    res.send("There is no data present right now..")
})

app.use("/hello",(req, res) => {
    res.send("Hello World");
})


app.listen(7777, () => {
    console.log("Server is successfully running....");
});