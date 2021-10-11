import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();
export const SUBSCRIBE = "SUBSCRIBE";

const publish = (CHANNEL, MESSAGE = {}) => pubsub.publish(CHANNEL, MESSAGE);

export default publish;
