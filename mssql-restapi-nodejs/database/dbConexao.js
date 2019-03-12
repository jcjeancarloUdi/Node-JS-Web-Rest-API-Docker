const sql = require("mssql");

module.exports = {
    //const connStr = "Server=db1.internal.prod.myteste.com;Database=db1;User Id=sa;Password=myteste2019;";
    connStr: function(){ return "Server=10.100.0.24;Database=db1;User Id=usr_app;Password=usr_app;";},
    sql: function(){ 

        sql.connect(connStr)
        // .then(conn => console.log("conectou!"))
        .then(conn => createTable(conn))
        .catch(err => console.log("erro na conexÃ£o! " + err));
    }
}

