import 'reflect-metadata';
import './database';

import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('server started on port 3333!');
});
