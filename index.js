import express from "express";
import { ApolloServer } from "apollo-server";
import schema from './src/graphql'
import addon from './addon'

const port = process.env.PORT || 3000

console.log({ port })

const app = express();

addon(app)

const server = new ApolloServer({
    schema,
});

server.listen(3000,'0.0.0.0').then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});