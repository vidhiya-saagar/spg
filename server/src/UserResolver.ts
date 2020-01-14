import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from './entity/User';

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

  // POSTing
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

// Mutation -
