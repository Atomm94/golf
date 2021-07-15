// tslint:disable no-console
import appRoot from 'app-root-path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import glob from 'glob';
import { GraphQLServer, Options } from 'graphql-yoga';
import path from 'path';
import Raven from 'raven';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { connectionOptions } from './ormconfig';
import { AuthorizationMiddleware } from '../authorization/AuthorizationMiddleware';
import config from './config';
import { createGraphqlContext } from './create-graphql-context';
import { formatError, ravenMiddleware } from './format-error';
import { isDevEnv } from './is-dev-env';
import { createGraphqlFile, createSchemaJsonFile } from './server-helpers';
import * as fs from 'fs';

function removeTrailingSlash(str: string) {
  return str.replace(/\/$/, "");
}

Raven.config(config.sentryDsn, {
  environment: config.environment,
  shouldSendCallback: () => {
    return config.environment === 'production';
  },
}).install();

async function bootstrap() {
  const connectionPromise = createConnection(connectionOptions);
  console.log('about to build schema');
  const schema = await buildSchema({
    resolvers: [
      appRoot.resolve('build/*/resolvers/*Resolver.js'),
    ],
    globalMiddlewares: [AuthorizationMiddleware],
    validate: false,
  });
  console.log('schema built');
  if (process.env.SKIP_SCHEMA_GENERATION !== 'true') {
    createGraphqlFile(schema);
    await createSchemaJsonFile(schema);
  }

  const server = new GraphQLServer({
    middlewares: [
      ravenMiddleware,
    ],
    schema,
    context: createGraphqlContext,
  });
  // Configure server options
  const serverOptions: Options = {
    endpoint: '/graphql',
    playground: '/playground',
    port: config.port,
    cors: {
      credentials: true,
      origin: (origin, callback) => callback(null, true),
    },
    bodyParserOptions: {
      limit: '5mb',
    },
    formatError,
  };

  const app = server.express;

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(express.static(appRoot.resolve('public')));
  app.use(Raven.requestHandler());

  if (!isDevEnv()) {
    app.use(express.static(appRoot.resolve('build')));
  }

  console.log('about to initiate controllers');
  const initializers = glob.sync(path.join(__dirname, '../*/*-controller.ts'))
    .map(modulePath => require(modulePath)) // tslint:disable-line:non-literal-require
    .map(module => module.default)
    .filter(initializer => initializer);

  initializers.forEach(initializeController => initializeController(app));
  console.log('controllers initiated');

  console.log('about to start server');
  await server.start(serverOptions, ({ playground }) => {
    console.log(
      `Server is running, GraphQL Playground available at http://localhost:${config.port}${playground}`,
    );
  });
  const builtFrontendPath = appRoot.resolve('gdls-admin-build');
  app.get('*', (req,res) => {
    const filePath = removeTrailingSlash(path.join(builtFrontendPath, req.path));
    if (req.path === '/') {
      res.sendFile(path.join(builtFrontendPath, 'index.html'));
    } else if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(path.join(builtFrontendPath, 'index.html'));
    }
  });
  await connectionPromise;
  console.log('server started');
}

Raven.context(async () => {
  await bootstrap();
}).catch(console.error);
