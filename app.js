const express = require("express"); 
const bodyParser = require("body-parser"); 
const request = require("request");
const app = express(); 

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("I am listening on port 3000")
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})