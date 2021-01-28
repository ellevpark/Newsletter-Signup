const express = require("express"); 
const bodyParser = require("body-parser"); 
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express(); 
const dotenv = require("dotenv").config()


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.listen(process.env.PORT || 3000, function() {
  console.log("I am listening on port 3000")
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
 });

 //Setting up MailChimp. Here you will put your own API key and your own server key (example looks like: us9)
 mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_ID
 });
 //When the sign in button is pressed execute this
 app.post("/", function (req,res) {
 const firstName = req.body.firstName;
 const lastName = req.body.lastName;
 const email = req.body.email;
 // Here is where you will put your own listKey 
 const listId = process.env.LIST_ID;
 // Creating an object with the users data
 const subscribingUser = {
  firstName: firstName,
  lastName: lastName,
  email: email
 };
 // Uplçading the data to the server

async function run() {
 const response = await mailchimp.lists.addListMember(listId, {
  email_address: subscribingUser.email,
  status: "subscribed",
  merge_fields: {
  FNAME: subscribingUser.firstName,
  LNAME: subscribingUser.lastName
 }
 });
 //If all goes well logging the contact's id
  res.sendFile(__dirname + "/success.html")
  console.log(
 `Successfully added contact as an audience member. The contact's id is ${
  response.id
  }.`
 );
 }
 
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
 });
