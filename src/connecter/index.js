import InitPublish from "../provider";
import jwt_decode from "jwt-decode";

export default {
  Query: {
    async messages(parent, args, ctx) {
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
      const model = Object.assign({ args, ctx }, InitPublish);
      const data = await model.publishMessage();
      return data;
    },
  },
  Subscription: {
    messageAdded: {
      async subscribe(root, args, ctx) {
        console.log(ctx);

        const model = Object.assign({ args, ctx }, InitPublish);
        return model.subscribe();
      },
    },
  },
};
