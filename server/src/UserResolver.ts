import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from './entity/User';
import dotenv from 'dotenv';
dotenv.config();
import { sign } from 'jsonwebtoken';
import { Context } from './Context';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

// The code below does the same thing...
// typeDefs: `
// type Query {
//   hello: String!,
// }`,
// resolvers: {
//   Query: {
//     hello: () => 'hello world',
//   },
// }
@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid login');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid login');
    }

    // Login was successful

    // Refresh Token
    res.cookie(
      'jot',
      sign({ user_id: user.id }, 'process.env.REFRESH_TOKEN_SECRET', {
        expiresIn: '7d',
      }),
      {
        // Other Options when creating cookie...
        httpOnly: true,
      }
    );

    // Give them token so they can stay login
    // Also, use token to access other parts of application
    return {
      accessToken: sign({ user_id: user.id }, 'process.env.AUTH_TOKEN_SECRET', {
        expiresIn: '15m',
      }),
    };
  }

  // POSTing
  // Register
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await User.insert({
        email: email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
