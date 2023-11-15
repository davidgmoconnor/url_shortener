import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Link {
    id: ID!
    url: String!
    shortFormUrl: String!
  }

  type Slice {
    items: [Link]!
    total: Float!
  }

  type Query {
    getLinks(start: Float!, end: Float!, filter: String): Slice
  }

  type Mutation {
    createLink(url: String!): Link
  }
`);
