import { isAuth } from './isAuth';
import { createRefreshToken, createAccessToken } from './auth';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  UseMiddleware,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from './entity/User';
import dotenv from 'dotenv';
dotenv.config();
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

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: Context) {
    return `Hello ${payload}`;
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
    res.cookie('jot', createRefreshToken(user), {
      httpOnly: true,
    });

    return {
      accessToken: createAccessToken(user),
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
