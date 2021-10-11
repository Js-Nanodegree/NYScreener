import { Injectable } from "graphql-modules";
import { messages, pubsub, MESSAGE_ADDED } from "./application";

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

export default Messages;
