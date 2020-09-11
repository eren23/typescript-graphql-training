import { ApolloServer } from "apollo-server-express";
import Express from "express"
import { buildSchema } from "type-graphql";
import "reflect-metadata"
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis"
import { redis } from "./redis";
import cors from "cors"




const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  })

  const app = Express();
  const RedisStore = connectRedis(session)

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }))


  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis
    }),
    name: "qid",
    secret: "asde24395rjtgasdas",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server is up at localhost 4000");
  });
}

main()