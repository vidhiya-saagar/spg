import { verify } from 'jsonwebtoken';
import { Context } from './Context';
import { MiddlewareFn } from 'type-graphql';
import dotenv from 'dotenv';
dotenv.config();

// bearer 34930wriwu0sdjiocvSIOjldf...

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authenticated');
  }

  console.log(`conext: ${context}`);
  try {
    const token = authorization.split(' ')[1];
    console.log('token: ', token);
    console.log('secret', process.env);
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    // Set it here, so that we can access it later
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }
  return next();
};
