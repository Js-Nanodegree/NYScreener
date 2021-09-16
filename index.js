import express from "express";
import { ApolloServer } from "apollo-server";
import schema from './src/graphql'
import addon from './addon'

const app = express();

addon(app)

const server = new ApolloServer({
    schema,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});