const express = require("express"); 
const bodyParser = require("body-parser"); 
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express(); 

const apiKey = config.API_KEY;
const serverKey = config.SERVER_KEY;
const listKey = config.LIST_KEY;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.listen(process.env || 3000, function() {
  console.log("I am listening on port 3000")
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
 });

 //Setting up MailChimp. Here you will put your own API key and your own server key (example looks like: us9)
 mailchimp.setConfig({
  apiKey: apiKey,
  server: serverKey
 });
 //When the sign in button is pressed execute this
 app.post("/", function (req,res) {
 const firstName = req.body.firstName;
 const lastName = req.body.lastName;
 const email = req.body.email;
 // Here is where you will put your own listKey 
 const listId = listKey;
 // Creating an object with the users data
 const subscribingUser = {
  firstName: firstName,
  lastName: lastName,
  email: email
 };
 // Uploading the data to the server

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
