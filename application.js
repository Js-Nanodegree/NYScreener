import "reflect-metadata";
import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { myModule } from "./myModule";

export const pubsub = new PubSub();

export const MESSAGE_ADDED = "MESSAGE_ADDED";

export let messages = [];

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
