import { createModule, gql } from "graphql-modules";
import typeDefs from "../schema";
import resolvers from "../connecter";

const idModule = "ChatModule";

const myModule = createModule({
  id: idModule,
  typeDefs,
  resolvers,
});

export default myModule;