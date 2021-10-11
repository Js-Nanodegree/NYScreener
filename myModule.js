import { createModule, gql } from "graphql-modules";
import { Messages, pubsub, MESSAGE_ADDED } from "./application";


export const myModule = createModule({
    id: "my-module",
    providers: [Messages],
    async context(session, currentContext, { injector }) {
        const authToken = session.req.headers.authentication;

        const currentUser = injector
            .get(AuthenticationProvider)
            .authorizeUser(authToken);
        return {
            currentUser,
        };
    },
    typeDefs: gql`
    type Query {
      messages: [Message!]
    }

    type Mutation {
      sendMessage(from: Number, to: Number, message: String): Message!
    }

    type Subscription {
      messageAdded: Message
    }

    type Message {
      id: ID!
      body: String!
      from: Number!
      to: Number!
    }
  `,
    resolvers: {
        Query: {
            messages(parent, args, ctx) {
                return ctx.injector.get(Messages).all();
            },
        },
        Mutation: {
            sendMessage(parent, { message }, ctx) {
                return ctx.injector.get(Messages).send(message);
            },
        },
        Subscription: {
            messageAdded: {
                subscribe(root, args, ctx) {
                    return pubsub.asyncIterator([MESSAGE_ADDED]);
                },
            },
        },
    },
});
