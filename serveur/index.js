'use strict'

var express = require('express');
var app = express();
var cors = require('cors')
const port = process.env.PORT || 3000 ;

const fs = require('fs')
const bodyParser   = require('body-parser')
app.use(bodyParser.json())

const nodemailer = require('nodemailer');
const { EMAIL, PWDOVH, HOST, PORTSMTP } = require("./config.js");
//console.log("config", EMAIL + " " + PWDOVH + " " + HOST + " " + PORTSMTP);


let transport = nodemailer.createTransport({
  host: HOST,
  secure: true,
  port: PORTSMTP,
  auth: {
     user: EMAIL,
     pass: PWDOVH
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

// verify connection configuration
/*transport.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
*/

app.get('/', function (req, res) {
  fs.readFile("./index.html", function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
})
  })

app.post('/medimoovform', cors(), function(req, res) {
  let body = req.body ;
  if(body.name && body.msg && body.email)
  {
    //test email
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(String(body.email).toLowerCase()))
    {
      const message = {
        from: body.email, // Sender address
        to: 'antoineseilles@gmail.com',         // List of recipients
        subject: 'formulaire de contact de MediMoov', // Subject line
        text: `de la part de ${body.name} : ${body.msg}`  // Plain text body
      };
      transport.sendMail(message, function(err, info) {
        if (err) {
          console.log("err sending email", err);
          res.status(500);
          res.send("had a pb :(");
        } else {
          console.log("info sending email", info);
          res.status(200);
          res.send("email sended !");
        }
      });
    }
    else 
    {
      console.log("post mmform", "someone try to post without valid email");
      res.status(400);
      res.send("not valid email");
    }
  }
  else 
  {
    console.log("post mmform", "someone try to post without the right data");
    res.status(400);
    res.send("something is missing");
  }
}) 

app.listen(port, function () {
    console.log('MediMoov website serveur listening on port ' + port);
});