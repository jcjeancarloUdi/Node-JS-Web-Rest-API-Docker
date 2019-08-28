const config = {
  "port": 9000,
  "sqldb": {
    "dialect": "mssql",
    "server": "db1.internal.teste.com",
    "dialectOptions": {
                        "instanceName": "MSSQLSERVER",
                        "encrypt": false,
                        "trustedConnection": false
    },
    "database": "db1",
    "user": "usr_app",
    "password": "usr_app"
  },
  "winston": { // and Loggly details
    token: "12345678-1234-1234-1234-12345678901234",
    subdomain: ".",
    tags: ["GQL2SQL", "API"],
    handleExceptions: true,
    json: true
  }
}

export default config;
