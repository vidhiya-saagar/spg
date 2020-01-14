import { sign } from 'jsonwebtoken';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from './entity/User';
import dotenv from 'dotenv';

dotenv.config();

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
    @Arg('password') password: string
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
    return {
      accessToken: sign({ user_id: user.id }, 'klnbkoy8hkhgk', {
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
