import { ApolloServer } from "apollo-server-express";
import * as Express from "express"
import { buildSchema } from "type-graphql";
import "reflect-metadata"
import { createConnection } from "typeorm";
import { RegisterClass } from "./modules/user/Register";



const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterClass],
  });

  const apolloServer = new ApolloServer({ schema })

  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server is up at localhost 4000");

  });
}

main()