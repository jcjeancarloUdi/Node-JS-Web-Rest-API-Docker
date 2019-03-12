const sql = require("mssql");

module.exports = {
    sql: function(){ 
        connStr: "Server=db1.internal.teste.com;Database=db1;User Id=usr_app;Password=usr_app;";
        sql.connect(connStr)
        // .then(conn => console.log("conectou!"))
        .then(conn => createTable(conn))
        .catch(err => console.log("erro na conexÃ£o! " + err));
    }
}

