# Just in case I forget what to do

### How to register a User:

1. Do `cd server` and run `yarn start` 
2. Go to `localhost:4000/graphql`
3. Then type: 
```
mutation {
  register(email: "email@example.com", password: "example")
}
```
4. As stated in the `UserResolver`, you should get a `true` `boolean` if everything is good.