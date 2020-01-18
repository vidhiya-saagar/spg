import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection } from 'typeorm';
// Lambda Function - Calling Itself
(async () => {
  const app = express();
  app.get('/', (_req, res) => res.send('Say Hello'));

  await createConnection();

  // GraphQL Schema
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    // Access these in GraphQL
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Express server listening on PORT: ', 4000);
  });
})();
