import { createModule, gql } from "graphql-modules";

export default gql`
  type Query {
    messages: [Message!]
  }

  type Mutation {
    sendMessage(from: Int, to: Int, message: String): Message!
  }

  type Subscription {
    messageAdded: Message
  }

  type Message {
    id: ID!
    body: String!
    from: Int!
    to: Int!
  }
`;
