import express from "express";
import { ApolloServer } from "apollo-server";
import schema from "./src/graphql";
import addon from "./addon";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const app = express();
addon(app);

const server = new ApolloServer({
    schema,
});
server['graphqlPath'] = "/api/v1"


console.log(server)

server.listen(port, host);

