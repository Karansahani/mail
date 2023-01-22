const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function (req , res){
    res.sendFile(__dirname +"/singup.html");
});

app.post("/", function(req, res){
    var email = req.body.email;
    var lname = req.body.lname;
    var fname = req.body.fname;

    const data = {
         members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
                
            }
         ]
    };

    const jsondata = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/e971dbe468";

    const options = {
        method: "POST",
        auth: "karan0098:ac2692569ab7e2a76c5ba4904af68ccb-us14",
        headers: { "Content-Type": "application/json" }
    };

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
 
        request.write(jsondata);
        request.end();
    });

    request.on("error", function(error) {
        console.log("Error: " + error.message);
    });
});

app.listen(1000 , function (){
    console.log("server is running on 1000")
});