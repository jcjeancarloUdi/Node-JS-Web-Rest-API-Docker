const express = require("express");
const sql = require("mssql");

const connStr = "Server=db1.internal.teste.com;Database=db1;User Id=usr_app;Password=usr_app;";
const router = express.Router();

function createTable(conn, res){
 
    const table = new sql.Table('Clientes');
    table.create = true;
    table.columns.add('ID', sql.Int, {nullable: false, primary: true});
    table.columns.add('Nome', sql.NVarChar(150), {nullable: false});
    table.columns.add('CPF', sql.NChar(11), {nullable: false});
    table.rows.add(1, 'Luan Bryan Ricardo Teixeira', '65392215173');
    table.rows.add(2, 'Mateus Yago Breno das Neves', '49912710100');
    table.rows.add(3, 'Carlos Diogo Cláudio Araújo', '28497497104');
    table.rows.add(4, 'Pedro Calebe Osvaldo Costa', '80245867112');
    table.rows.add(5, 'Joaquim Raul Peixoto', '82118876149');
    table.rows.add(6, 'Luan Cauê Assunção', '74501257148');
    table.rows.add(7, 'Cláudio Bryan Henry da Silva', '42514228131');
    table.rows.add(8, 'Yago Giovanni Souza', '48389524147');
    table.rows.add(9, 'Eduardo Roberto Assis', '97513028117');
    table.rows.add(10, 'Manoel Raimundo Moreira', '62964155160');
  

    const request = new sql.Request()
    request.bulk(table)
		.then(result => {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.status(200).json("{ message: {'Tabela de Clientes Criada com sucesso.'}}");
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: {err}})
          sql.close();
        });		   
}

// criar a rota de clientes
router.get('/clientes', (req, res) =>{
	sql.connect(connStr)
   .then(conn => createTable(conn, res))
   .catch(err => console.log(err));
    //createTable(sql.ConnectionPool(connStr).connect());
})

module.exports = app => app.use('/database/create-table', router);