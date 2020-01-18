import { sign } from 'jsonwebtoken';
import { User } from './entity/User';

export const createAccessToken = (user: User) => {
  return sign({ user_id: user.id }, process.env.AUTH_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ user_id: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
};
