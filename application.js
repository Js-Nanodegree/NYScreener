import "reflect-metadata";
import { createApplication } from "graphql-modules";
import { createModule, Injectable, gql } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const MESSAGE_ADDED = "MESSAGE_ADDED";

let messages = [];

@Injectable()
class Messages {
    async all() {
        return messages;
    }

    async send(body) {
        const message = {
            id: Math.random(),
            body,
        };

        messages.push(message);

        pubsub.publish(MESSAGE_ADDED, { messageAdded: message });

        return message;
    }
}

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
      sendMessage(message: String!): Message!
    }

    type Subscription {
      messageAdded: Message
    }

    type Message {
      id: ID!
      body: String!
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

// This is your application, it contains your GraphQL schema and the implementation of it.
export const application = createApplication({
    modules: [myModule],
    context: (session) => {
        console.log(session);
        return {
            ...session,
            customProperty: "test",
        };
    },
    providers: [
        {
            provide: PubSub,
            useValue: new PubSub(),
        },
    ],
});

// This is your actual GraphQL schema
export const schema = application.createSchemaForApollo();
export const subscribe = application.createSubscription();

export const execute = application.createExecution();
