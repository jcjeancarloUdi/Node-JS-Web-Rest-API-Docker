import config from './config'
import Sequelize from 'Sequelize';
import log from '../logger/logger';

const infoLogger = log.info;

const sqldb = config.sqldb;
const Conn = new Sequelize(sqldb.database, sqldb.user, sqldb.password, {
  host: sqldb.server,
  dialect: sqldb.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: infoLogger
});

//console.log(Conn);
Conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
export default Conn;
