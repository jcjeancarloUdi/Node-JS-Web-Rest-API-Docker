var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

router.get("/api/database"), function(req,res){
  res.sendFile("http://restapi1.internal.teste.com:3000/database/create-table/clientes");
}

router.get("/api/v1/clientes"), function(req,res){
  res.sendFile("http://restapi1.internal.teste.com:3000/api/v1/clientes");
}

router.get("/api/v1/tasks"), function(req,res){
  res.sendFile("http://webmongo1.internal.teste.com:8090/tasks");
}

app.use(express.static(path));
app.use("/", router);

app.listen(8080, function () {
  console.log('Aplicativo respondendo na porta 8080!')
})