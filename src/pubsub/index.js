import { GooglePubSub } from "@axelspringer/graphql-google-pubsub";
export const pubsub = new GooglePubSub();

export const SUBSCRIBE="SUBSCRIBE"

const publish = ({ CHANNEL, MESSAGE }) => pubsub.publish(CHANNEL, message);

export default publish;
