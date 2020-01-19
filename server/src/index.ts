import { User } from './entity/User';
import { createAccessToken } from './auth';
import { verify } from 'jsonwebtoken';
import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection } from 'typeorm';

// Lambda Function - Calling Itself
(async () => {
  const app = express();
  app.get('/', (_req, res) => res.send('Say Hello'));

  // REST Route to recreate auth token
  app.post('/refresh_token', cookieParser(), async (req, res) => {
    const token = req.cookies.jot;
    if (!token) return res.send({ ok: false, accessToken: '' });
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // Token is VALID and we can send back the Access Token
    const user = await User.findOne({ id: payload.user_id });

    if (!user) return res.send({ ok: false, accessToken: '' });
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

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
