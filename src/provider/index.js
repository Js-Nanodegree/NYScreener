import SupaBase from "../db/supabase";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();
export const SUBSCRIBE = "SUBSCRIBE";

const InitPublish = {
  channel() {
    return [this.ctx?.currentUser, this.args?.to];
  },
  listenChat() {
    pubsub.asyncIterator([args?.channel + SUBSCRIBE]);
  },
  currentUser() {
    let data = {
      from: this.ctx?.[this.channel()?.[0]],
      to: this.ctx?.[this.channel()?.[1]],
    };

    return data;
  },
  async createMessage() {
    console.log(this.channel());
    const data = await SupaBase.createMessage({
      from: this.channel()?.[0],
      to: this.channel()?.[1],
      message: this.args?.message,
    });

    return {
      message: [data],
      user: this.currentUser(),
    };
  },
  async allMessage() {
    const data = (await SupaBase.getMessage(this.channel()?.[0])) || [];
    const id = Array.from(new Set(data.map((x) => x?.to)));

    return id.map((el) => ({
      message: data.filter((x) => x?.to === el),
      user: {
        from: this.ctx?.[this.channel()?.[0]],
        to: this.ctx?.[el],
      },
    }));
  },
  async currentMessage() {
    const data = await SupaBase.currentMessage(
      this.channel()?.[0],
      this.channel()?.[1]
    );

    return [
      {
        message: data,
        user: {
          from: this.ctx?.[this.channel()?.[0]],
          to: this.ctx?.[this.channel()?.[1]],
        },
      },
    ];
  },
  subscribe() {
    return pubsub.asyncIterator([this.channel()?.[0] + SUBSCRIBE]);
  },
  async publishMessage() {
    const messageAdded = await this.createMessage();
    this.channel().map((x) => {
      pubsub.publish(x + SUBSCRIBE, {
        messageAdded,
      });
    });
    return messageAdded;
  },
};

export default InitPublish;
