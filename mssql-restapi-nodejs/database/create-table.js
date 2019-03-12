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
    table.rows.add(1, 'Duerpo', '5689131830');
    table.rows.add(2, 'Gyalosas', '16081025802');
    table.rows.add(3, 'Erteimph', '29515354811');
    table.rows.add(4, 'Linrod', '31793134804');
    table.rows.add(5, 'Lyesi', '16076482885');
    table.rows.add(6, 'Lugusgarn', '48508110863');
    table.rows.add(7, 'Hurim', '45962030834');
    table.rows.add(8, 'Vyolor', '14828049800');
    table.rows.add(9, 'Guobe', '2806044839');
    table.rows.add(10, 'Lumdlufa', '15376249891');
    table.rows.add(11, 'Fyurond', '60084103868');
    table.rows.add(12, 'Pahtici', '32545185868');
    table.rows.add(13, 'Khadpug', '1598058800');
    table.rows.add(14, 'Adanveythir', '1590464834');
    table.rows.add(15, 'Nursauweu', '22001870841');
    table.rows.add(16, 'Ceralond', '13187252834');
    table.rows.add(17, 'Teislob', '15449424868');
    table.rows.add(18, 'Hikavo', '1596064897');
    table.rows.add(19, 'Bogrla', '2820332897');
    table.rows.add(20, 'Rimuthic', '13774190887');
    table.rows.add(21, 'Voges', '32984513800');
    table.rows.add(22, 'Govoible', '39268900882');
    table.rows.add(23, 'Fuxerandir', '31798616815');
    table.rows.add(24, 'Malwudir', '29147514868');
    table.rows.add(25, 'Ulmoauil', '18474195853');
    table.rows.add(26, 'Anbruan', '3323080815');
    table.rows.add(27, 'Geinho', '5640520868');
    table.rows.add(28, 'Zoepile', '1596934891');
    table.rows.add(29, 'Dasu', '31792286872');
    table.rows.add(30, 'Belmuko', '19020341804');
  

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