const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const app = express();
const port = 3000; //porta padrao
const connStr = "Server=db1.internal.teste.com;Database=db1;User Id=usr_app;Password=usr_app;";

//fazendo a conexao global
//sql.connect(connStr)
//   .then(conn => global.conn = conn)
//   .catch(err => console.log(err));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

// executar consultas SQL 
function execSQLQuery(sqlQry, res){
	new sql.ConnectionPool(connStr).connect().then(pool => {
			return pool.request().query(sqlQry)
			}).then(result => {
			  let rows = result.recordset
			  res.setHeader('Access-Control-Allow-Origin', '*')
			  res.status(200).json(rows);
			  sql.close();
			}).catch(err => {
			  res.status(500).send({ message: {err}})
			  sql.close();
			});	
}

// criar a rota de clientes
router.get('/api/v1/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Clientes', res);
})

// criando a pesquisa de um ciente
router.get('/api/v1/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
})

// criando a pesquisa de um ciente
router.get('/api/v1/clientesbycpf/:cpf?', (req, res) =>{
    let filter = '';
    if(req.params.cpf) filter = ' WHERE cpf=' + req.params.cpf;
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
})

//excluindo um cliente pelo ID
router.delete('/api/v1/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE Clientes WHERE ID=' + parseInt(req.params.id), res);
})

//excluindo um cliente pelo cpf
router.delete('/api/v1/clientesbycpf/:cpf', (req, res) =>{
    execSQLQuery('DELETE Clientes WHERE cpf=' + req.params.cpf, res);
})

// adicionar cliente
router.post('/api/v1/clientes', (req, res) =>{
    const id = parseInt(req.body.id);
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    execSQLQuery("INSERT INTO Clientes(ID, Nome, CPF) VALUES(${id},'${nome}','${cpf}')", res);
})

// atualizando o cliente
router.patch('/api/v1/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery("UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}", res);
})

// excluir clientes por lista 
function execute(listCpf, i, conn){
    if(!listCpf[i]) return console.log("terminou");

    conn.request()
        .query("DELETE Cllientes WHERE cpf='${listCpf[i]}'")
        .then(result => {
            console.log(result)
            execute(listCpf, ++i, conn)//faz o proximo
        })
        .catch(err => console.log(err));
}

router.delete('/api/v1/clientesAll/:listCpf', (req, res) =>{
    execute(listCpf,0, conn);
})

require('./database/create-table')(app);