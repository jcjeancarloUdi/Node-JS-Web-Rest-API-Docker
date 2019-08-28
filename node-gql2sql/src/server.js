import express from 'express';
import GraphHTTP from 'express-graphql';
import config from './config/config'
import log from './logger/logger';
import Schema from './schemas/schema';

// config
const APP_PORT = config.port;

const app = express();

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(APP_PORT, () => {
  log.info('API Service started', { port: APP_PORT });
})
