import { SUBSCRIBE, pubsub } from "../pubsub";
import { withFilter } from "graphql-subscriptions";
import Messages from "../provider";

export default {
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
        return pubsub.asyncIterator([SUBSCRIBE]);
      },
    },
  },
};
