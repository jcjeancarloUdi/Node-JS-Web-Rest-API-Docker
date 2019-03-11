var express = require('express');
var app = express();

var db = require('mongoose');
db.connect("mongodb://mongodb1.internal.prod.teste.com:27017");

app.get('/', function(req, res){
  res.send("Hello World!<br>\nHola Mundo!<br>\n");
});

app.listen(8080, function(){
  console.log('Node app listening on port 8080!');
});