// @ts-check
const { createServer } = require("http");
const express = require("express");
// const { execute, subscribe } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
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

let listConnect = [];

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
      {
        schema,
        execute,
        subscribe,
        onConnect(connectionParams, webSocket, context) {
          const connection =
            webSocket?.upgradeReq?.headers["sec-websocket-key"];
          const currentUser = connectionParams?.Authorization;

          listConnect.push({ currentUser, connection });
          return { connection, currentUser };
        },
        onDisconnect(webSocket, context) {
          console.log(context);
          console.log("Disconnected!");
        },
      },
      { server: httpServer, path: server.graphqlPath }
    );

    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();


console.log(listConnect)
