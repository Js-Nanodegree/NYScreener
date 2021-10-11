import { Injectable } from "graphql-modules";
import pubSub, { SUBSCRIBE } from "../pubsub";
let messages = [];

@Injectable()
class Messages {
  async all() {
    return messages;
  }

  async send(body) {
    const message = {
      id: 12,
      body,
    };

    messages.push(message);
    pubSub(SUBSCRIBE, { messageAdded: message });

    return message;
  }
}

export default Messages;
