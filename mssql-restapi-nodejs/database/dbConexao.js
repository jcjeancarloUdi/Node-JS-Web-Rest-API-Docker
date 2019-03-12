const sql = require("mssql");

module.exports = {
    const connStr = "Server=db1.internal.prod.myteste.com;Database=db1;User Id=sa;Password=teste2017;";
    sql: function(){ 

        sql.connect(connStr)
        // .then(conn => console.log("conectou!"))
        .then(conn => createTable(conn))
        .catch(err => console.log("erro na conexÃ£o! " + err));
    }
}

