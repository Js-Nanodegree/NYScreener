import { createModule, gql } from "graphql-modules";

const myModule = createModule({
    id: "my-module",
    typeDefs: [
        gql`
      type Query {
        hello: String!
      }
    `,
    ],
    resolvers: {
        Query: {
            hello: () => "world",
        },
    },
});

export default myModule