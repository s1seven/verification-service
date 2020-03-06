import express from 'express';
import {build} from './build';
import {router} from './routes';
import {unknownEndpoint} from './middlewares/unknownEndpoint';
import {errorHandler} from './middlewares/errorHandler';
import path from 'path';
import {Config} from './config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const FRONTEND_FILES = path.join(__dirname, '../../frontend/build');

export const buildApp = (config: Config) => {
  const services = build(config);

  const app = express();

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(express.json());

  if (process.env.NODE_ENV === 'dev') {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  app.use('/api', router(services));
  // Throw 404 error for unknown API routes
  app.use('/api', unknownEndpoint);

  app.use('/', express.static(FRONTEND_FILES));
  app.use('*', (request, response) => {
    response.sendFile(path.join(FRONTEND_FILES, 'index.html'));
  });

  app.use(errorHandler(console));

  return app;
};
