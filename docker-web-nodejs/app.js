var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
const PORT = 8080;
const HOST = '0.0.0.0';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/docker",function(req,res){
  res.sendFile(path + "docker.html");
});

router.get("/developers",function(req,res){
  res.sendFile(path + "developers.html");
});

router.get("/clientes",function(req,res){
  res.sendFile(path + "clientes.html");
});

app.use(express.static(path));
app.use("/", router);

app.listen(8080, function () {
  console.log('Aplicativo respondendo na porta 8080!')
})