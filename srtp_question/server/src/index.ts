/**
 * @author Qiuran Hu
 * @email qiuranh@gmail.com
 * @create date 2021-04-26 10:50:14
 * @modify date 2021-04-26 10:50:14
 * @desc [description]
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { connectDatabse } from "./database";
import { typeDefs, resolvers } from "./graphql";
import compression from "compression";

const mount = async (app: Application) => {
  // Connect to MongoDB database.
  const db = await connectDatabse();
  const users = await db.users.find({}).toArray();
  console.log(users);

  app.use(cookieParser(process.env.SECRET));
  app.use(compression());

  if (!(process.env.NODE_ENV === "development")) {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    app.use(express.static(`${__dirname}/client`));
    app.get("/*", (_req, res) =>
      res.sendFile(`${__dirname}/client/index.html`)
    );
  }
  // Create an ApolloServer instance.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });

  // Connect ApolloServer with Express. GraphQL API is on /api path.
  server.applyMiddleware({ app, path: "/api" });
  // Start Express server.
  app.listen(9000);
  console.log(`[app]: http://localhost:${process.env.PORT}`);
};

mount(express());
