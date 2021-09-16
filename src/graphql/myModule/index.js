import 'reflect-metadata'
import { createModule, gql, Injectable } from "graphql-modules";
import DataInit from '../provider'

const myModule = createModule({
  id: "my-module",
  providers: [DataInit],
  typeDefs: [
    gql`
      type Query {
        hello: String!
      }
    `,
  ],
  resolvers: {
    Query: {
      hello: (root, args, context, info) => "world",
    },
  },
});

export default myModule