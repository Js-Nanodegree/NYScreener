import { createModule, gql } from "graphql-modules";
import Messages  from "../provider";
import typeDefs from "../schema";
import resolvers from "../connecter";

const idModule = "ChatModule";

const myModule = createModule({
  id: idModule,
  providers: [Messages],
  typeDefs,
  resolvers,
});

export default myModule;