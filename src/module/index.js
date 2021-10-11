import { createModule, gql } from "graphql-modules";
import { Messages, pubsub, MESSAGE_ADDED } from "./application";
import typeDefs from "../schema";
import resolvers from "../resolvers";

const idModule = "ChatModule";

export const myModule = createModule({
  id: idModule,
  providers: [Messages],
  typeDefs,
  resolvers,
});
