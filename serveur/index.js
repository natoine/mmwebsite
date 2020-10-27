'use strict'

var express = require('express');
var app = express();
const port = process.env.PORT || 3000 ;

app.get('/', function (req, res) {
    res.send("bienvenue sur MM serveur");
  })


app.listen(port, function () {
    console.log('MediMoov website serveur listening on port ' + port);
});