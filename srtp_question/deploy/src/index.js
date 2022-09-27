"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Qiuran Hu
 * @email qiuranh@gmail.com
 * @create date 2021-04-26 10:50:14
 * @modify date 2021-04-26 10:50:14
 * @desc [description]
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const apollo_server_express_1 = require("apollo-server-express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const graphql_1 = require("./graphql");
const compression_1 = __importDefault(require("compression"));
const mount = async (app) => {
    // Connect to MongoDB database.
    const db = await database_1.connectDatabse();
    const users = await db.users.find({}).toArray();
    console.log(users);
    app.use(cookie_parser_1.default(process.env.SECRET));
    app.use(compression_1.default());
    if (!(process.env.NODE_ENV === "development")) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        app.use(express_1.default.static(`${__dirname}/client`));
        app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));
    }
    // Create an ApolloServer instance.
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: ({ req, res }) => ({ db, req, res }),
    });
    // Connect ApolloServer with Express. GraphQL API is on /api path.
    server.applyMiddleware({ app, path: "/api" });
    // Start Express server.
    app.listen(9000);
    console.log(`[app]: http://localhost:${process.env.PORT}`);
};
mount(express_1.default());
