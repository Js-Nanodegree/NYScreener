import { createModule, gql } from "graphql-modules";

export default gql`
type Query {
  messages: [Message!]
}

type Mutation {
  sendMessage(from: Number, to: Number, message: String): Message!
}

type Subscription {
  messageAdded: Message
}

type Message {
  id: ID!
  body: String!
  from: Number!
  to: Number!
}
`