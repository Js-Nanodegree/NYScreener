import { SUBSCRIBE, pubsub } from "../pubsub";
import SupaBase from "../db/supabase";

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
    console.log(data);

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

export default {
  Query: {
    async messages(parent, args, ctx) {
      ctx["currentUser"] = 3213;

      let data;
      const model = Object.assign({ args, ctx }, InitPublish);
      if (args?.to) {
        data = await model.currentMessage();
      } else {
        data = await model.allMessage();
      }
      return data || [];
    },
  },
  Mutation: {
    async sendMessage(parent, args, ctx) {
      ctx["currentUser"] = 3213;

      const model = Object.assign({ args, ctx }, InitPublish);
      const data = await model.publishMessage();
      return data;
    },
  },
  Subscription: {
    messageAdded: {
      async subscribe(root, args, ctx) {
        return pubsub.asyncIterator([ctx.currentUser + SUBSCRIBE]);
      },
    },
  },
};
