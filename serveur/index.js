'use strict'

var express = require('express');
var app = express();
const port = process.env.PORT || 3000 ;

const fs = require('fs')

const nodemailer = require('nodemailer');
const { EMAIL, PWDOVH, HOST, PORTSMTP } = require("./config.js");
console.log("config", EMAIL + " " + PWDOVH + " " + HOST + " " + PORTSMTP);


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

app.post('/medimoovform', function(req, res) {
  const message = {
    from: "test@gmail.com", // Sender address
    to: 'antoineseilles@gmail.com',         // List of recipients
    subject: 'Test d\'envoi d\'un mail', // Subject line
    text: 'yo ça a l\'air de marcher ?' // Plain text body
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log("err sending email", err)
      res.send("had a pb :(");
    } else {
      console.log("info sending email", info);
      res.send("email sended !");
    }
  });
}) 

app.listen(port, function () {
    console.log('MediMoov website serveur listening on port ' + port);
});