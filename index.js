// @ts-check
import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema, execute, subscribe } from "./application";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import jwt_decode from "jwt-decode";

const PORT = process.env.PORT || 4000;
const app = express();
const authorization = (ws, token) => {
  let data = token["authorization"];
  if (ws) {
    data = token["Authorization"];
  }
  if (!token) {
    throw new Error("");
  }

  const idUser = data?.split(" ")?.[1] || null;
  if (!idUser) {
    throw new Error("");
  }

  return jwt_decode(idUser)["id"] || null;
};

(async () => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req }) => {
      let currentUser = null;
      const token = req.headers;
      currentUser = authorization(false, token);
      return {
        currentUser,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await server.start();
  server.applyMiddleware({ app });

  const httpServer = createServer(app);

  httpServer.listen(PORT, (link) => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );

    // @ts-ignore
    new SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe,
        onConnect(connectionParams, webSocket) {
          let currentUser;
          const connection =
            webSocket?.upgradeReq?.headers["sec-websocket-key"];
          currentUser = authorization(true, connectionParams);
          return { connection, currentUser };
        },
        onDisconnect() {
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
