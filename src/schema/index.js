import { createModule, gql } from "graphql-modules";

export default gql`
  type Query {
    messages(to: Int): [Schema!]
  }

  type Mutation {
    sendMessage(to: Int, message: String): Schema!
  }

  type Subscription {
    messageAdded: Schema!
  }

  type Schema {
    message: [Message]
    user: User
  }

  type User {
    name: Name
    phone: String
    id: Int
  }

  type Name {
    first: String
    last: String
    middle: String
  }

  type Message {
    id: String!
    message: String!
    created_at: String!
    from: Int!
    to: Int!
  }
`;
