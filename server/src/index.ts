import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Lambda Function - Calling Itselff
(async () => {
  const app = express();
  app.get('/', (_req, res) => res.send('Say Hello'));

  // GraphQL Schema
  const apolloServer = new ApolloServer({
    // This looks mad ugly tbh
    typeDefs: `
      type Query {
        hello: String!,
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'hello world',
      },
    },
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Express server listening on PORT: ', 4000);
  });
})();
