// @ts-check
const { createServer } = require("http");
const express = require("express");
// const { execute, subscribe } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
import { schema, execute, subscribe } from "./application";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const PORT = 4000;
const app = express();
const httpServer = createServer(app);
let channel = [];

const context = ({ req }) => {
  let authToken = null;
  let currentUser = null;
  try {
    authToken = req.headers["authorization"];
    channel[authToken] = authToken;
  } catch (e) {
    console.warn(`Unable to authenticate using auth token: ${authToken}`);
  }
  return {
    authToken,
    currentUser,
    channel,
  };
};

(async () => {
  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );

    // @ts-ignore
    new SubscriptionServer.create(
      { schema, execute, subscribe },
      { server: httpServer, path: server.graphqlPath }
    );

    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
