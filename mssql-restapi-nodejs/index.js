const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrao
const sql = require('mssql');
const connStr = "Server=db1.internal.prod.teste.com;Database=db1;User Id=sa;Password=teste2017;";

//fazendo a conexao global
sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

// executar consultas SQL 
function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
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